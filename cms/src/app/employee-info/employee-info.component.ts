import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TeamRole, Employee } from '../models/employee';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee/employee.service';
import { ChangeDetectorRef } from '@angular/core';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-employee-info',
  imports: [ReactiveFormsModule, CommonModule, SelectModule],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.scss',
})
export class EmployeeInfoComponent implements OnChanges {
  employeeForm!: FormGroup;
  directReports: any[] = [];

  @Input() employee?: Employee | null = null;
  @Input() addEmployee?: boolean;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {
    const employees = this.employeeService.getMockEmployees();
    this.directReports = employees.map((emp) => ({
      name: emp.firstName,
      code: emp.employeeId,
    }));
    console.log(this.directReports);
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && changes['employee'].currentValue) {
      this.prefillForm(this.employee!); // Populate the form when employee changes
    } else {
      this.employeeForm.reset();
    }
    this.cdr.detectChanges();
  }

  initializeForm(): void {
    // Handle undefined employee by providing fallback values
    this.employeeForm = this.fb.group({
      employeeId: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['Laborer', Validators.required],
      teamRole: [TeamRole.TeamMember, Validators.required],
      directReportId: [2],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}-\d{3}-\d{4}$/),
          Validators.maxLength(12),
        ], // Sync validators
        [], // Async validators (none in this case)
      ],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]],
    });
  }

  prefillForm(employee: Employee): void {
    // Handle undefined employee by providing fallback values
    console.log(employee.employeeId);
    this.employeeForm.patchValue({
      employeeId: employee.employeeId || null,
      firstName: employee?.firstName || '',
      lastName: employee?.lastName || '',
      jobTitle: employee.jobTitle || 'Laborer',
      teamRole: employee.teamRole || TeamRole.TeamMember,
      directReportId: employee?.directReportId || null,
      email: employee?.email || '',
      phoneNumber: employee?.phoneNumber || '',
      streetAddress: employee?.address?.street || '',
      city: employee?.address?.city || '',
      postalCode: employee?.address?.postalCode || '',
    });
  }

  repositionForm(): void {
    const element = document.querySelector('#form-top'); // Replace with the ID of the element
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    const formatted = value.replace(
      /(\d{3})(\d{3})?(\d{1,4})?/,
      (match, p1, p2, p3) => {
        let result = p1;
        if (p2) result += `-${p2}`;
        if (p3) result += `-${p3}`;
        return result;
      }
    );
    input.value = formatted; // Update the input value
    this.employeeForm
      .get('phoneNumber')
      ?.setValue(formatted, { emitEvent: false });
  }

  onCancel(): void {
    this.employeeForm.reset();
    this.repositionForm();
    this.employeeService.flipAddEmployee();
  }

  onSubmit(): void {
    const formValues = this.employeeForm.value;

    const employee: Employee = {
      employeeId: formValues.employeeId,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      jobTitle: formValues.jobTitle,
      teamRole: formValues.teamRole,
      directReportId: formValues.directReportId,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      address: {
        street: formValues.streetAddress, // Map back to nested structure
        city: formValues.city,
        postalCode: formValues.postalCode,
      },
    };

    if (employee.employeeId) {
      this.employeeService.updateEmployee(employee);
    } else {
      const newEmployee: Employee = {
        ...employee,
        employeeId: this.employeeService.generateUniqueEmployeeId(),
      };
      this.employeeService.addEmployee(newEmployee);
      this.employeeService.flipAddEmployee();
    }

    this.repositionForm();
  }
}
