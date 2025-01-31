import { Injectable } from '@angular/core';
import { Meeting } from '../../models/meeting';
import { EntityService } from '../entity/entity.service';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../../models/customer';
import { format } from 'date-fns';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeetingService extends EntityService<Meeting> {
  constructor(private customerService: CustomerService) {
    // Initialize the service with an empty list
    super('mockMeetings', []);

    // Fetch customers asynchronously and initialize meetings
    this.initializeMeetings();
  }

  private async initializeMeetings(): Promise<void> {
    try {
      // Wait for customers to be available
      const customers: Customer[] = await firstValueFrom(
        this.customerService.entities$
      );

      // Ensure we have enough customers
      if (customers.length < 4) {
        console.warn('Not enough customers to initialize meetings');
        return;
      }

      // Define meetings using retrieved customers
      const defaultMeetings: Meeting[] = [
        {
          meetingId: 1,
          customer: customers[0],
          date: format(new Date(2025, 0, 24), 'yyyy-MM-dd'),
          displayDate: MeetingService.formatDate(new Date(2025, 0, 24)),
          location: 'Starbucks',
        },
        {
          meetingId: 2,
          customer: customers[1],
          date: format(new Date(2025, 0, 27), 'yyyy-MM-dd'),
          displayDate: MeetingService.formatDate(new Date(2025, 0, 27)),
          location: 'Starbucks',
        },
        {
          meetingId: 3,
          customer: customers[2],
          date: format(new Date(2025, 1, 1), 'yyyy-MM-dd'),
          displayDate: MeetingService.formatDate(new Date(2025, 1, 1)),
          location: 'Starbucks',
        },
        {
          meetingId: 4,
          customer: customers[3],
          date: format(new Date(2025, 1, 3), 'yyyy-MM-dd'),
          displayDate: MeetingService.formatDate(new Date(2025, 1, 3)),
          location: 'Starbucks',
        },
      ];

      // Set the entities inside EntityService
      this.setEntities(defaultMeetings);
    } catch (error) {
      console.error('Error fetching customers for meetings:', error);
    }
  }

  flipAddMeeting(): void {
    this.setAddEntityState(!this.getAddEntityState());
  }

  updateMeeting(meetingToUpdate: Meeting): void {
    const currentMeetings = this.getEntities();
    const index = currentMeetings.findIndex(
      (meeting) => meeting.meetingId === meetingToUpdate.meetingId
    );

    if (index !== -1) {
      const updatedMeetings = [...currentMeetings];
      updatedMeetings[index] = {
        ...currentMeetings[index],
        ...meetingToUpdate,
      };

      this.setEntities(updatedMeetings);
    }
  }

  addMeeting(newMeeting: Meeting): void {
    this.setEntities([...this.getEntities(), newMeeting]);
  }

  deleteMeeting(meeting: Meeting): void {
    this.setEntities(
      this.getEntities().filter((m) => m.meetingId !== meeting.meetingId)
    );
  }

  generateUniqueMeetingId(): number {
    const existingIds = new Set(
      this.getEntities().map((meeting) => meeting.meetingId)
    );
    let newId: number;
    do {
      newId = Math.floor(Math.random() * 10000) + 1;
    } while (existingIds.has(newId));
    return newId;
  }

  private static formatDate(date: Date): string {
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
