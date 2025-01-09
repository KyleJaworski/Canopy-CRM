import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFactory, AppRole, Employee } from '../classes/employee';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  ngOnInit(): void {
    this.employees.push(
      EmployeeFactory.createEmployee({
        name: 'Jarek (Tree Daddie)',
        jobTitle: 'Team Lead',
        role: AppRole.Admin,
      })
    );
    this.employees.push(
      EmployeeFactory.createEmployee({
        name: 'Britt Flourladie',
        jobTitle: 'Schedular',
        role: AppRole.User,
      })
    );
  }
}
