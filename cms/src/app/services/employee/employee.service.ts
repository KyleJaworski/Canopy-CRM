import { Injectable } from '@angular/core';
import { Employee, TeamRole } from '../../models/employee';
import { EntityService } from '../entity/entity.service';
import { StateService } from '../state/state.service';
import { ViewableObjectType } from '../../models/viewableObjects';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends EntityService<Employee> {
  constructor(private stateService: StateService) {
    super(
      'mockEmployees',
      [
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
      ],
      'employeeId'
    );
  }

  flipAddEmployee(): void {
    this.setAddEntityState(!this.getAddEntityState());
  }

  deactivateEmployee(emp: Employee): void {
    this.updateEmployee({ ...emp, isActive: false });
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.getEntityById(id);
  }

  activateEmployee(emp: Employee): void {
    this.updateEmployee({ ...emp, isActive: true });
  }

  updateEmployee(employeeToUpdate: Employee): void {
    const currentEmployees = this.getEntities();
    const index = currentEmployees.findIndex(
      (emp) => emp.employeeId === employeeToUpdate.employeeId
    );

    if (index !== -1) {
      const updatedEmployees = [...currentEmployees];
      updatedEmployees[index] = {
        ...currentEmployees[index],
        ...employeeToUpdate,
      };
      this.setEntities(updatedEmployees);
      const updatedCustomer = updatedEmployees[index];
      this.stateService.setSelectedObject(
        ViewableObjectType.Employee,
        updatedCustomer
      );
    }
  }

  addEmployee(newEmployee: Employee): void {
    this.setEntities([...this.getEntities(), newEmployee]);
  }

  deleteEmployee(emp: Employee): void {
    this.setEntities(
      this.getEntities().filter(
        (employee) => employee.employeeId !== emp.employeeId
      )
    );
    this.stateService.clearSelection();
  }

  generateUniqueEmployeeId(): number {
    const existingIds = new Set(
      this.getEntities().map((emp) => emp.employeeId)
    );
    let newId: number;
    do {
      newId = Math.floor(Math.random() * 10000) + 1;
    } while (existingIds.has(newId));
    return newId;
  }
}
