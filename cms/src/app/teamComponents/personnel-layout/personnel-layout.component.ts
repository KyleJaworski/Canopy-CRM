import { Component, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from '../../generalComponents/person-list/person-list.component';
import { EmployeeInfoComponent } from '../personnel-info/personnel-info.component';
import { TabBarComponent } from '../../generalComponents/tab-bar/tab-bar.component';
import { EmployeesOverviewComponent } from '../personnel-overview/personnel-overview.component';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../models/employee';
import { TabItem } from '../../models/tabItems';
import { filter, map, startWith } from 'rxjs/operators';
import { ListItem, updateListItems, ObjectType } from '../../models/listItem';
import { Subscription } from 'rxjs';
import { StateService } from '../../services/state/state.service';
import { ViewableObjectType } from '../../models/viewableObjects';

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
export class TeamLayoutComponent implements OnDestroy {
  // State variables
  @Input() selectedEmployee: Employee | null = null;
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
  private subscriptions: Subscription = new Subscription();

  constructor(
    private employeeService: EmployeeService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    // Handle changes to addEmployee state
    this.subscriptions.add(
      this.employeeService.addEntity$.subscribe((value: boolean) => {
        this.selectedEmployee = this.selectedEmployee;
        this.addEmployee = value;
      })
    );

    this.fetchEmployees();
  }

  ngOnDestroy(): void {
    // Properly unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
    if (this.addEmployee === true) this.employeeService.flipAddEmployee();
  }

  // Handle tab selection
  handleTabSelection(selectedTab: TabItem): void {
    this.tabItems.forEach((tab) => (tab.active = tab === selectedTab));
  }

  // Check if a tab is active
  isTabActive(tab: TabItem): boolean {
    return tab.active;
  }

  fetchEmployees(): void {
    // Update employees and listItems whenever employees change
    this.subscriptions.add(
      this.employeeService.entities$.subscribe((employees) => {
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
      })
    );
    this.loading = false;
  }
}
