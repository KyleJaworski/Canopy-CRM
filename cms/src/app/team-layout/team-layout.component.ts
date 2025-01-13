import { Component, Input } from '@angular/core';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { EmployeeFactory, AppRole, Employee } from '../classes/employee';

@Component({
  selector: 'app-team-layout',
  imports: [EmployeeListComponent, EmployeeInfoComponent],
  templateUrl: './team-layout.component.html',
  styleUrl: './team-layout.component.scss',
})
export class TeamLayoutComponent {
  selectedEmployee?: Employee;

  onSelectedEmployeeRecieved(employee: Employee): void {
    this.selectedEmployee = employee;
    console.log(employee);
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
