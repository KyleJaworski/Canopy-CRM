import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItem } from '../../models/tabItems';
import { EmployeeService } from '../../services/employee/employee.service';
import { CustomerService } from '../../services/customer/customer.service';
import { ObjectType } from '../../models/listItem';
import { Customer } from '../../models/customer';
import { Employee } from '../../models/employee';
import { PopupComponent } from '../popup/popup.component';
import { PopupWarning, PopupAction } from '../../models/popup';

@Component({
  selector: 'app-tab-bar',
  imports: [CommonModule, PopupComponent],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss',
})
export class TabBarComponent {
  PopupAction = PopupAction;
  addObject!: boolean;
  isPopupOpen: boolean = false;
  popupWarning: PopupWarning = {
    heading: '',
    body: '',
    action: PopupAction.Deactivate,
  };

  @Input() objectType!: ObjectType;
  @Input() tabItems: TabItem[] = [];
  @Input() editObject: Employee | Customer | null = null;

  @Output() selectedTab = new EventEmitter<TabItem>();

  constructor(
    private employeeService: EmployeeService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    switch (this.objectType) {
      case ObjectType.Customer: {
        this.customerService.addCustomerBool$.subscribe((value: boolean) => {
          this.addObject = value;
        });
        break;
      }
      case ObjectType.Employee: {
        this.employeeService.addEmployeeBool$.subscribe((value: boolean) => {
          this.addObject = value;
        });
        break;
      }
    }
  }

  openPopup(action: PopupAction): void {
    if (action === PopupAction.Delete) {
      this.popupWarning.heading = 'Delete Account';
      this.popupWarning.body =
        'Are you sure you want to delete this account? All account data will be permnanently removed. This action cannot be undone';
      this.popupWarning.action = PopupAction.Delete;
    }
    if (action === PopupAction.Deactivate) {
      this.popupWarning.heading = 'Deactivate Account';
      this.popupWarning.body =
        'Are you sure you want to deactivate this account? All actions pertaining to this account will be locked untill reactivation.';
      this.popupWarning.action = PopupAction.Deactivate;
    }
    if (action === PopupAction.Reactivate) {
      this.popupWarning.heading = 'Reactivate Account';
      this.popupWarning.body =
        'Are you sure you want to reactivate this account? All actions pertaining to this account will be unlocked';
      this.popupWarning.action = PopupAction.Reactivate;
    }
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  confirmPopup(): void {
    const action = this.popupWarning.action;
    if (this.objectType === ObjectType.Employee) {
      if (action === PopupAction.Deactivate) {
        this.employeeService.deactivateEmployee(this.editObject as Employee);
      } else if (action === PopupAction.Delete) {
        this.employeeService.deleteEmployee(this.editObject as Employee);
      } else if (action === PopupAction.Reactivate) {
        this.employeeService.activateEmployee(this.editObject as Employee);
      }
    } else if (this.objectType === ObjectType.Customer) {
      if (action === PopupAction.Deactivate) {
        this.customerService.deactivateCustomer(this.editObject as Customer);
      } else if (action === PopupAction.Delete) {
        this.customerService.deleteCustomer(this.editObject as Customer);
      } else if (action === PopupAction.Reactivate) {
        this.customerService.activateCustomer(this.editObject as Customer);
      }
    }
    this.closePopup();
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

  deactivateObject(editObject: ObjectType, object: Employee | Customer): void {
    switch (editObject) {
      case ObjectType.Employee:
        //this.employeeService.deactivateEmployee();
        break;
      case ObjectType.Customer:
        //this.customerService.deactivateCustomer();
        break;
      default:
        break;
    }
  }
}
