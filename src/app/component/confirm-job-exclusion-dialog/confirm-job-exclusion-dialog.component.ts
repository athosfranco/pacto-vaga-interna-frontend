import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobService } from '../../services/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-job-exclusion-dialog',
  templateUrl: './confirm-job-exclusion-dialog.component.html',
  styleUrl: './confirm-job-exclusion-dialog.component.css',
})
export class ConfirmJobExclusionDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public jobData: any,
    private jobService: JobService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ConfirmJobExclusionDialogComponent>,
    private router: Router
  ) {}

  deleteJob() {
    this.jobService.deleteJob(this.jobData.jobId).subscribe(
      (response) => {
        this.dialogRef.close();
        this.router.navigate(['/dashboard/jobs']);
        this.snackbar.open('Vaga foi apagada do banco de dados', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        this.dialogRef.close();
        if (error.error.message.includes('job_applications')) {
          this.snackbar.open(
            'Não é possível apagar esta vaga. Encerre todas as candidaturas relacionadas a ela primeiro.',
            'Ok',
            {
              duration: 10000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            }
          );
        }
      }
    );
  }
}
