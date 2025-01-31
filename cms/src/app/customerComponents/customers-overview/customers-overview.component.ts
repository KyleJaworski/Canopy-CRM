import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { Meeting } from '../../models/meeting';
import { MeetingService } from '../../services/meeting/meeting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers-overview',
  imports: [CommonModule],
  templateUrl: './customers-overview.component.html',
  styleUrl: './customers-overview.component.scss',
})
export class CustomersOverviewComponent implements OnInit, OnDestroy {
  // Dropdown tracking
  openDropdownIndex: number | null = null;

  private subscriptions: Subscription = new Subscription(); // Manage all subscriptions

  // Calendar and date tracking
  calendarDays!: { date: string; dayOfMonth: number; month: number }[];
  today = format(new Date(), 'yyyy-MM-dd');
  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();
  selectedDate = this.today;

  // Meetings data
  meetings: Meeting[] = [];

  meetingsInSelectedMonth: Meeting[] = [];

  // Month names for UI display
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(private meetingService: MeetingService) {}

  ngOnInit(): void {
    // Subscribe to meetings and initialize calendar and filters
    this.subscriptions.add(
      this.meetingService.entities$.subscribe((meetings) => {
        this.meetings = meetings;
        this.filterMeetingsByMonth();
      })
    );
    this.getCalendarDaysForMonth(this.selectedMonth, this.selectedYear);
  }

  filterMeetingsByMonth(): void {
    // Ensure `calendarDays` is populated before filtering
    if (!this.calendarDays || this.calendarDays.length === 0) {
      this.getCalendarDaysForMonth(this.selectedMonth, this.selectedYear);
    }

    // Filter meetings based on matching dates in `calendarDays`
    this.meetingsInSelectedMonth = this.meetings.filter((meeting) =>
      this.calendarDays.some((day) => day.date === meeting.date)
    );
  }

  // Toggle dropdown for calendar or other UI elements
  toggleDropdown(index: number): void {
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }

  // Set the selected date and update day-specific meetings
  setSelectedDate(day: { date: string }): void {
    this.selectedDate = day.date;
  }

  // Check if a date has a scheduled meeting
  isScheduled(date: string): boolean {
    return this.meetingsInSelectedMonth.some(
      (meeting) => meeting.date === date
    );
  }

  // Check if a date belongs to the selected month
  isSelectedMonth(month: number): boolean {
    return month === this.selectedMonth;
  }

  // Generate calendar days for the selected month
  getCalendarDaysForMonth(selectedMonth: number, selectedYear: number): void {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const start = startOfWeek(startOfMonth(firstDay), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(firstDay), { weekStartsOn: 1 });

    this.calendarDays = [];
    let current = start;
    while (current <= end) {
      this.calendarDays.push({
        date: format(current, 'yyyy-MM-dd'),
        dayOfMonth: current.getDate(),
        month: current.getMonth(),
      });
      current = addDays(current, 1);
    }
  }

  // Navigate to the next month
  monthUp(): void {
    this.selectedMonth = (this.selectedMonth + 1) % 12;
    if (this.selectedMonth === 0) this.selectedYear++;
    this.resetSelection();
  }

  // Navigate to the previous month
  monthDown(): void {
    this.selectedMonth = (this.selectedMonth - 1 + 12) % 12;
    if (this.selectedMonth === 11) this.selectedYear--;
    this.resetSelection();
  }

  // Reset selected date and refresh calendar
  private resetSelection(): void {
    this.selectedDate = '';
    this.getCalendarDaysForMonth(this.selectedMonth, this.selectedYear);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribes from all stored subscriptions
  }
}
