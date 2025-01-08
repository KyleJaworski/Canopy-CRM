import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../classes/customer';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent {
  @Input() customers!: Customer[];
}
