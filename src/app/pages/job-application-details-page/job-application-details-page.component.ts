import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuthService } from '../../services/auth.service';
import { UpdateJobApplicationDialogComponent } from '../../component/update-job-application-dialog/update-job-application-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-job-application-details-page',
  templateUrl: './job-application-details-page.component.html',
  styleUrls: ['./job-application-details-page.component.css'],
})
export class JobApplicationDetailsPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  isAdmin(): boolean {
    if (this.authService.hasAuthority('ADMIN')) {
      return true;
    } else {
      return false;
    }
  }

  jobApplication: any;

  formatTimeDifference(createdAt: string): string {
    const creationDate = new Date(createdAt);
    return formatDistanceToNow(creationDate, { locale: ptBR, addSuffix: true });
  }

  openUpdateApplicationDialog() {
    this.dialog.open(UpdateJobApplicationDialogComponent, {
      data: this.jobApplication,
    });
  }

  ngOnInit(): void {
    const jobApplicationId = this.activatedRoute.snapshot.queryParams['id'];
    console.log(this.activatedRoute);
    console.log('applicationId:', jobApplicationId);

    this.jobService.getJobApplicationById(jobApplicationId).subscribe(
      (jobApplication) => {
        this.jobApplication = jobApplication;
        console.log('Job Application Details:', jobApplication);
      },
      (error) => {
        console.error('Error fetching job application details:', error);
      }
    );
  }
}
