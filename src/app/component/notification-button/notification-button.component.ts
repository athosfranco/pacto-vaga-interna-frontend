import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Component({
  selector: 'app-notification-button',
  templateUrl: './notification-button.component.html',
  styleUrls: ['./notification-button.component.css'],
})
export class NotificationButtonComponent implements OnInit {
  notifications: any[] = [];
  userId: any;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      this.userId = user.userId;

      this.notificationService
        .getUnreadNotificationsByDestinationUserId(user.userId)
        .subscribe((notifications) => {
          this.notifications = notifications;
        });
    }
  }

  formatTimeDifference(createdAt: string): string {
    const creationDate = new Date(createdAt);
    return formatDistanceToNow(creationDate, { locale: ptBR, addSuffix: true });
  }

  openNotificationDialog(
    notificationId: number,
    title: string,
    content: string,
    jobApplicationId: number,
    createdAt: string
  ) {
    this.notificationService.markNotificationAsRead(notificationId).subscribe(
      () => {
        this.dialog.open(NotificationDialogComponent, {
          data: {
            notificationId,
            title,
            content,
            jobApplicationId,
            createdAt,
          },
        });

        this.notificationService
          .getUnreadNotificationsByDestinationUserId(this.userId)
          .subscribe((notifications) => {
            this.notifications = notifications;
          });
      },
      (error) => {
        console.error('Erro ao marcar notificaçao como lida:', error);
      }
    );
  }
}
