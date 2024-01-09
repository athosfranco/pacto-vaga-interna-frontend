// topbar.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  user: any;

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
