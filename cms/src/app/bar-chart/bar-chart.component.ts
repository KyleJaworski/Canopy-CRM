import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnInit {
  @ViewChild('chart') chart: ElementRef | undefined;
  basicData: any;

  basicOptions: any;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.initChart();
  }

  destroyChart() {
    const chartElement = document.querySelector('p-chart') as HTMLElement;
    if (chartElement) {
      chartElement.innerHTML = ''; // Clear the chart content to force re-rendering
    }
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color'
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      this.basicData = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Jobs Completed',
            data: [20, 31, 18, 25],
            backgroundColor: ['rgb(107, 114, 128, 0.2)'],
            borderColor: ['rgb(107, 114, 128)'],
            borderWidth: 1,
          },
        ],
      };

      this.basicOptions = {
        responsive: true,
        maintainAspectRatio: false,
        onResize: (chart: any) => {
          const canvas = chart.canvas;
          if (canvas) {
            canvas.style.height = '250px';
            canvas.style.width = '100%';
          }
        },
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            min: 0,
            max: 200,
            beginAtZero: true,
            ticks: {
              stepSize: 10, // Reduce step size for more ticks
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }
}
