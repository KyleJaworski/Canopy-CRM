import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartType } from 'angular-google-charts';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees-overview',
  imports: [GoogleChartsModule, CommonModule],
  templateUrl: './employees-overview.component.html',
  styleUrl: './employees-overview.component.scss',
})
export class EmployeesOverviewComponent implements OnInit {
  platformId = inject(PLATFORM_ID);
  data: any;
  chartData: any[];
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
    const employees = this.employeeService.getMockEmployees();

    this.chartData = employees.map((emp) => [
      { v: emp.employeeId.toString(), f: emp.firstName },
      emp.directReportId ? emp.directReportId?.toString() : '',
      '',
    ]);
  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      this.data = {
        type: ChartType.OrgChart,
        data: this.chartData,
        options: {
          allowHtml: true, // Enables HTML in tooltips
        },
      };
    }
  }
}
