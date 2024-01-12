import { Component, Inject } from '@angular/core';
import { JobService } from '../../services/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-job-creation-dialog',
  templateUrl: './confirm-job-creation-dialog.component.html',
  styleUrl: './confirm-job-creation-dialog.component.css',
})
export class ConfirmJobCreationDialogComponent {
  constructor(
    private jobService: JobService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmJobCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  openSnackBar(msg: string) {
    this.snackbar.open(msg, 'Ok', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  createOrEditJob() {
    if (this.data.isEditing) {
      this.jobService.editJob(this.data.jobData, this.data.jobId).subscribe(
        (response) => {
          console.log('edit job:', response);

          this.router.navigate(['/dashboard/jobs']);
          this.dialogRef.close();
          this.openSnackBar('Vaga editada com sucesso!');
        },
        (error) => {
          console.log('error:', error);
          this.openSnackBar(error.error.message);
        }
      );
    } else {
      this.jobService.createJob(this.data.jobData).subscribe(
        (response) => {
          console.log('create job:', response);

          this.router.navigate(['/dashboard/jobs']);
          this.dialogRef.close();
          this.openSnackBar('Vaga criada com sucesso!');
        },
        (error) => {
          console.log('error:', error);
          this.openSnackBar(error.error.message);
        }
      );
    }
  }
}
