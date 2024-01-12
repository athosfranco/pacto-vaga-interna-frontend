import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel-page',
  templateUrl: './user-panel-page.component.html',
  styleUrl: './user-panel-page.component.css',
})
export class UserPanelPageComponent {
  constructor(private jobService: JobService, private router: Router) {}

  user: any;

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);

      const userId = JSON.parse(userString).userId;
    }
  }

  goToJobs() {
    this.router.navigate(['/dashboard/jobs']);
  }
  goToProfile() {
    this.router.navigate(['/dashboard/profile']);
  }
}
