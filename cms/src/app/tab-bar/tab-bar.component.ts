import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-bar',
  imports: [CommonModule],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss',
})
export class TabBarComponent {
  @Input() tabItems: string[] = [];

  @Output() selectedTab = new EventEmitter<string>();
  activeTab: string = 'Contact Information';

  onTabChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.activeTab = selectedValue; // Update the local state
    this.selectedTab.emit(selectedValue); // Emit the value to the parent
    console.log(selectedValue);
  }

  selectTab(tabValue: string): void {
    this.activeTab = tabValue; // Update the local state
    this.selectedTab.emit(tabValue); // Emit the value to the parent
    console.log(this.activeTab);
  }
}
