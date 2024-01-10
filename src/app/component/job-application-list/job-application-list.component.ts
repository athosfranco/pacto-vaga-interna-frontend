import { Component, Input, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-application-list',
  templateUrl: './job-application-list.component.html',
  styleUrls: ['./job-application-list.component.css'],
})
export class JobApplicationListComponent {
  @Input() jobApplications: any;

  constructor(private jobService: JobService) {}

  // ngOnInit(): void {
  //   const userString = localStorage.getItem('user');
  //   if (userString) {
  //     const userId = JSON.parse(userString).userId;
  //     this.fetchJobApplications(userId);
  //   }
  // }

  // fetchJobApplications(userId: string): void {
  //   this.jobService.getJobApplicationsByUserId(userId).subscribe(
  //     (applications) => {
  //       this.jobApplications = applications;
  //       console.log('Job Applications:', this.jobApplications);
  //     },
  //     (error) => {
  //       console.error('Error fetching job applications:', error);
  //     }
  //   );
  // }
}
