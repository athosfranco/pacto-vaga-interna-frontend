import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl =
    'https://pacto-vaga-interna-backend-production.up.railway.app/api/notifications';

  constructor(private http: HttpClient) {}

  createNotification(notification: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, notification);
  }

  sendNotificationToAdmins(notification: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, notification);
  }

  getAllNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getNotificationById(notificationId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${notificationId}`);
  }

  getNotificationsByDestinationUserId(
    userId: number
  ): Observable<Notification[]> {
    const url = `${this.baseUrl}/byDestinationUserId/${userId}`;
    return this.http.get<Notification[]>(url);
  }
  getUnreadNotificationsByDestinationUserId(
    userId: number
  ): Observable<Notification[]> {
    const url = `${this.baseUrl}/unreadNotificationsByDestinationUserId/${userId}`;
    return this.http.get<Notification[]>(url);
  }

  updateNotification(
    notificationId: number,
    notification: any
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${notificationId}`, notification);
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${notificationId}`);
  }

  markNotificationAsRead(notificationId: number): Observable<Notification> {
    const url = `${this.baseUrl}/markAsRead/${notificationId}`;
    return this.http.put<Notification>(url, {});
  }
}
