import { Injectable } from '@angular/core';
import { Customer } from '../../models/customer';
import { EntityService } from '../entity/entity.service';
import { StateService } from '../state/state.service';
import { ViewableObjectType } from '../../models/viewableObjects';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends EntityService<Customer> {
  constructor(private stateService: StateService) {
    super(
      'mockCustomers',
      [
        {
          customerId: 1,
          firstName: 'Brandie',
          lastName: 'First',
          email: 'jarekbobarek@treedaddies.com',
          phoneNumber: '765-458-7519',
          address: {
            street: '1234 Elm St',
            city: 'Springfield',
            postalCode: '12345',
          },
          isActive: true,
          createdDate: new Date(2024, 3, 24),
        },
        {
          customerId: 2,
          firstName: 'Page',
          lastName: 'Lauter',
          email: 'no@gmail.com',
          phoneNumber: '465-754-7958',
          address: {
            street: '23542 Harrow Road',
            city: 'Lafayette',
            postalCode: '43211',
          },
          isActive: true,
          createdDate: new Date(2024, 4, 1),
        },
        {
          customerId: 3,
          firstName: 'Leonard',
          lastName: 'Lauter',
          email: 'no@gmail.com',
          phoneNumber: '465-754-7958',
          address: {
            street: '23542 Harrow Road',
            city: 'Lafayette',
            postalCode: '43211',
          },
          isActive: true,
          createdDate: new Date(2024, 1, 10),
        },
        {
          customerId: 4,
          firstName: 'Ali',
          lastName: 'Lauter',
          email: 'no@gmail.com',
          phoneNumber: '465-754-7958',
          address: {
            street: '23542 Harrow Road',
            city: 'Lafayette',
            postalCode: '43211',
          },
          isActive: true,
          createdDate: new Date(2022, 10, 10),
        },
      ],
      'customerId'
    );
  }

  flipAddCustomer(): void {
    this.setAddEntityState(!this.getAddEntityState());
  }

  updateCustomer(customerToUpdate: Customer): void {
    const currentCustomers = this.getEntities();
    const index = currentCustomers.findIndex(
      (cust) => cust.customerId === customerToUpdate.customerId
    );

    if (index !== -1) {
      const updatedCustomers = [...currentCustomers];
      updatedCustomers[index] = {
        ...currentCustomers[index],
        ...customerToUpdate,
      };

      this.setEntities(updatedCustomers);

      const updatedCustomer = updatedCustomers[index];
      this.stateService.setSelectedObject(
        ViewableObjectType.Customer,
        updatedCustomer
      );
    }
  }

  deactivateCustomer(cust: Customer): void {
    this.updateCustomer({ ...cust, isActive: false });
  }

  activateCustomer(cust: Customer): void {
    this.updateCustomer({ ...cust, isActive: true });
  }

  getCustomerById(id: number): Customer | undefined {
    return this.getEntityById(id);
  }

  deleteCustomer(cust: Customer): void {
    this.setEntities(
      this.getEntities().filter(
        (customer) => customer.customerId !== cust.customerId
      )
    );
    this.stateService.clearSelection();
  }

  addCustomer(newCustomer: Customer): void {
    this.setEntities([...this.getEntities(), newCustomer]);
  }

  generateUniqueCustomerId(): number {
    const existingIds = new Set(
      this.getEntities().map((cust) => cust.customerId)
    );
    let newId: number;
    do {
      newId = Math.floor(Math.random() * 10000) + 1;
    } while (existingIds.has(newId));
    return newId;
  }
}
