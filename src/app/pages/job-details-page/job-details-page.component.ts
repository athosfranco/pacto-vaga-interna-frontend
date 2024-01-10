import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { map } from 'rxjs';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ConfirmApplicationDialogComponent } from '../../component/confirm-application-dialog/confirm-application-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private dialog: MatDialog
  ) {}

  formatTimeDifference(createdAt: string): string {
    const creationDate = new Date(createdAt);
    return formatDistanceToNow(creationDate, { locale: ptBR, addSuffix: true });
  }

  ngOnInit(): void {
    const jobId = this.activatedRoute.snapshot.queryParams['id'];

    console.log('Job ID:', jobId);

    this.jobService.getJobById(jobId).subscribe(
      (jobDetails) => {
        this.job = jobDetails;
        console.log('Job Details:', jobDetails);
      },
      (error) => {
        console.error('Error fetching job details:', error);
      }
    );
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
}
