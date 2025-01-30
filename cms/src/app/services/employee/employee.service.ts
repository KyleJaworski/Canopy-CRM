import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee, TeamRole } from '../../models/employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private addEmployeeBool = new BehaviorSubject<boolean>(false); // Default value is false
  private mockEmployeesSubject = new BehaviorSubject<Employee[]>([]);

  // Observable for components to subscribe to
  addEmployeeBool$ = this.addEmployeeBool.asObservable();
  mockEmployees$ = this.mockEmployeesSubject.asObservable();

  constructor() {
    // Load initial data from localStorage if available and in browser environment
    if (this.isBrowser()) {
      // Load from localStorage (if available)
      const storedEmployees = localStorage.getItem('mockEmployees');
      const initialEmployees = storedEmployees
        ? JSON.parse(storedEmployees)
        : this.getDefaultMockEmployees();

      // Initialize localStorage only once
      if (!storedEmployees) {
        localStorage.setItem('mockEmployees', JSON.stringify(initialEmployees));
      }

      // Push to subscribers
      this.mockEmployeesSubject.next(initialEmployees);
    }
  }

  // Check if code is running in the browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Method to toggle or update the state
  flipAddEmployee(): void {
    this.addEmployeeBool.next(!this.addEmployeeBool.value);
  }

  deactivateEmployee(emp: Employee) {
    const updatedEmployee = { ...emp, isActive: false };
    this.updateEmployee(updatedEmployee);
  }

  activateEmployee(emp: Employee) {
    const updatedEmployee = { ...emp, isActive: true };
    this.updateEmployee(updatedEmployee);
  }

  updateEmployee(employeeToUpdate: Employee) {
    const currentEmployees = this.mockEmployeesSubject.value; // Get the current value of mockEmployees

    const index = currentEmployees.findIndex(
      (emp) => emp.employeeId === employeeToUpdate.employeeId
    );

    if (index !== -1) {
      const updatedEmployees = [...currentEmployees];
      updatedEmployees[index] = {
        ...currentEmployees[index],
        ...employeeToUpdate,
      };

      // Save to localStorage if in the browser
      if (this.isBrowser()) {
        localStorage.setItem('mockEmployees', JSON.stringify(updatedEmployees));
      }
      // Emit the updated Employees array
      this.mockEmployeesSubject.next(updatedEmployees);
    }
  }

  addEmployee(newEmployee: Employee): void {
    const currentEmployees = this.mockEmployeesSubject.value;
    const updatedEmployees = [...currentEmployees, newEmployee];

    if (this.isBrowser()) {
      localStorage.setItem('mockEmployees', JSON.stringify(updatedEmployees));
    }
    this.mockEmployeesSubject.next(updatedEmployees);
  }

  deleteEmployee(emp: Employee) {
    const currentEmployees = this.mockEmployeesSubject.value;
    const updatedEmployees = currentEmployees.filter(
      (employee) => employee.employeeId !== emp.employeeId
    );

    if (this.isBrowser()) {
      localStorage.setItem('mockEmployees', JSON.stringify(updatedEmployees));
    }
    this.mockEmployeesSubject.next(updatedEmployees);
  }

  getMockEmployees(): Employee[] {
    return this.mockEmployeesSubject.value; // Get the current value of mockEmployees
  }

  generateUniqueEmployeeId(): number {
    const currentEmployees = this.getMockEmployees(); // Get current employees
    const existingIds = new Set(currentEmployees.map((emp) => emp.employeeId)); // Store all existing IDs in a Set

    let newId: number;

    // Generate a new ID until it's unique
    do {
      newId = Math.floor(Math.random() * 10000) + 1; // Random number between 1 and 10000
    } while (existingIds.has(newId));

    return newId;
  }

  // Default mockEmployees
  private getDefaultMockEmployees(): Employee[] {
    return [
      {
        employeeId: 1,
        directReportId: null,
        firstName: 'Jarek',
        lastName: 'Tree Daddie',
        jobTitle: 'CEO',
        teamRole: TeamRole.Executive,
        email: 'jarekbobarek@treedaddies.com',
        phoneNumber: '765-458-7519',
        address: {
          street: '1234 Elm St',
          city: 'Springfield',
          postalCode: '12345',
        },
        isActive: true,
      },
      {
        employeeId: 2,
        directReportId: 1,
        firstName: 'Britt',
        lastName: 'Flourladie',
        jobTitle: 'Schedular',
        teamRole: TeamRole.Coordinator,
        email: 'info@treedaddies.com',
        phoneNumber: '465-754-7958',
        address: {
          street: '23542 harrow road',
          city: 'Lafayette',
          postalCode: '43211',
        },
        isActive: true,
      },
    ];
  }
}
