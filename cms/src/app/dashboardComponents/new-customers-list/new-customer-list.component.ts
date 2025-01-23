import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-new-customer-list',
  imports: [CommonModule],
  templateUrl: './new-customer-list.component.html',
  styleUrl: './new-customer-list.component.scss',
})
export class NewCustomerListComponent {
  @Input() customers!: Customer[];
}
