import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItems } from '../../models/menuItems.enum';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private currentPageSubject = new BehaviorSubject<MenuItems>(
    MenuItems.Dashboard
  ); // Default page
  currentPage$: Observable<MenuItems> = this.currentPageSubject.asObservable();

  constructor() {}

  // Method to update the current page
  setCurrentPage(page: MenuItems): void {
    this.currentPageSubject.next(page);
  }

  // Method to get the current page synchronously
  getCurrentPage(): MenuItems {
    return this.currentPageSubject.getValue();
  }
}
