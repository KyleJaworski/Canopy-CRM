import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleTableComponent } from '../schedule-table/schedule-table.component';
import { MeetingListComponent } from '../meeting-list/meeting-list.component';

@Component({
  selector: 'app-schedule-layout',
  imports: [ScheduleTableComponent, MeetingListComponent, CommonModule],
  templateUrl: './schedule-layout.component.html',
  styleUrl: './schedule-layout.component.scss',
})
export class ScheduleLayoutComponent {}
