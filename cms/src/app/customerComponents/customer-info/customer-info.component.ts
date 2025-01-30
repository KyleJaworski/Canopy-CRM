import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Customer } from '../../models/customer';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer/customer.service';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-customer-info',
  imports: [ReactiveFormsModule, CommonModule, SelectModule],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss',
})
export class CustomerInfoComponent implements OnChanges {
  customerForm!: FormGroup; // Reactive form for customer data

  @Input() customer?: Customer | null = null; // Input customer data
  @Input() addCustomer?: boolean; // Flag for add mode

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer']?.currentValue) {
      this.prefillForm(this.customer!); // Populate form with customer data
    } else {
      this.customerForm.reset({
        firstName: '',
        lastName: '',

        email: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        customerId: null,
      });
    }
    this.cdr.detectChanges(); // Detect changes for re-render
  }

  // Initialize form with default validators
  initializeForm(): void {
    this.customerForm = this.fb.group({
      customerId: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)],
      ],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]],
    });
  }

  // Prefill the form with existing customer data
  prefillForm(customer: Customer): void {
    this.customerForm.patchValue({
      customerId: customer.customerId || null,
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      email: customer.email || '',
      phoneNumber: customer.phoneNumber || '',
      streetAddress: customer.address?.street || '',
      city: customer.address?.city || '',
      postalCode: customer.address?.postalCode || '',
    });
  }

  // Scroll form to the top
  repositionForm(): void {
    document
      .querySelector('#form-top')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Format phone number input
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatted = input.value
      .replace(/\D/g, '')
      .replace(
        /(\d{3})(\d{3})?(\d{1,4})?/,
        (m, p1, p2, p3) => `${p1}${p2 ? '-' + p2 : ''}${p3 ? '-' + p3 : ''}`
      );
    input.value = formatted;
    this.customerForm
      .get('phoneNumber')
      ?.setValue(formatted, { emitEvent: false });
  }

  // Handle cancel operation
  onCancel(): void {
    this.customerForm.reset();
    this.repositionForm();
    this.customerService.flipAddCustomer();
  }

  // Handle form submission
  onSubmit(): void {
    const formValues = this.customerForm.value;
    const { streetAddress, city, postalCode, ...rest } = formValues;
    const customer: Customer = {
      ...rest,
      address: {
        street: streetAddress,
        city: city,
        postalCode: postalCode,
      },
    };

    if (customer.customerId) {
      this.customerService.updateCustomer(customer);
    } else {
      this.customerService.addCustomer({
        ...customer,
        customerId: this.customerService.generateUniqueCustomerId(),
        isActive: true,
      });
      this.customerService.flipAddCustomer();
      console.log('onsubmit');
    }
    this.repositionForm();
  }
}
