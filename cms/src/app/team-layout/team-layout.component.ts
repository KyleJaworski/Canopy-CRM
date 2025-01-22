import { Component, Input } from '@angular/core';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { EmployeeFactory, AppRole, Employee } from '../models/employee';
import { TabBarComponent } from '../tab-bar/tab-bar.component';
import { CommonModule } from '@angular/common';
import { TabItem } from '../models/tabItems';
import { EmployeeService } from '../services/employee/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-layout',
  imports: [
    EmployeeListComponent,
    EmployeeInfoComponent,
    TabBarComponent,
    CommonModule,
  ],
  templateUrl: './team-layout.component.html',
  styleUrl: './team-layout.component.scss',
})
export class TeamLayoutComponent {
  selectedEmployee?: Employee | null = null;
  addEmployee: Boolean = false;
  employees: Employee[] = [];

  tabItems: TabItem[] = [
    { label: 'Contact Information', active: true, value: 1, indicator: 0 },
    { label: 'Privlidges', active: false, value: 2, indicator: 1 },
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.addEmployeeBool$.subscribe((value: Boolean) => {
      this.selectedEmployee = null;

      this.addEmployee = value;
    });
  }

  handleTabSelection(selectedTab: TabItem) {
    for (let tab of this.tabItems) {
      tab === selectedTab ? (tab.active = true) : (tab.active = false);
    }
  }

  isTabActive(tab: TabItem): boolean {
    return tab.active === true;
  }

  onSelectedEmployeeRecieved(employee: Employee): void {
    this.selectedEmployee = employee;
  }
  onAddEmployeeRecieved(add: Boolean): void {
    this.addEmployee = add;
  }
}
