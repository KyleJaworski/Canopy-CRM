import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee, AppRole } from '../../models/employee';

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
    const storedEmployees = this.isBrowser()
      ? localStorage.getItem('mockEmployees')
      : null;
    const initialEmployees = storedEmployees
      ? JSON.parse(storedEmployees)
      : this.getDefaultMockEmployees();

    this.mockEmployeesSubject.next(initialEmployees);
  }

  // Check if code is running in the browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Method to toggle or update the state
  flipAddEmployee(): void {
    this.addEmployeeBool.next(!this.addEmployeeBool.value);
  }

  updateEmployee(employeeToUpdate: Employee) {
    const currentEmployees = this.mockEmployeesSubject.value; // Get the current value of mockEmployees

    const index = currentEmployees.findIndex(
      (emp) => emp.id === employeeToUpdate.id
    );

    if (index !== -1) {
      const updatedEmployees = [...currentEmployees];
      updatedEmployees[index] = {
        ...currentEmployees[index],
        ...employeeToUpdate,
      };

      // Emit the updated Employees array
      this.mockEmployeesSubject.next(updatedEmployees);

      // Save to localStorage if in the browser
      if (this.isBrowser()) {
        localStorage.setItem('mockEmployees', JSON.stringify(updatedEmployees));
      }
    }
  }

  addEmployee(newEmployee: Employee): void {
    const currentEmployees = this.mockEmployeesSubject.value;
    const updatedEmployees = [...currentEmployees, newEmployee];

    // Emit the updated array and save to localStorage
    this.mockEmployeesSubject.next(updatedEmployees);

    if (this.isBrowser()) {
      localStorage.setItem('mockEmployees', JSON.stringify(updatedEmployees));
    }
  }

  getMockEmployees(): Employee[] {
    return this.mockEmployeesSubject.value; // Get the current value of mockEmployees
  }

  generateUniqueEmployeeId(): number {
    const currentEmployees = this.getMockEmployees(); // Get current employees
    const existingIds = new Set(currentEmployees.map((emp) => emp.id)); // Store all existing IDs in a Set

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
        id: 1,
        firstName: 'Jarek',
        lastName: 'Tree Daddie',
        jobTitle: 'Team Lead',
        role: AppRole.Admin,
        email: 'jarekbobarek@treedaddies.com',
        phoneNumber: '765-458-7519',
        address: {
          street: '1234 Elm St',
          city: 'Springfield',
          postalCode: '12345',
        },
      },
      {
        id: 2,
        firstName: 'Britt',
        lastName: 'Flourladie',
        jobTitle: 'Schedular',
        role: AppRole.User,
        email: 'info@treedaddies.com',
        phoneNumber: '465-754-7958',
        address: {
          street: '23542 harrow road',
          city: 'Lafayette',
          postalCode: '43211',
        },
      },
    ];
  }
}
