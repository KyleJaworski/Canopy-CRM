import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state/state.service';
import { Meeting } from '../../models/meeting';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
@Component({
  selector: 'app-meeting-list',
  imports: [CommonModule],
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.scss',
})
export class MeetingListComponent implements OnInit {
  // Dropdown tracking
  openDropdownIndex: number | null = null;
  today = format(new Date(), 'yyyy-MM-dd');
  selectedDate: string = this.today;
  meetingsInSelectedMonth: Meeting[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.selectedDate$.subscribe((date: string) => {
      this.selectedDate = date;
    });

    this.stateService.meetingsInMonth$.subscribe((meetings) => {
      this.meetingsInSelectedMonth = meetings;
    });
  }

  // Toggle dropdown for calendar or other UI elements
  toggleDropdown(index: number): void {
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }
}
