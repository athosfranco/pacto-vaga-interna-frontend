import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { differenceInMonths, differenceInYears } from 'date-fns';

@Component({
  selector: 'app-review-application-list',
  templateUrl: './review-application-list.component.html',
  styleUrl: './review-application-list.component.css',
})
export class ReviewApplicationListComponent implements OnInit {
  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.fetchJobApplications();
  }

  categorySelected: 'UNDER_REVIEW' | 'CLOSED' | 'REJECTED' | 'APPROVED' =
    'UNDER_REVIEW';

  jobApplications: any[] = [];

  jobApplicationsUnderReview: any[] = [];

  jobApplicationsClosed: any[] = [];

  jobApplicationsRejected: any[] = [];

  jobApplicationsApproved: any[] = [];

  selectCategory(
    category: 'UNDER_REVIEW' | 'CLOSED' | 'REJECTED' | 'APPROVED'
  ) {
    this.categorySelected = category;
  }

  fetchJobApplications(): void {
    this.jobService.getAllJobApplications().subscribe(
      (applications) => {
        console.log('applications', applications);

        this.jobApplications = applications;

        this.jobApplicationsUnderReview = applications.filter(
          (ap: any) => ap.applicationStage === 'UNDER_REVIEW'
        );

        this.jobApplicationsClosed = applications.filter(
          (ap: any) =>
            ap.applicationStage === 'REJECTED' ||
            ap.applicationStage === 'USER_CLOSED' ||
            ap.applicationStage === 'CREATOR_CLOSED'
        );

        this.jobApplicationsApproved = applications.filter((ap: any) => {
          return ap.applicationStage === 'APPROVED';
        });
      },
      (error) => {
        console.error('Error fetching job applications:', error);
      }
    );
  }
}
