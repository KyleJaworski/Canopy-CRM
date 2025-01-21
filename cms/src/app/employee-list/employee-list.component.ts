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
  constructor(
    private employeeService: EmployeeService,
    private authenticationService: AuthenticationService
  ) {}

  @Output() selectedEmployee = new EventEmitter<Employee>();

  loggedInUser!: User;
  employees: Employee[] = [];

  ngOnInit(): void {
    this.employees = this.employeeService.getMockusers();
    this.loggedInUser = this.authenticationService.getUser()!;
    console.log('hello');
  }

  selectedEmployeeId: number = 0;

  onSelectEmployee(employee: Employee): void {
    this.selectedEmployee.emit(employee); // Emit the selected employee
  }

  toggleAddEmployee(): void {
    const current = this.employeeService.getAddEmployee();
    this.employeeService.setAddEmployee(!current); // Toggle the value
  }
}
