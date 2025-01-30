import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private addCustomerBool = new BehaviorSubject<boolean>(false); // Default value is false
  private mockCustomersSubject = new BehaviorSubject<Customer[]>([]);

  // Observable for components to subscribe to
  addCustomerBool$ = this.addCustomerBool.asObservable();
  mockCustomers$ = this.mockCustomersSubject.asObservable();

  constructor() {
    // Load initial data from localStorage if available and in browser environment
    if (this.isBrowser()) {
      // Load from localStorage (if available)
      const storedCustomers = localStorage.getItem('mockCustomers');
      const initialCustomers = storedCustomers
        ? JSON.parse(storedCustomers)
        : this.getDefaultMockCustomers();

      // Initialize localStorage only once
      if (!storedCustomers) {
        localStorage.setItem('mockCustomers', JSON.stringify(initialCustomers));
      }

      // Push to subscribers
      this.mockCustomersSubject.next(initialCustomers);
    }
  }

  // Check if code is running in the browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Method to toggle or update the state
  flipAddCustomer(): void {
    this.addCustomerBool.next(!this.addCustomerBool.value);
  }

  updateCustomer(customerToUpdate: Customer) {
    const currentCustomers = this.mockCustomersSubject.value; // Get the current value of mockCustomers

    const index = currentCustomers.findIndex(
      (cust) => cust.customerId === customerToUpdate.customerId
    );

    if (index !== -1) {
      const updatedCustomers = [...currentCustomers];
      updatedCustomers[index] = {
        ...currentCustomers[index],
        ...customerToUpdate,
      };

      // Emit the updated Customers array
      this.mockCustomersSubject.next(updatedCustomers);

      // Save to localStorage if in the browser
      if (this.isBrowser()) {
        localStorage.setItem('mockCustomers', JSON.stringify(updatedCustomers));
      }
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

    if (this.isBrowser()) {
      localStorage.setItem('mockCustomers', JSON.stringify(updatedCustomers));
    }
    this.mockCustomersSubject.next(updatedCustomers);
  }
  addCustomer(newCustomer: Customer): void {
    const currentCustomers = this.mockCustomersSubject.value;
    const updatedCustomers = [...currentCustomers, newCustomer];

    // Emit the updated array and save to localStorage
    this.mockCustomersSubject.next(updatedCustomers);

    if (this.isBrowser()) {
      localStorage.setItem('mockCustomers', JSON.stringify(updatedCustomers));
    }
  }

  getMockCustomers(): Customer[] {
    return this.mockCustomersSubject.value; // Get the current value of mockCustomers
  }

  generateUniqueCustomerId(): number {
    const currentCustomers = this.getMockCustomers(); // Get current Customers
    const existingIds = new Set(
      currentCustomers.map((cust) => cust.customerId)
    ); // Store all existing IDs in a Set

    let newId: number;

    // Generate a new ID until it's unique
    do {
      newId = Math.floor(Math.random() * 10000) + 1; // Random number between 1 and 10000
    } while (existingIds.has(newId));

    return newId;
  }

  // Default mockCustomers
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
      },
      {
        customerId: 2,
        firstName: 'Page',
        lastName: 'Lauter',
        email: 'no@gmail.com',
        phoneNumber: '465-754-7958',
        address: {
          street: '23542 harrow road',
          city: 'Lafayette',
          postalCode: '43211',
        },
        isActive: true,
      },
      {
        customerId: 3,
        firstName: 'Leonard',
        lastName: 'Lauter',
        email: 'no@gmail.com',
        phoneNumber: '465-754-7958',
        address: {
          street: '23542 harrow road',
          city: 'Lafayette',
          postalCode: '43211',
        },
        isActive: true,
      },
      {
        customerId: 4,
        firstName: 'Ali',
        lastName: 'Lauter',
        email: 'no@gmail.com',
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
