import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from '../../generalComponents/person-list/person-list.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { TabBarComponent } from '../../generalComponents/tab-bar/tab-bar.component';
import { EmployeesOverviewComponent } from '../employees-overview/employees-overview.component';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../models/employee';
import { TabItem } from '../../models/tabItems';
import { ListItem, updateListItems, ObjectType } from '../../models/listItem';

@Component({
  selector: 'app-team-layout',
  imports: [
    CommonModule,
    PersonListComponent,
    EmployeeInfoComponent,
    TabBarComponent,
    EmployeesOverviewComponent,
  ],
  templateUrl: './team-layout.component.html',
  styleUrl: './team-layout.component.scss',
})
export class TeamLayoutComponent {
  // State variables
  selectedEmployee?: Employee | null = null;
  addEmployee: boolean = false;
  employees: Employee[] = [];
  listItems: ListItem[] = [];
  objectType: ObjectType = ObjectType.Employee;

  // Tabs for the layout
  tabItems: TabItem[] = [
    { label: 'Contact Information', active: true, value: 1, indicator: 0 },
    { label: 'Privileges', active: false, value: 2, indicator: 1 },
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // Handle changes to addEmployee state
    this.employeeService.addEmployeeBool$.subscribe((value: boolean) => {
      this.selectedEmployee = null;
      this.addEmployee = value;
    });

    // Update employees and listItems whenever employees change
    this.employeeService.mockEmployees$.subscribe((employees) => {
      this.employees = employees;
      this.listItems = updateListItems(employees, ObjectType.Employee);
    });
  }

  // Handle tab selection
  handleTabSelection(selectedTab: TabItem): void {
    this.tabItems.forEach((tab) => (tab.active = tab === selectedTab));
  }

  // Check if a tab is active
  isTabActive(tab: TabItem): boolean {
    return tab.active;
  }

  // Handle selected employee from list
  onSelectedEmployeeRecieved(listItem: ListItem): void {
    const employee = this.employees.find(
      (emp) => emp.employeeId === listItem.id
    );
    this.selectedEmployee =
      this.selectedEmployee === employee ? null : employee;
  }

  // Handle "add employee" action
  onAddEmployeeRecieved(add: boolean): void {
    this.addEmployee = add;
  }
}
