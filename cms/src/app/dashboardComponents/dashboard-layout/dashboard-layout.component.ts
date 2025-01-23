import { Component, OnInit } from '@angular/core';
import { StatsComponent } from '../stats/stats.component';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { NewCustomerListComponent } from '../new-customers-list/new-customer-list.component';
import { Customer } from '../../models/customer';
import { FooterComponent } from '../../mainComponents/footer/footer.component';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    StatsComponent,
    DoughnutChartComponent,
    BarChartComponent,
    NewCustomerListComponent,
    FooterComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnInit {
  customers!: Customer[];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.mockCustomers$.subscribe((customers) => {
      this.customers = customers;
    });
  }

  customerStats = [
    { id: 1, description: 'Total Customers Serviced', value: 100, delta: 10 },
    { id: 2, description: 'Monthly Customers', value: 20, delta: -2 },
    { id: 3, description: 'Total Reviews', value: 120, delta: 10 },
    { id: 4, description: 'Referals', value: 20, delta: -2 },
  ];
}
