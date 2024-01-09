import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: any | null = null;

  getUserObservable(): Observable<any> {
    return of(this.currentUser);
  }

  saveUserOnService(user: any): void {
    this.currentUser = user;
  }

  getUser(): any | null {
    return this.currentUser;
  }

  clearUser(): void {
    this.currentUser = null;
  }
}
