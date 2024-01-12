import { AuthService } from './../../services/auth.service';
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
    private AuthService: AuthService,
    private sidebarService: SidebarService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  isAdmin(): boolean {
    if (this.AuthService.hasAuthority('ADMIN')) {
      return true;
    } else {
      return false;
    }
  }

  isSidebarOpen(): boolean {
    return this.sidebarService.isSidebarOpen();
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
