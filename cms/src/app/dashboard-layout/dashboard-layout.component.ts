import { Component } from '@angular/core';
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [StatsComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  customerStats = [
    { id: 1, description: 'Total Customers Serviced', value: 100, delta: 10 },
    { id: 2, description: 'Monthly Customers', value: 20, delta: -2 },
    { id: 3, description: 'Total Reviews', value: 120, delta: 10 },
    { id: 4, description: 'Referals', value: 20, delta: -2 },
  ];
}
