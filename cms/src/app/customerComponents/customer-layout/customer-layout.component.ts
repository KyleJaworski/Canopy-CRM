import { PersonListComponent } from '../../generalComponents/person-list/person-list.component';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer/customer.service';
import { ListItem, ObjectType, updateListItems } from '../../models/listItem';
import { CustomersOverviewComponent } from '../customers-overview/customers-overview.component';
import { TabBarComponent } from '../../generalComponents/tab-bar/tab-bar.component';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';
import { TabItem } from '../../models/tabItems';

@Component({
  selector: 'app-customer-layout',
  imports: [
    PersonListComponent,
    CommonModule,
    CustomersOverviewComponent,
    TabBarComponent,
    CustomerInfoComponent,
  ],
  standalone: true,
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.scss',
})
export class CustomerLayoutComponent {
  addCustomer: boolean = false;
  selectedCustomer: Customer | null = null;
  listItems: ListItem[] = [];
  customers!: Customer[];
  objectType: ObjectType = ObjectType.Customer;

  // Tabs for the layout
  tabItems: TabItem[] = [
    { label: 'Contact Information', active: true, value: 1, indicator: 0 },
    { label: 'Misc.', active: false, value: 2, indicator: 1 },
  ];

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
  onSelectedCustomerRecieved(listItem: ListItem | null): void {
    if (listItem) {
      const customer = this.customers.find(
        (cust) => cust.customerId === listItem.id
      );
      this.selectedCustomer =
        this.selectedCustomer === customer ? null : customer || null;
    } else {
      this.selectedCustomer = null;
    }
    console.log(this.selectedCustomer);
  }

  // Handle tab selection
  handleTabSelection(selectedTab: TabItem): void {
    this.tabItems.forEach((tab) => (tab.active = tab === selectedTab));
  }
}
