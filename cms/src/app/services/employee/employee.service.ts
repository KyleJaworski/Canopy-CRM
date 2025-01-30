import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee, TeamRole } from '../../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private addEmployeeBool = new BehaviorSubject<boolean>(false);
  private mockEmployeesSubject = new BehaviorSubject<Employee[]>([]);

  // Observable for components to subscribe to
  addEmployeeBool$ = this.addEmployeeBool.asObservable();
  mockEmployees$ = this.mockEmployeesSubject.asObservable();

  constructor() {
    if (this.isBrowser()) {
      // Load employees from sessionStorage
      const storedEmployees = sessionStorage.getItem('mockEmployees');
      const initialEmployees = storedEmployees
        ? JSON.parse(storedEmployees, (key, value) =>
            key === 'createdDate' ? new Date(value) : value
          )
        : this.getDefaultMockEmployees();

      if (!storedEmployees) {
        this.saveToSessionStorage(initialEmployees);
      }

      this.mockEmployeesSubject.next(initialEmployees);
    }
  }

  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
    );
  }

  private saveToSessionStorage(employees: Employee[]): void {
    if (this.isBrowser()) {
      sessionStorage.setItem(
        'mockEmployees',
        JSON.stringify(employees, (key, value) =>
          key === 'createdDate' && value instanceof Date
            ? value.toISOString()
            : value
        )
      );
    }
  }

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
    const currentEmployees = this.mockEmployeesSubject.value;
    const index = currentEmployees.findIndex(
      (emp) => emp.employeeId === employeeToUpdate.employeeId
    );

    if (index !== -1) {
      const updatedEmployees = [...currentEmployees];
      updatedEmployees[index] = {
        ...currentEmployees[index],
        ...employeeToUpdate,
      };

      this.saveToSessionStorage(updatedEmployees);
      this.mockEmployeesSubject.next(updatedEmployees);
    }
  }

  addEmployee(newEmployee: Employee): void {
    const currentEmployees = this.mockEmployeesSubject.value;
    const updatedEmployees = [...currentEmployees, newEmployee];

    this.saveToSessionStorage(updatedEmployees);
    this.mockEmployeesSubject.next(updatedEmployees);
  }

  deleteEmployee(emp: Employee) {
    const currentEmployees = this.mockEmployeesSubject.value;
    const updatedEmployees = currentEmployees.filter(
      (employee) => employee.employeeId !== emp.employeeId
    );

    this.saveToSessionStorage(updatedEmployees);
    this.mockEmployeesSubject.next(updatedEmployees);
  }

  getMockEmployees(): Employee[] {
    return this.mockEmployeesSubject.value;
  }

  generateUniqueEmployeeId(): number {
    const currentEmployees = this.getMockEmployees();
    const existingIds = new Set(currentEmployees.map((emp) => emp.employeeId));

    let newId: number;
    do {
      newId = Math.floor(Math.random() * 10000) + 1;
    } while (existingIds.has(newId));

    return newId;
  }

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
        jobTitle: 'Scheduler',
        teamRole: TeamRole.Coordinator,
        email: 'info@treedaddies.com',
        phoneNumber: '465-754-7958',
        address: {
          street: '23542 Harrow Road',
          city: 'Lafayette',
          postalCode: '43211',
        },
        isActive: true,
      },
    ];
  }
}
