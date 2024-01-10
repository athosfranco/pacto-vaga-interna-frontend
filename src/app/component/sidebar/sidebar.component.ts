import { UserService } from './../../services/user.service';
// sidebar.component.ts
import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    private sidebarService: SidebarService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  userFirstName: string = '';

  isSidebarOpen(): boolean {
    return this.sidebarService.isSidebarOpen();
  }

  ngOnInit(): void {
    console.log('user:', this.userService.getUser());
    this.userService.getUserObservable().subscribe((user) => {
      this.userFirstName = user?.firstName || '';
    });
  }

  openLogoutDialog() {
    this.dialog.open(LogoutDialogComponent);
  }

  getSidebarStyles() {
    return {
      'sidebar-open': this.isSidebarOpen(),
      'sidebar-closed': !this.isSidebarOpen(),
    };
  }

  navigateTo(route: string) {
    this.router.navigate(['/dashboard/' + route]);
    this.sidebarService.toggleSidebar();
  }
}
