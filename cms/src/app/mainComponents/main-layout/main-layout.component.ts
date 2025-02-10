import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { DashboardLayoutComponent } from '../../dashboardComponents/dashboard-layout/dashboard-layout.component';
import { TeamLayoutComponent } from '../../teamComponents/personnel-layout/personnel-layout.component';
import { CustomerLayoutComponent } from '../../customerComponents/customer-layout/customer-layout.component';
import { MenuItems } from '../../models/menuItems.enum';
import { MenuService } from '../../services/menu/menu.service';
import { StateService } from '../../services/state/state.service';
import {
  ViewableObject,
  ViewableObjectType,
} from '../../models/viewableObjects';
import { Employee } from '../../models/employee';
import { Customer } from '../../models/customer';
import { map, startWith } from 'rxjs/operators';

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
  employeeToView: Employee | null = null;
  customerToView: Customer | null = null;

  constructor(
    private menuService: MenuService,
    private stateService: StateService
  ) {}
  ngOnInit() {
    this.menuService.currentPage$.subscribe((value: MenuItems) => {
      this.currentPage = value;
    });
    this.stateService.selectedObject$
      .pipe(
        startWith(null), // ✅ Ensures default state is `null`
        map((selected) => {
          if (!selected) return { customer: null, employee: null };

          switch (selected.type) {
            case ViewableObjectType.Customer:
              return { customer: selected.object as Customer, employee: null };
            case ViewableObjectType.Employee:
              return { customer: null, employee: selected.object as Employee };
            default:
              return { customer: null, employee: null };
          }
        })
      )
      .subscribe(({ customer, employee }) => {
        this.customerToView = customer; // ✅ Stores Customer if selected
        this.employeeToView = employee; // ✅ Stores Employee if selected
      });
  }
}
