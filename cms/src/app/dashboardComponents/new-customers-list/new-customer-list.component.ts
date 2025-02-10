import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer';
import { StateService } from '../../services/state/state.service';
import { MenuService } from '../../services/menu/menu.service';
import { MenuItems } from '../../models/menuItems.enum';
import { ViewableObjectType } from '../../models/viewableObjects';

@Component({
  selector: 'app-new-customer-list',
  imports: [CommonModule],
  templateUrl: './new-customer-list.component.html',
  styleUrl: './new-customer-list.component.scss',
})
export class NewCustomerListComponent {
  @Input() customers!: Customer[];

  constructor(
    private stateService: StateService,
    private menuService: MenuService
  ) {}

  viewCustomer(customer: Customer) {
    this.stateService.setSelectedObject(ViewableObjectType.Customer, customer);
    this.menuService.setCurrentPage(MenuItems.Customers);
  }
}
