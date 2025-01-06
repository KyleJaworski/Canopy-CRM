import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { StatsComponent } from '../stats/stats.component';
import { DashboardLayoutComponent } from '../dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    MenuBarComponent,
    StatsComponent,
    DashboardLayoutComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  ngOnInit() {}
}
