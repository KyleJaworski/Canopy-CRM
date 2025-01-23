import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer/customer.service';
import { ListItems } from '../models/listItems';

@Component({
  selector: 'app-person-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss',
})
export class PersonListComponent implements OnInit {
  @Input() listItems: ListItems[] = [];

  selectedItemId: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
