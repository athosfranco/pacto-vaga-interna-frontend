import { Component, Input } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-application-list',
  templateUrl: './job-application-list.component.html',
  styleUrls: ['./job-application-list.component.css'],
})
export class JobApplicationListComponent {
  user: any;

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);

      const userId = JSON.parse(userString).userId;
      this.fetchJobApplications(userId);
    }
  }

  categorySelected: 'ALL' | 'UNDER_REVIEW' | 'CLOSED' | 'APPROVED' = 'ALL';

  constructor(private jobService: JobService) {}

  jobApplications: any[] = [];

  jobApplicationsUnderReview: any[] = [];

  jobApplicationsClosed: any[] = [];

  jobApplicationsApproved: any[] = [];

  fetchJobApplications(userId: string): void {
    this.jobService.getJobApplicationsByUserId(userId).subscribe(
      (applications) => {
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
        console.log('Job Applications:', this.jobApplications);
      },
      (error) => {
        console.error('Error fetching job applications:', error);
      }
    );
  }

  selectCategory(category: 'ALL' | 'UNDER_REVIEW' | 'CLOSED' | 'APPROVED') {
    this.categorySelected = category;
  }
}
