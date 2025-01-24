import { PersonListComponent } from '../../person-list/person-list.component';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer/customer.service';
import { ListItem, ObjectType, updateListItems } from '../../models/listItem';

@Component({
  selector: 'app-customer-layout',
  imports: [PersonListComponent, CommonModule],
  standalone: true,
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.scss',
})
export class CustomerLayoutComponent {
  selectedCustomer?: Customer | null = null;
  listItems: ListItem[] = [];
  customers!: Customer[];

  constructor(private customerService: CustomerService) {}

  //On init subscribe to changes in Customers and convert them into a list to be passed to the list component
  ngOnInit(): void {
    this.customerService.mockCustomers$.subscribe((customers: Customer[]) => {
      // Cache customers and transform them into listItems
      this.customers = customers;
      this.listItems = updateListItems(customers, ObjectType.Customer); // Update listItems whenever customers change
    });
  }

  //When list item selected find customer who matches list item ID
  onSelectedCustomerRecieved(listItem: ListItem): void {
    const customer = this.customers.find(
      (cust) => cust.customerId === listItem.id
    );

    this.selectedCustomer == customer
      ? (this.selectedCustomer = null)
      : (this.selectedCustomer = customer);
  }
}
