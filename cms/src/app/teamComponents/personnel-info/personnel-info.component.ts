import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TeamRole, Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee/employee.service';
import { SelectModule } from 'primeng/select';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-employee-info',
  imports: [ReactiveFormsModule, CommonModule, SelectModule],
  templateUrl: './personnel-info.component.html',
  styleUrl: './personnel-info.component.scss',
})
export class EmployeeInfoComponent implements OnChanges, OnInit {
  employeeForm!: FormGroup; // Reactive form for employee data
  directReports: any[] = []; // List of direct reports for dropdown
  teamRoles = Object.values(TeamRole); // Extract values from the TeamRole enum
  teamRole = TeamRole;

  @Input() employee?: Employee | null = null; // Input employee data
  @Input() addEmployee?: boolean; // Flag for add mode

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
  }

  async ngOnInit(): Promise<void> {
    const employees = await firstValueFrom(this.employeeService.entities$);
    this.directReports = employees.map((emp) => ({
      name: emp.firstName,
      id: emp.employeeId,
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']?.currentValue) {
      this.directReports = this.directReports.filter(
        (emp) => emp.id !== this.employee?.employeeId
      );
      this.prefillForm(this.employee!); // Populate form with employee data
    } else {
      this.employeeForm.reset({
        jobTitle: 'Laborer', // Explicitly reset to default value
        firstName: '',
        lastName: '',
        teamRole: '',
        directReportId: 0,
        email: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        employeeId: null,
      });
    }
    this.cdr.detectChanges(); // Detect changes for re-render
  }

  // Initialize form with default validators
  initializeForm(): void {
    this.employeeForm = this.fb.group({
      employeeId: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['Laborer', Validators.required],
      teamRole: ['', Validators.required],
      directReportId: [0, Validators.required],
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

  // Prefill the form with existing employee data
  prefillForm(employee: Employee): void {
    this.employeeForm.patchValue({
      employeeId: employee.employeeId || null,
      firstName: employee.firstName || '',
      lastName: employee.lastName || '',
      jobTitle: employee.jobTitle || 'Laborer',
      teamRole: employee.teamRole || TeamRole.TeamMember,
      directReportId: employee.directReportId || null,
      email: employee.email || '',
      phoneNumber: employee.phoneNumber || '',
      streetAddress: employee.address?.street || '',
      city: employee.address?.city || '',
      postalCode: employee.address?.postalCode || '',
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
    this.employeeForm
      .get('phoneNumber')
      ?.setValue(formatted, { emitEvent: false });
  }

  // Handle cancel operation
  onCancel(): void {
    this.employeeForm.reset();
    this.repositionForm();
    this.employeeService.flipAddEmployee();
  }

  // Handle form submission
  onSubmit(): void {
    const formValues = this.employeeForm.value;
    const { directReportId, streetAddress, city, postalCode, ...rest } =
      formValues;
    const employee: Employee = {
      ...rest,
      directReportId: Number(directReportId),
      address: {
        street: streetAddress,
        city: city,
        postalCode: postalCode,
      },
    };

    if (employee.employeeId) {
      this.employeeService.updateEmployee(employee);
    } else {
      this.employeeService.addEmployee({
        ...employee,
        employeeId: this.employeeService.generateUniqueEmployeeId(),
        isActive: true,
      });
      this.employeeService.flipAddEmployee();
    }
    this.repositionForm();
  }
}
