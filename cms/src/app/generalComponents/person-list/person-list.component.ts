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
import { ListItem } from '../../models/listItem';

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
  @Output() selectedlistItem = new EventEmitter<ListItem>();

  selectedItem!: ListItem | null;

  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.selectedItem) {
      this.onSelectItem(this.selectedItem);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listItems'] && this.selectedItem) {
      const selectedItem = this.listItems.find(
        (item) => item.id === this.selectedItem!.id
      );

      this.selectedlistItem.emit(selectedItem);
    }
  }

  onSelectItem(listItem: ListItem): void {
    this.selectedItem == listItem
      ? (this.selectedItem = null)
      : (this.selectedItem = listItem);

    this.selectedlistItem.emit(listItem);
  }
}
