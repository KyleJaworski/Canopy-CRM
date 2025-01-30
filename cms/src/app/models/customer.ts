export interface Customer {
  customerId: number; // Required field
  firstName: string; // Required field
  lastName?: string; // Required field
  email?: string; // Optional field
  phoneNumber?: string; // Optional field
  address?: {
    street?: string; // Optional nested field
    city?: string; // Optional nested field
    postalCode?: string; // Optional nested field
  };
  isActive: boolean; // Optional field
  dateOfBirth?: Date; // Optional field
  createdDate: Date;
}

export class CustomerFactory {
  static createCustomer(overrides: Partial<Customer> = {}): Customer {
    return {
      customerId: overrides.customerId ?? Date.now(), // Default to a timestamp as ID
      firstName: overrides.firstName ?? 'Unknown Customer',
      lastName: overrides.lastName ?? '',
      email: overrides.email ?? '',
      phoneNumber: overrides.phoneNumber ?? '',
      address: overrides.address ?? {
        street: '',
        city: '',
        postalCode: '',
      },
      isActive: overrides.isActive ?? true, // Default to active
      dateOfBirth: overrides.dateOfBirth,
      createdDate: overrides.createdDate!,
    };
  }
}
