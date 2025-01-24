import { Customer } from './customer';

export interface Meeting {
  meetingId: number; // Required field
  customer: Customer; // Required field
  displayDate: string;
  date: string;
  location: string;
}
