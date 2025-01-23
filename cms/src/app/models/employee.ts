export enum TeamRole {
  Executive = 'Executive',
  Coordinator = 'Coordinator',
  Manager = 'Manager',
  Supervisor = 'Supervisor',
  TeamMember = 'Team Member',
}

export interface Employee {
  employeeId: number; // Required field
  directReportId?: number | null;
  teamRole: TeamRole;
  jobTitle: string; // Optional field
  firstName: string; // Required field
  lastName: string;
  email: string; // Optional field
  phoneNumber: string; // Optional field
  address: {
    street: string; // Optional nested field
    city: string; // Optional nested field
    postalCode: string; // Optional nested field
  };
  isActive?: boolean; // Optional field
  dateOfBirth?: Date; // Optional field
  userId?: number;
}
