import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee, EmployeeFactory, AppRole } from '../../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private addEmployeeBool = new BehaviorSubject<boolean>(false); // Default value is false
  private mockUsers: Employee[] = [
    {
      id: 1,
      firstName: 'Jarek',
      lastName: 'Tree Daddie',
      jobTitle: 'Team Lead',
      role: AppRole.Admin,
      email: 'jarekbobarek@treedaddies.com',
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
    },
  ];

  // Observable for components to subscribe to
  addEmployeeBool$ = this.addEmployeeBool.asObservable();

  // Method to toggle or update the state
  setAddEmployee(value: boolean): void {
    this.addEmployeeBool.next(value);
  }

  // Method to get the current value
  getAddEmployee(): boolean {
    return this.addEmployeeBool.value;
  }

  getMockusers(): Employee[] {
    return this.mockUsers;
  }
}
