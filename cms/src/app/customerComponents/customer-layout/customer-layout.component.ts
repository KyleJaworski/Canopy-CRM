import { PersonListComponent } from '../../person-list/person-list.component';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer/customer.service';
import { ListItems } from '../../models/listItems';

@Component({
  selector: 'app-customer-layout',
  imports: [PersonListComponent, CommonModule],
  standalone: true,
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.scss',
})
export class CustomerLayoutComponent {
  @Output() selectedCustomer = new EventEmitter<Customer>();

  selectedcustomerId: number = 0;
  listItems: ListItems[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.mockCustomers$.subscribe((customers: Customer[]) => {
      // Create a new array with the desired structure
      this.listItems = customers.map((customer) => ({
        id: customer.customerId,
        fullName: `${customer.firstName} ${customer.lastName}`,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
        additionalLabel: '',
      }));

      console.log(this.listItems); // Debug: Check the new array in the console
    });
  }

  onSelectcustomer(customer: Customer): void {
    this.selectedcustomerId == customer.customerId
      ? (this.selectedcustomerId = 0)
      : (this.selectedcustomerId = customer.customerId);

    this.selectedCustomer.emit(customer); // Emit the selected customer
  }
}
