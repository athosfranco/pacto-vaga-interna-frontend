import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Component({
  selector: 'app-job-application-details-page',
  templateUrl: './job-application-details-page.component.html',
  styleUrls: ['./job-application-details-page.component.css'],
})
export class JobApplicationDetailsPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobService
  ) {}

  jobApplication: any;

  formatTimeDifference(createdAt: string): string {
    const creationDate = new Date(createdAt);
    return formatDistanceToNow(creationDate, { locale: ptBR, addSuffix: true });
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
