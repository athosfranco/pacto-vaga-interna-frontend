import { Component } from '@angular/core';
import { format, differenceInMonths, differenceInYears } from 'date-fns';
import { JobService } from '../../services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel-page',
  templateUrl: './user-panel-page.component.html',
  styleUrl: './user-panel-page.component.css',
})
export class UserPanelPageComponent {
  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      this.formatHireDate();
      const userId = JSON.parse(userString).userId;
      this.fetchJobApplications(userId);
    }
  }

  user: any;

  jobApplications: any[] = [];

  jobApplicationsUnderReview: any[] = [];

  jobApplicationsClosed: any[] = [];

  jobApplicationsApproved: any[] = [];

  goToJobs() {
    this.router.navigate(['/dashboard/jobs']);
  }

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

  formatHireDate(): void {
    const hireDate = new Date(this.user.hireDate);
    const currentDate = new Date();

    const monthsDifference = differenceInMonths(currentDate, hireDate);
    const yearsDifference = differenceInYears(currentDate, hireDate);

    if (yearsDifference > 0) {
      this.user.formattedHireDate = `Colaborador há ${yearsDifference} ${
        yearsDifference === 1 ? 'ano' : 'anos'
      }`;
    } else if (monthsDifference > 1) {
      this.user.formattedHireDate = `Colaborador há ${monthsDifference} ${
        monthsDifference === 1 ? 'mês' : 'meses'
      }
      `;
    } else {
      this.user.formattedHireDate = `Colaborador novo`;
    }
  }
}
