export interface Customer {
  id: number; // Required field
  name: string; // Required field
  email?: string; // Optional field
  phoneNumber?: string; // Optional field
  address?: {
    street?: string; // Optional nested field
    city?: string; // Optional nested field
    postalCode?: string; // Optional nested field
  };
  isActive?: boolean; // Optional field
  dateOfBirth?: Date; // Optional field
}

export class CustomerFactory {
  static createCustomer(overrides: Partial<Customer> = {}): Customer {
    return {
      id: overrides.id ?? Date.now(), // Default to a timestamp as ID
      name: overrides.name ?? 'Unknown Customer',
      email: overrides.email ?? '',
      phoneNumber: overrides.phoneNumber ?? '',
      address: overrides.address ?? {
        street: '',
        city: '',
        postalCode: '',
      },
      isActive: overrides.isActive ?? true, // Default to active
      dateOfBirth: overrides.dateOfBirth,
    };
  }
}
