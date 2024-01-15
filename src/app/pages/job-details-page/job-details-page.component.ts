import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { map } from 'rxjs';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ConfirmApplicationDialogComponent } from '../../component/confirm-application-dialog/confirm-application-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmJobExclusionDialogComponent } from '../../component/confirm-job-exclusion-dialog/confirm-job-exclusion-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-job-details-page',
  templateUrl: './job-details-page.component.html',
  styleUrls: ['./job-details-page.component.css'],
})
export class JobDetailsPageComponent implements OnInit {
  job: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  isLoading: boolean = false;

  formatTimeDifference(createdAt: string): string {
    const creationDate = new Date(createdAt);
    return formatDistanceToNow(creationDate, { locale: ptBR, addSuffix: true });
  }

  ngOnInit(): void {
    const jobId = this.activatedRoute.snapshot.queryParams['id'];

    console.log('Job ID:', jobId);

    this.isLoading = true;

    this.jobService.getJobById(jobId).subscribe(
      (jobDetails) => {
        this.job = jobDetails;
        console.log('Job Details:', jobDetails);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching job details:', error);
        this.isLoading = false;
      }
    );
  }

  goToEditJob(jobId: number) {
    this.router.navigate(['/dashboard/edit-job'], {
      queryParams: { id: jobId },
    });
  }

  openConfirmApplicationDialog() {
    const jobId = this.activatedRoute.snapshot.queryParams['id'];

    let userId;

    const userString = localStorage.getItem('user');

    if (userString) {
      userId = JSON.parse(userString).userId;
    }

    const userMessage = (<HTMLTextAreaElement>(
      document.getElementById('userMessage')
    )).value;

    console.log(
      `userId: ${userId} - jobId: ${jobId} - userMessage: ${userMessage}`
    );

    this.dialog.open(ConfirmApplicationDialogComponent, {
      data: { userId, jobId, userMessage },
    });
  }

  isAdmin(): boolean {
    if (this.authService.hasAuthority('ADMIN')) {
      return true;
    } else {
      return false;
    }
  }

  openDeleteDialog(job: any) {
    this.dialog.open(ConfirmJobExclusionDialogComponent, {
      data: job,
    });
  }
}
