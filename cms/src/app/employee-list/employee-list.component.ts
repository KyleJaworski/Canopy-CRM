import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFactory, AppRole, Employee } from '../classes/employee';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  @Input() employees: Employee[] = [];
  @Output() selectedEmployee = new EventEmitter<Employee>();
  @Output() addEmployee = new EventEmitter<Boolean>();

  selectedEmployeeId: number = 0;

  onSelectEmployee(employee: Employee): void {
    this.selectedEmployee.emit(employee); // Emit the selected employee
  }

  onAddEmployee(): void {
    this.addEmployee.emit(true);
  }
}
