import { Component, Input } from '@angular/core';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { EmployeeFactory, AppRole, Employee } from '../classes/employee';
import { TabBarComponent } from '../tab-bar/tab-bar.component';
import { CommonModule } from '@angular/common';
import { TabItem } from '../classes/tabItems';

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
  selectedEmployee?: Employee;
  addEmployee: Boolean = false;

  tabItems: TabItem[] = [
    { label: 'Contact Information', active: true, value: 1, indicator: 0 },
    { label: 'Privlidges', active: false, value: 2, indicator: 1 },
  ];

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

  employees: Employee[] = [];

  ngOnInit(): void {
    this.employees.push(
      EmployeeFactory.createEmployee({
        id: 1,
        firstName: 'Jarek',
        lastName: 'Tree Daddie',
        jobTitle: 'Team Lead',
        role: AppRole.Admin,
        address: {
          street: '1234 Elm St',
          city: 'Springfield',
          postalCode: '12345',
        },
      })
    );
    this.employees.push(
      EmployeeFactory.createEmployee({
        id: 2,
        firstName: 'Britt',
        lastName: 'Flourladie',
        jobTitle: 'Schedular',
        role: AppRole.User,
      })
    );
  }
}
