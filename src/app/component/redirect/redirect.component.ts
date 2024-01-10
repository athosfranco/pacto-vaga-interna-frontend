import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const redirectPath = this.authService.redirectBasedOnAuthority();

    if (redirectPath) {
      this.router.navigate([`/dashboard/${redirectPath}`]);
    } else {
      this.authService.logout();
    }
  }
}
