import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee/employee.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  @Output() selectedEmployee = new EventEmitter<Employee>();

  addEmployee!: Boolean;
  loggedInUser!: User;
  employees: Employee[] = [];
  selectedEmployeeId: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.authenticationService.getUser()!;

    this.employeeService.addEmployeeBool$.subscribe((value: Boolean) => {
      this.addEmployee = value;
    });

    this.employeeService.mockEmployees$.subscribe((employees) => {
      this.employees = employees;
    });
  }

  onSelectEmployee(employee: Employee): void {
    this.selectedEmployeeId == employee.employeeId
      ? (this.selectedEmployeeId = 0)
      : (this.selectedEmployeeId = employee.employeeId);

    this.selectedEmployee.emit(employee); // Emit the selected employee
  }

  toggleAddEmployee(): void {
    this.selectedEmployeeId = 0;
    this.employeeService.flipAddEmployee(); // Toggle the value
  }
}
