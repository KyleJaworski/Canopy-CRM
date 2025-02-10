import { PersonListComponent } from '../../generalComponents/person-list/person-list.component';
import { Component, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer/customer.service';
import { ListItem, ObjectType, updateListItems } from '../../models/listItem';
import { CustomersOverviewComponent } from '../customers-overview/customers-overview.component';
import { TabBarComponent } from '../../generalComponents/tab-bar/tab-bar.component';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';
import { TabItem } from '../../models/tabItems';
import { StateService } from '../../services/state/state.service';
import { ViewableObjectType } from '../../models/viewableObjects';

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
export class CustomerLayoutComponent implements OnDestroy {
  addCustomer: boolean = false;
  @Input() selectedCustomer: Customer | null = null;
  listItems: ListItem[] = [];
  customers!: Customer[];
  objectType: ObjectType = ObjectType.Customer;

  // Tabs for the layout
  tabItems: TabItem[] = [
    { label: 'Contact Information', active: true, value: 1, indicator: 0 },
    { label: 'Misc.', active: false, value: 2, indicator: 1 },
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(private customerService: CustomerService) {}

  //On init subscribe to changes in Customers and convert them into a list to be passed to the list component
  ngOnInit(): void {
    this.subscriptions.add(
      this.customerService.entities$.subscribe((customers: Customer[]) => {
        this.customers = customers;
        this.listItems = updateListItems(customers, ObjectType.Customer);
      })
    );

    this.subscriptions.add(
      this.customerService.addEntity$.subscribe((value: boolean) => {
        this.addCustomer = value;
      })
    );
  }

  ngOnDestroy(): void {
    // Properly unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
    // Reset addCustomer
    if (this.addCustomer === true) this.customerService.flipAddCustomer();
  }

  //When list item selected find customer who matches list item I
  /*
  onSelectedCustomerRecieved(listItem: ListItem | null): void {
    if (listItem) {
      const customer = this.customers.find(
        (cust) => cust.customerId === listItem.id
      );
      this.selectedCustomer = customer as Customer;
    } else {
      this.stateService.clearSelection();
    }
  }*/

  // Handle tab selection
  handleTabSelection(selectedTab: TabItem): void {
    this.tabItems.forEach((tab) => (tab.active = tab === selectedTab));
  }

  /*fetchCustomers(): void {
    // Update customers and listItems whenever customers change
    this.subscriptions.add(
      this.customerService.entities$.subscribe((customers) => {
        // Check if the selectedCustomer still exists in the customers list
        if (this.selectedCustomer) {
          const isSelectedcustomerValid = customers.some(
            (customer) =>
              customer.customerId === this.selectedCustomer?.customerId
          );

          // Set selectedcustomer to null if it's no longer in the customers list
          this.selectedCustomer = isSelectedcustomerValid
            ? this.selectedCustomer
            : null;
        }

        // Update the list of customers and listItems

        this.listItems = [...updateListItems(customers, ObjectType.Customer)];
        this.customers = [...customers];
      })
    );
  }*/
}
