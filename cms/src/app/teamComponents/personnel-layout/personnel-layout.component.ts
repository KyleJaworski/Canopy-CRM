import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from '../../generalComponents/person-list/person-list.component';
import { EmployeeInfoComponent } from '../personnel-info/personnel-info.component';
import { TabBarComponent } from '../../generalComponents/tab-bar/tab-bar.component';
import { EmployeesOverviewComponent } from '../personnel-overview/personnel-overview.component';
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
  templateUrl: './personnel-layout.component.html',
  styleUrl: './personnel-layout.component.scss',
})
export class TeamLayoutComponent {
  // State variables
  selectedEmployee: Employee | null = null;
  addEmployee: boolean = false;
  employees: Employee[] = [];
  listItems: ListItem[] = [];
  objectType: ObjectType = ObjectType.Employee;
  loading: boolean = true;

  // Tabs for the layout
  tabItems: TabItem[] = [
    { label: 'Contact Information', active: true, value: 1, indicator: 0 },
    { label: 'Privileges', active: false, value: 2, indicator: 1 },
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // Handle changes to addEmployee state
    this.loading = true;
    this.employeeService.addEmployeeBool$.subscribe((value: boolean) => {
      this.selectedEmployee = this.selectedEmployee;
      this.addEmployee = value;
    });

    this.clearData();
    this.fetchEmployees();
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
  onSelectedEmployeeRecieved(listItem: ListItem | null): void {
    if (listItem) {
      const employee = this.employees.find(
        (emp) => emp.employeeId === listItem.id
      );

      this.selectedEmployee =
        this.selectedEmployee === employee ? null : employee || null;
    } else {
      this.selectedEmployee = null;
    }
  }

  // Handle "add employee" action
  onAddEmployeeRecieved(add: boolean): void {
    this.addEmployee = add;
  }

  fetchEmployees(): void {
    // Update employees and listItems whenever employees change
    this.employeeService.mockEmployees$.subscribe((employees) => {
      // Check if the selectedEmployee still exists in the employees list
      if (this.selectedEmployee) {
        const isSelectedEmployeeValid = employees.some(
          (employee) =>
            employee.employeeId === this.selectedEmployee?.employeeId
        );

        // Set selectedEmployee to null if it's no longer in the employees list
        this.selectedEmployee = isSelectedEmployeeValid
          ? this.selectedEmployee
          : null;
      }

      // Update the list of employees and listItems

      this.listItems = [...updateListItems(employees, ObjectType.Employee)];
      this.employees = [...employees];
    });
    this.loading = false;
  }
  clearData(): void {
    this.loading = true;
    this.employees = [];
    this.listItems = [];
  }
}
