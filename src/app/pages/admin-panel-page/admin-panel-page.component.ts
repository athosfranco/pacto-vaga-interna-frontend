import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrl: './admin-panel-page.component.css',
})
export class AdminPanelPageComponent {
  constructor(private router: Router) {}

  user: any;

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
  }

  goToJobs() {
    this.router.navigate(['/dashboard/jobs']);
  }
  goToCreateJob() {
    this.router.navigate(['/dashboard/create-job']);
  }
}
