import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItem } from '../../models/tabItems';
import { EmployeeService } from '../../services/employee/employee.service';
import { CustomerService } from '../../services/customer/customer.service';
import { ObjectType } from '../../models/listItem';

@Component({
  selector: 'app-tab-bar',
  imports: [CommonModule],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss',
})
export class TabBarComponent {
  addObject!: boolean;

  @Input() objectType!: ObjectType;
  @Input() tabItems: TabItem[] = [];

  @Output() selectedTab = new EventEmitter<TabItem>();

  constructor(
    private employeeService: EmployeeService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    switch (this.objectType) {
      case ObjectType.Customer: {
        this.customerService.addCustomerBool$.subscribe((value: boolean) => {
          value && (this.addObject = value);
        });
        break;
      }
      case ObjectType.Employee: {
        this.employeeService.addEmployeeBool$.subscribe((value: boolean) => {
          value && (this.addObject = value);
        });
        break;
      }
    }
  }

  onTabChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const selectedTab = this.tabItems.find(
      (tab) => tab.label === selectedValue
    );

    this.selectedTab.emit(selectedTab); // Emit the value to the parent
  }

  selectTab(selectedTab: TabItem): void {
    this.selectedTab.emit(selectedTab); // Emit the value to the parent
  }

  cancelAdd(objectType: ObjectType): void {
    switch (objectType) {
      case ObjectType.Employee:
        this.employeeService.flipAddEmployee();
        break;
      case ObjectType.Customer:
        this.customerService.flipAddCustomer();
        break;
      default:
        break;
    }
  }
}
