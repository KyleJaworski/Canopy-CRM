import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { DashboardLayoutComponent } from '../../dashboardComponents/dashboard-layout/dashboard-layout.component';
import { TeamLayoutComponent } from '../../teamComponents/team-layout/team-layout.component';
import { CustomerLayoutComponent } from '../../customerComponents/customer-layout/customer-layout.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    MenuBarComponent,
    DashboardLayoutComponent,
    TeamLayoutComponent,

    CustomerLayoutComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  currentPage: string = 'Team';
  handleMenuSelection(selectedPage: string) {
    this.currentPage = selectedPage; // Update the current page
  }
  ngOnInit() {}
}
