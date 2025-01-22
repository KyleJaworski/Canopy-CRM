import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItem } from '../models/tabItems';
import { EmployeeService } from '../services/employee/employee.service';

@Component({
  selector: 'app-tab-bar',
  imports: [CommonModule],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss',
})
export class TabBarComponent {
  addEmployee!: Boolean;

  @Input() tabItems: TabItem[] = [];
  @Output() selectedTab = new EventEmitter<TabItem>();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.addEmployeeBool$.subscribe((value: Boolean) => {
      this.addEmployee = value;
    });
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

  cancelAdd(): void {
    this.employeeService.flipAddEmployee();
  }
}
