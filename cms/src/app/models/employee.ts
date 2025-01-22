export enum AppRole {
  Admin = 'Admin',
  User = 'User',
}

export interface Employee {
  id: number; // Required field
  role: AppRole;
  jobTitle?: string; // Optional field
  firstName: string; // Required field
  lastName: string;
  email?: string; // Optional field
  phoneNumber: string; // Optional field
  address?: {
    street?: string; // Optional nested field
    city?: string; // Optional nested field
    postalCode?: string; // Optional nested field
  };
  isActive?: boolean; // Optional field
  dateOfBirth?: Date; // Optional field
  adminPrivileges?: string[]; // Specific to Admins
}

export class EmployeeFactory {
  static createEmployee(overrides: Partial<Employee> = {}): Employee {
    const isAdmin = overrides.role === AppRole.Admin;

    return {
      id: overrides.id ?? Date.now(), // Default to a timestamp as ID
      role: overrides.role ?? AppRole.User,
      jobTitle: overrides.jobTitle ?? '',
      firstName:
        overrides.firstName ?? (isAdmin ? 'Admin Employee' : 'User Employee'),
      lastName: overrides.lastName ?? '',
      email:
        overrides.email ?? (isAdmin ? 'admin@company.com' : 'user@company.com'),
      phoneNumber: overrides.phoneNumber ?? '',
      address: overrides.address ?? {
        street: '',
        city: '',
        postalCode: '',
      },
      isActive: overrides.isActive ?? true, // Default to active
      dateOfBirth: overrides.dateOfBirth,
      ...(isAdmin && {
        adminPrivileges: overrides.adminPrivileges ?? [
          'ManageUsers',
          'ViewReports',
        ],
      }),
    };
  }
}
