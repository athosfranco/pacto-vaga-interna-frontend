import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobService } from '../../services/job.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-confirm-application-dialog',
  templateUrl: './confirm-application-dialog.component.html',
  styleUrls: ['./confirm-application-dialog.component.css'],
})
export class ConfirmApplicationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmApplicationDialogComponent>,
    private jobService: JobService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  isLoading: boolean = false;

  errorMessage: string = '';

  finishedRequest: null | 'Success' | 'Fail' = null;

  userMessage: string = '';

  onHandleJobApplication(): void {
    this.isLoading = true;

    const { userId, jobId, userMessage } = this.data;

    const requestBody = { userMessage };

    this.jobService
      .registerJobApplication(userId, jobId, requestBody)
      .subscribe(
        (response) => {
          this.isLoading = false;
          console.log('Job application registered successfully:', response);
          this.finishedRequest = 'Success';

          this.jobService.getJobById(jobId).subscribe((response) => {
            console.log('job found:', response);
            const notification = {
              title: 'Candidatura em análise',
              content: `A sua candidatura para a vaga de ${response.title} está em análise.`,
              destinationUserId: userId,
              read: false,
            };

            this.notificationService.createNotification(notification).subscribe(
              (response) => {
                console.log('notification:', response);
              },
              (error) => {
                console.log('erro ao enviar notif:', error);
              }
            );
          });
        },
        (error) => {
          this.isLoading = false;
          this.finishedRequest = 'Fail';
          this.errorMessage = error.error.message;
          console.error('Error registering job application:', error);
        }
      );
  }
}
