import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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

  getUserById(userId: string): Observable<any> {
    const url = `https://pacto-vaga-interna-backend-production.up.railway.app/api/users/${userId}`;
    return this.http.get<any>(url);
  }
}
