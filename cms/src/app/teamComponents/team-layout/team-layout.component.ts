import { Component } from '@angular/core';
import { PersonListComponent } from '../../generalComponents/person-list/person-list.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { Employee } from '../../models/employee';
import { TabBarComponent } from '../../generalComponents/tab-bar/tab-bar.component';
import { CommonModule } from '@angular/common';
import { TabItem } from '../../models/tabItems';
import { EmployeeService } from '../../services/employee/employee.service';
import { EmployeesOverviewComponent } from '../employees-overview/employees-overview.component';
import { ListItem, updateListItems, ObjectType } from '../../models/listItem';

@Component({
  selector: 'app-team-layout',
  imports: [
    PersonListComponent,
    EmployeeInfoComponent,
    TabBarComponent,
    CommonModule,
    EmployeesOverviewComponent,
  ],
  templateUrl: './team-layout.component.html',
  styleUrl: './team-layout.component.scss',
})
export class TeamLayoutComponent {
  selectedEmployee?: Employee | null = null;
  addEmployee: Boolean = false;
  employees: Employee[] = [];
  listItems: ListItem[] = [];
  objectType: ObjectType = ObjectType.Employee;

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

    this.employeeService.mockEmployees$.subscribe((employees) => {
      this.employees = employees;
      this.listItems = updateListItems(employees, ObjectType.Employee); // Update listItems whenever employees change
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

  onSelectedEmployeeRecieved(listItem: ListItem): void {
    const employee = this.employees.find(
      (emp) => emp.employeeId === listItem.id
    );

    this.selectedEmployee == employee
      ? (this.selectedEmployee = null)
      : (this.selectedEmployee = employee);
  }

  onAddEmployeeRecieved(add: Boolean): void {
    this.addEmployee = add;
  }
}
