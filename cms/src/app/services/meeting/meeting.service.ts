import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meeting } from '../../models/meeting';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../../models/customer';
import { format, parseISO } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private addMeetingBool = new BehaviorSubject<boolean>(false);
  private mockMeetingsSubject = new BehaviorSubject<Meeting[]>([]);

  // Observables for components to subscribe to
  addMeetingBool$ = this.addMeetingBool.asObservable();
  mockMeetings$ = this.mockMeetingsSubject.asObservable();

  constructor(private customerService: CustomerService) {
    if (this.isBrowser()) {
      const storedMeetings = sessionStorage.getItem('mockMeetings');
      const initialMeetings = storedMeetings
        ? JSON.parse(storedMeetings, (key, value) =>
            key === 'date' && typeof value === 'string' ? value : value
          )
        : this.getDefaultMockMeetings();

      if (!storedMeetings) {
        this.saveToSessionStorage(initialMeetings);
      }

      this.mockMeetingsSubject.next(initialMeetings);
    }
  }

  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
    );
  }

  private saveToSessionStorage(meetings: Meeting[]): void {
    if (this.isBrowser()) {
      sessionStorage.setItem('mockMeetings', JSON.stringify(meetings));
    }
  }

  flipAddMeeting(): void {
    this.addMeetingBool.next(!this.addMeetingBool.value);
  }

  updateMeeting(meetingToUpdate: Meeting) {
    const currentMeetings = this.mockMeetingsSubject.value;
    const index = currentMeetings.findIndex(
      (meeting) => meeting.meetingId === meetingToUpdate.meetingId
    );

    if (index !== -1) {
      const updatedMeetings = [...currentMeetings];
      updatedMeetings[index] = {
        ...currentMeetings[index],
        ...meetingToUpdate,
      };

      this.saveToSessionStorage(updatedMeetings);
      this.mockMeetingsSubject.next(updatedMeetings);
    }
  }

  addMeeting(newMeeting: Meeting): void {
    const currentMeetings = this.mockMeetingsSubject.value;
    const updatedMeetings = [...currentMeetings, newMeeting];

    this.saveToSessionStorage(updatedMeetings);
    this.mockMeetingsSubject.next(updatedMeetings);
  }

  getMockMeetings(): Meeting[] {
    return this.mockMeetingsSubject.value;
  }

  generateUniqueMeetingId(): number {
    const currentMeetings = this.getMockMeetings();
    const existingIds = new Set(
      currentMeetings.map((meeting) => meeting.meetingId)
    );

    let newId: number;
    do {
      newId = Math.floor(Math.random() * 10000) + 1;
    } while (existingIds.has(newId));

    return newId;
  }

  private getDefaultMockMeetings(): Meeting[] {
    const customers: Customer[] = this.customerService.getMockCustomers();

    return [
      {
        meetingId: 1,
        customer: customers[0],
        date: '2025-01-24', // Kept as a string (yyyy-MM-dd)
        displayDate: this.formatDate(new Date(2025, 0, 24)),
        location: 'Starbucks',
      },
      {
        meetingId: 2,
        customer: customers[1],
        date: '2025-01-27',
        displayDate: this.formatDate(new Date(2025, 0, 27)),
        location: 'Starbucks',
      },
      {
        meetingId: 3,
        customer: customers[2],
        date: '2025-02-01',
        displayDate: this.formatDate(new Date(2025, 1, 1)),
        location: 'Starbucks',
      },
      {
        meetingId: 4,
        customer: customers[3],
        date: '2025-02-03',
        displayDate: this.formatDate(new Date(2025, 1, 3)),
        location: 'Starbucks',
      },
    ];
  }

  formatDate(date: Date): string {
    return format(date, 'MMMM do, yyyy');
  }
}
