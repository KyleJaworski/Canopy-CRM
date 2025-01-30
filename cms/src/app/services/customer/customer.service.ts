import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private addCustomerBool = new BehaviorSubject<boolean>(false);
  private mockCustomersSubject = new BehaviorSubject<Customer[]>([]);

  // Observables for components to subscribe to
  addCustomerBool$ = this.addCustomerBool.asObservable();
  mockCustomers$ = this.mockCustomersSubject.asObservable();

  constructor() {
    if (this.isBrowser()) {
      const storedCustomers = sessionStorage.getItem('mockCustomers');
      const initialCustomers = storedCustomers
        ? JSON.parse(storedCustomers, (key, value) =>
            key === 'createdDate' ? new Date(value) : value
          )
        : this.getDefaultMockCustomers();

      if (!storedCustomers) {
        this.saveToSessionStorage(initialCustomers);
      }

      this.mockCustomersSubject.next(initialCustomers);
    }
  }

  private saveToSessionStorage(customers: Customer[]): void {
    if (this.isBrowser()) {
      sessionStorage.setItem(
        'mockCustomers',
        JSON.stringify(customers, (key, value) =>
          key === 'createdDate' && value instanceof Date
            ? value.toISOString()
            : value
        )
      );
    }
  }

  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
    );
  }

  flipAddCustomer(): void {
    this.addCustomerBool.next(!this.addCustomerBool.value);
  }

  updateCustomer(customerToUpdate: Customer) {
    const currentCustomers = this.mockCustomersSubject.value;
    const index = currentCustomers.findIndex(
      (cust) => cust.customerId === customerToUpdate.customerId
    );

    if (index !== -1) {
      const updatedCustomers = [...currentCustomers];
      updatedCustomers[index] = {
        ...currentCustomers[index],
        ...customerToUpdate,
      };

      this.mockCustomersSubject.next(updatedCustomers);
      this.saveToSessionStorage(updatedCustomers);
    }
  }

  deactivateCustomer(cust: Customer) {
    const updatedCustomer = { ...cust, isActive: false };
    this.updateCustomer(updatedCustomer);
  }

  activateCustomer(cust: Customer) {
    const updatedCustomer = { ...cust, isActive: true };
    this.updateCustomer(updatedCustomer);
  }

  deleteCustomer(cust: Customer) {
    const currentCustomers = this.mockCustomersSubject.value;
    const updatedCustomers = currentCustomers.filter(
      (customer) => customer.customerId !== cust.customerId
    );

    this.saveToSessionStorage(updatedCustomers);
    this.mockCustomersSubject.next(updatedCustomers);
  }

  addCustomer(newCustomer: Customer): void {
    const currentCustomers = this.mockCustomersSubject.value;
    const updatedCustomers = [...currentCustomers, newCustomer];

    this.saveToSessionStorage(updatedCustomers);
    this.mockCustomersSubject.next(updatedCustomers);
  }

  getMockCustomers(): Customer[] {
    return this.mockCustomersSubject.value;
  }

  generateUniqueCustomerId(): number {
    const currentCustomers = this.getMockCustomers();
    const existingIds = new Set(
      currentCustomers.map((cust) => cust.customerId)
    );

    let newId: number;
    do {
      newId = Math.floor(Math.random() * 10000) + 1;
    } while (existingIds.has(newId));

    return newId;
  }

  private getDefaultMockCustomers(): Customer[] {
    return [
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
        createdDate: new Date(2024, 3, 24), // Ensured as Date object
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
    ];
  }
}
