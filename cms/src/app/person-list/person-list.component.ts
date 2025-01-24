import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListItem } from '../models/listItem';

@Component({
  selector: 'app-person-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() listItems: ListItem[] = [];
  @Output() selectedlistItem = new EventEmitter<ListItem>();

  selectedItemId!: number;

  constructor() {}

  onSelectItem(listItem: ListItem): void {
    this.selectedItemId == listItem.id
      ? (this.selectedItemId = 0)
      : (this.selectedItemId = listItem.id);

    this.selectedlistItem.emit(listItem);
  }
}
