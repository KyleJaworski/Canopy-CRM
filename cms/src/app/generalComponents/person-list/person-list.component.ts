import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  SimpleChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItem, ObjectType } from '../../models/listItem';
import { StateService } from '../../services/state/state.service';
import { CustomerService } from '../../services/customer/customer.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { EntityService } from '../../services/entity/entity.service';
import { ViewableObjectType } from '../../models/viewableObjects';

@Component({
  selector: 'app-person-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent implements OnInit, OnDestroy {
  //Takes in preformated ListItem[]
  @Input() listItems: ListItem[] = [];
  //Outputs selected item back to parent
  selectedItem!: ListItem | null;
  constructor(
    private stateService: StateService,
    private customerService: CustomerService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    // ✅ Find the first selected item in the list
    this.selectedItem = this.listItems.find((item) => item.isSelected) || null;
  }

  ngOnDestroy(): void {
    if (this.selectedItem) {
      this.onSelectItem(this.selectedItem);
    }
  }
  /*
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listItems'] && this.selectedItem) {
      const selectedItem = this.listItems.find(
        (item) => item.id === this.selectedItem!.id
      );

      this.selectedlistItem.emit(selectedItem);
    }
  }*/

  onSelectItem(listItem: ListItem): void {
    if (listItem.objectType === ObjectType.Customer) {
      const customer = this.customerService.getCustomerById(listItem.id);

      if (!customer) {
        return; // ✅ Do nothing if the customer is not found
      }

      if (this.selectedItem?.id === customer.customerId) {
        this.stateService.clearSelection(); // ✅ Clear if already selected
        this.selectedItem = null;
      } else {
        this.stateService.setSelectedObject(
          ViewableObjectType.Customer,
          customer
        );
        this.selectedItem = listItem;
      }
    }

    if (listItem.objectType === ObjectType.Employee) {
      const employee = this.employeeService.getEmployeeById(listItem.id);

      if (!employee) {
        return; // ✅ Do nothing if the employee is not found
      }

      if (this.selectedItem?.id === employee.employeeId) {
        this.stateService.clearSelection(); // ✅ Clear if already selected
        this.selectedItem = null;
      } else {
        this.stateService.setSelectedObject(
          ViewableObjectType.Employee,
          employee
        );
        this.selectedItem = listItem;
      }
    }

    // ✅ Update `isSelected` property for all list items
    this.listItems = this.listItems.map((item) => ({
      ...item,
      isSelected: item.id === this.selectedItem?.id, // ✅ True for selected item, false for others
    }));
  }
}
