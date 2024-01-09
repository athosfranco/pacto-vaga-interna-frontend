import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Example: Check authentication status when the component is initialized
    if (!this.authService.isAuthenticated()) {
      // Redirect to the login page or perform another action
    }
  }
}
