import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Employee } from '../classes/employee';

@Component({
  selector: 'app-employee-info',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.scss',
})
export class EmployeeInfoComponent implements OnInit, OnChanges {
  employeeForm!: FormGroup;

  @Input() employee?: Employee;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && changes['employee'].currentValue) {
      this.prefillForm(this.employee!); // Populate the form when employee changes
    }
  }

  initializeForm(): void {
    // Handle undefined employee by providing fallback values
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  prefillForm(employee: Employee): void {
    // Handle undefined employee by providing fallback values
    this.employeeForm.patchValue({
      firstName: employee?.firstName || '',
      lastName: employee?.lastName || '',
      jobTitle: employee?.jobTitle || '',
      email: employee?.email || '',
      phoneNumber: employee?.phoneNumber || '',
      streetAddress: employee?.address?.street || '',
      city: employee?.address?.city || '',
      postalCode: employee?.address?.postalCode || '',
    });
  }
}
