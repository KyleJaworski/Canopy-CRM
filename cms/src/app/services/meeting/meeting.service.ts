import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meeting } from '../../models/meeting';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../../models/customer';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private addMeetingBool = new BehaviorSubject<boolean>(false); // Default value is false
  private mockMeetingsSubject = new BehaviorSubject<Meeting[]>([]);

  // Observable for components to subscribe to
  addMeetingBool$ = this.addMeetingBool.asObservable();
  mockMeetings$ = this.mockMeetingsSubject.asObservable();

  constructor(private customerService: CustomerService) {
    // Load initial data from localStorage if available and in browser environment
    const storedMeetings = this.isBrowser()
      ? localStorage.getItem('mockMeetings')
      : null;
    const initialMeetings = storedMeetings
      ? JSON.parse(storedMeetings)
      : this.getDefaultMockMeetings();

    this.mockMeetingsSubject.next(initialMeetings);
  }

  // Check if code is running in the browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Method to toggle or update the state
  flipAddMeeting(): void {
    this.addMeetingBool.next(!this.addMeetingBool.value);
  }

  updateMeeting(meetingToUpdate: Meeting) {
    const currentMeetings = this.mockMeetingsSubject.value; // Get the current value of mockCustomers

    const index = currentMeetings.findIndex(
      (meeting) => meeting.meetingId === meetingToUpdate.meetingId
    );

    if (index !== -1) {
      const updatedMeetings = [...currentMeetings];
      updatedMeetings[index] = {
        ...currentMeetings[index],
        ...meetingToUpdate,
      };

      // Emit the updated Customers array
      this.mockMeetingsSubject.next(updatedMeetings);

      // Save to localStorage if in the browser
      if (this.isBrowser()) {
        localStorage.setItem('mockMeetings', JSON.stringify(updatedMeetings));
      }
    }
  }

  addMeeting(newMeeting: Meeting): void {
    const currentMeetings = this.mockMeetingsSubject.value;
    const updatedMeetings = [...currentMeetings, newMeeting];

    // Emit the updated array and save to localStorage
    this.mockMeetingsSubject.next(updatedMeetings);

    if (this.isBrowser()) {
      localStorage.setItem('mockMeetings', JSON.stringify(updatedMeetings));
    }
  }

  getMockMeetings(): Meeting[] {
    return this.mockMeetingsSubject.value; // Get the current value of mockCustomers
  }

  generateUniqueMeetingId(): number {
    const currentMeetings = this.getMockMeetings(); // Get current Customers
    const existingIds = new Set(currentMeetings.map((cust) => cust.meetingId)); // Store all existing IDs in a Set

    let newId: number;

    // Generate a new ID until it's unique
    do {
      newId = Math.floor(Math.random() * 10000) + 1; // Random number between 1 and 10000
    } while (existingIds.has(newId));

    return newId;
  }

  // Default mockCustomers
  private getDefaultMockMeetings(): Meeting[] {
    const customers: Customer[] = this.customerService.getMockCustomers();

    return [
      {
        meetingId: 1,
        customer: customers[0],
        date: format(new Date(2025, 0, 24), 'yyyy-MM-dd'), // Use Date(year, month, day)
        displayDate: this.formatDate(new Date(2025, 0, 24)),
        location: 'Starbucks',
      },
      {
        meetingId: 2,
        customer: customers[1],
        date: format(new Date(2025, 0, 27), 'yyyy-MM-dd'),
        displayDate: this.formatDate(new Date(2025, 0, 27)),
        location: 'Starbucks',
      },
      {
        meetingId: 3,
        customer: customers[2],
        date: format(new Date(2025, 1, 1), 'yyyy-MM-dd'),
        displayDate: this.formatDate(new Date(2025, 1, 1)),
        location: 'Starbucks',
      },
      {
        meetingId: 4,
        customer: customers[3],
        date: format(new Date(2025, 1, 3), 'yyyy-MM-dd'),
        displayDate: this.formatDate(new Date(2025, 1, 3)),
        location: 'Starbucks',
      },
    ];
  }

  // Helper function to format the date
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    const suffix = (day: number): string => {
      if (day === 1 || day === 21 || day === 31) return `${day}st`;
      if (day === 2 || day === 22) return `${day}nd`;
      if (day === 3 || day === 23) return `${day}rd`;
      return `${day}th`;
    };

    return `${month} ${suffix(day)}, ${year}`;
  }
}
