import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Privlidges, Admin, User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject = new BehaviorSubject<User | null>(null); // Holds the logged-in user's data
  loggedInUser$: Observable<User | null> = this.userSubject.asObservable(); // Observable for components to subscribe to

  constructor() {}

  // Set the active user (e.g., after login)
  setUser(user: User): void {
    this.userSubject.next(user);
    localStorage.setItem('activeUser', JSON.stringify(user)); // Optional: Store in local storage
  }

  setMockUserAsActive(): void {
    const teamPrivileges: Privlidges[] = [
      Privlidges.Read,
      Privlidges.Write,
      Privlidges.Delete,
    ];
    const customerPrivileges: Privlidges[] = [
      Privlidges.Read,
      Privlidges.Write,
      Privlidges.Delete,
    ];
    const admin = new Admin(teamPrivileges, customerPrivileges);

    const user = new User('KyleJaws', admin);
    this.userSubject.next(user);
  }

  // Get the current active user
  getUser(): User | null {
    return this.userSubject.value;
  }

  // Clear the user (e.g., during logout)
  clearUser(): void {
    this.userSubject.next(null);
    localStorage.removeItem('activeUser'); // Clear from local storage
  }

  // Restore user from storage (e.g., on app reload)
  restoreUserFromStorage(): void {
    const storedUser = localStorage.getItem('activeUser');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }
}
