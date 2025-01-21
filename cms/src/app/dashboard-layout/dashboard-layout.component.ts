import { Component } from '@angular/core';
import { StatsComponent } from '../stats/stats.component';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { Customer } from '../models/customer';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    StatsComponent,
    DoughnutChartComponent,
    BarChartComponent,
    CustomerListComponent,
    FooterComponent,
  ],
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

  customers: Customer[] = [
    {
      id: 1, // Required field
      name: 'David Winchester', // Required field
      email: 'ChesterWin@gmail.com', // Optional field
      phoneNumber: '765-756-7567', // Optional field
      address: {
        street: '', // Optional nested field
        city: '', // Optional nested field
        postalCode: '', // Optional nested field
      },
      isActive: true, // Optional field
    },
    {
      id: 2, // Required field
      name: 'Haley Marie', // Required field
      email: 'pjillion@gmail.com', // Optional field
      phoneNumber: '765-598-7157', // Optional field
      address: {
        street: '2601 High Preistess Drive', // Optional nested field
        city: 'Lafayette', // Optional nested field
        postalCode: '47904', // Optional nested field
      },
      isActive: true, // Optional field
    },
  ];
}
