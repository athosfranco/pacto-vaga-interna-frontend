import { Component, Inject } from '@angular/core';
import { JobService } from '../../services/job.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-update-job-application-dialog',
  templateUrl: './update-job-application-dialog.component.html',
  styleUrls: ['./update-job-application-dialog.component.css'], // Fix the typo in styleUrls
})
export class UpdateJobApplicationDialogComponent {
  stages: any = [
    { value: 'UNDER_REVIEW', viewValue: 'Em Análise' },
    { value: 'APPROVED', viewValue: 'Aprovar Candidatura' },
    { value: 'REJECTED', viewValue: 'Reprovar Candidatura' },
    { value: 'CREATOR_CLOSED', viewValue: 'Marcar como Encerrada' },
  ];

  selectedStage: any;
  providedFeedback: any;

  constructor(
    private jobService: JobService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private dialogRef: DialogRef<UpdateJobApplicationDialogComponent>,
    private notificationService: NotificationService
  ) {}

  getStageStringForNotification(stage: string): any {
    if (stage === 'UNDER_REVIEW') {
      return 'está em análise';
    } else if (stage === 'APPROVED') {
      return 'foi aprovada';
    } else if (stage === 'REJECTED') {
      return 'foi rejeitada';
    } else {
      return 'foi encerrada pelo criador da vaga';
    }
  }

  handleUpdateJobApplication() {
    const requestBody = {
      newStage: this.selectedStage,
      feedback: this.providedFeedback,
    };

    console.log('requestBody', requestBody);

    console.log('data:', this.data);

    this.jobService
      .updateJobApplication(this.data.applicationId, requestBody)
      .subscribe(
        (response) => {
          console.log('Job application updated successfully', response);
          this.dialogRef.close();
          const notification = {
            title: 'Candidatura em análise',
            content: `A sua candidatura para a vaga  "${
              this.data.appliedJob.title
            }" ${this.getStageStringForNotification(
              this.selectedStage.value
            )}.`,
            destinationUserId: this.data.applicant.userId,
            read: false,
          };

          this.notificationService.createNotification(notification).subscribe(
            (response) => {
              console.log('notification:', response);
              window.location.reload();
            },
            (error) => {
              console.log('erro ao enviar notif:', error);
            }
          );
        },
        (error) => {
          console.error('Error updating job application', error);
        }
      );
  }
}
function getStageString(stage: any, string: any) {
  throw new Error('Function not implemented.');
}
