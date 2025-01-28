import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItem } from '../../models/listItem';

@Component({
  selector: 'app-person-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent implements OnInit {
  //Takes in preformated ListItem[]
  @Input() listItems: ListItem[] = [];
  //Outputs selected item back to parent
  @Output() selectedlistItem = new EventEmitter<ListItem>();

  selectedItemId!: number;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listItems'] && this.selectedItemId) {
      const selectedItem = this.listItems.find(
        (item) => item.id === this.selectedItemId
      );

      this.selectedlistItem.emit(selectedItem);
    }
  }

  onSelectItem(listItem: ListItem): void {
    this.selectedItemId == listItem.id
      ? (this.selectedItemId = 0)
      : (this.selectedItemId = listItem.id);

    this.selectedlistItem.emit(listItem);
  }
}
