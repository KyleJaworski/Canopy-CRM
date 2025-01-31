import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { DashboardLayoutComponent } from '../../dashboardComponents/dashboard-layout/dashboard-layout.component';
import { TeamLayoutComponent } from '../../teamComponents/personnel-layout/personnel-layout.component';
import { CustomerLayoutComponent } from '../../customerComponents/customer-layout/customer-layout.component';
import { MenuItems } from '../../models/menuItems.enum';
import { MenuService } from '../../services/menu/menu.service';
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
  currentPage!: MenuItems;
  menuItems = MenuItems;

  constructor(private menuService: MenuService) {}
  ngOnInit() {
    this.menuService.currentPage$.subscribe((value: MenuItems) => {
      this.currentPage = value;
    });
  }
}
