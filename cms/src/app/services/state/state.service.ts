import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ViewableObjectMap,
  ViewableObjectType,
} from '../../models/viewableObjects';
import { format } from 'date-fns';
import { Meeting } from '../../models/meeting';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  today = format(new Date(), 'yyyy-MM-dd');

  private selectedObject = new BehaviorSubject<{
    type: ViewableObjectType;
    object: ViewableObjectMap[ViewableObjectType];
  } | null>(null);

  private selectedDate = new BehaviorSubject<string>(this.today);
  private meetingsInMonth = new BehaviorSubject<Meeting[]>([]);

  meetingsInMonth$ = this.meetingsInMonth.asObservable();

  selectedDate$ = this.selectedDate.asObservable();

  selectedObject$ = this.selectedObject.asObservable();

  setMeetingsInMonth(meetings: Meeting[]) {
    this.meetingsInMonth.next(meetings);
  }

  setSelectedDate(date: string) {
    this.selectedDate.next(date);
  }

  /**
   * Sets the selected object using enum type for safety
   */
  setSelectedObject<T extends ViewableObjectType>(
    type: T,
    object: ViewableObjectMap[T]
  ) {
    this.selectedObject.next({ type, object });
  }

  /**
   * Clears the selection
   */
  clearSelection() {
    this.selectedObject.next(null);
  }
}
