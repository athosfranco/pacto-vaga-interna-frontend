import { AuthService } from './../../services/auth.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-job-application-card',
  templateUrl: './job-application-card.component.html',
  styleUrl: './job-application-card.component.css',
})
export class JobApplicationCardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  @Input() jobApplication: any;

  formatDateTime(dateTime: string): string {
    const formattedDate = format(new Date(dateTime), 'dd MMM. yyyy (HH:mm)');
    return formattedDate;
  }

  isAdmin(): boolean {
    if (this.authService.hasAuthority('ADMIN')) {
      return true;
    } else {
      return false;
    }
  }

  goToJobApplication(jobApplicationId: any) {
    this.router.navigate(['/dashboard/job-application-details'], {
      queryParams: { id: jobApplicationId },
    });
  }
}
