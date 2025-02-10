import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ViewableObjectMap,
  ViewableObjectType,
} from '../../models/viewableObjects';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private selectedObject = new BehaviorSubject<{
    type: ViewableObjectType;
    object: ViewableObjectMap[ViewableObjectType];
  } | null>(null);

  selectedObject$ = this.selectedObject.asObservable();

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
