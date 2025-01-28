import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { PopupWarning, PopupAction } from '../../models/popup';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  @Input() popupWarning!: PopupWarning;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  ngOnInit(): void {
    console.log(this.popupWarning);
  }

  closePopup() {
    this.close.emit();
  }

  confirmAction() {
    this.confirm.emit();
  }
}
