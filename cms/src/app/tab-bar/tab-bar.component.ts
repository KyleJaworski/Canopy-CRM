import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItem } from '../classes/tabItems';
@Component({
  selector: 'app-tab-bar',
  imports: [CommonModule],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss',
})
export class TabBarComponent {
  @Input() tabItems: TabItem[] = [];
  @Output() selectedTab = new EventEmitter<TabItem>();

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
}
