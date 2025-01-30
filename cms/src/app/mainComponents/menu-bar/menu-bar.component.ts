import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee/employee.service';
import { MenuItems } from '../../models/menuItems.enum';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  menuItem = MenuItems;
  menuItems = Object.values(MenuItems); // Get the values of the enum
  isDropdownVisible = false;
  addEmployee!: boolean;
  addCustomer!: boolean;

  @Output() menuOption = new EventEmitter<string>();
  activeMenuItem: MenuItems = MenuItems.Dashboard;

  // Access the button and menu using template references
  @ViewChild('userMenuButton', { static: true }) userMenuButton!: ElementRef;
  @ViewChild('userMenu', { static: true }) userMenu!: ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.employeeService.addEmployeeBool$.subscribe((value: boolean) => {
      this.addEmployee = value;
    });
    this.customerService.addCustomerBool$.subscribe((value: boolean) => {
      this.addCustomer = value;
    });
  }

  selectedMenuItem(item: MenuItems) {
    this.menuOption.emit(item); // Emit the value to the parent component
    this.activeMenuItem = item; // Update the active menu item
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  // Close dropdown on outside click
  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const buttonElement = this.userMenuButton.nativeElement;
    const menuElement = this.userMenu.nativeElement;

    if (
      !buttonElement.contains(event.target as Node) &&
      !menuElement.contains(event.target as Node)
    ) {
      this.isDropdownVisible = false;
    }
  }

  toggleAddEmployee(): void {
    this.employeeService.flipAddEmployee(); // Toggle the value
  }

  toggleAddCustomer(): void {
    this.customerService.flipAddCustomer(); // Toggle the value
  }
}
