import { UserService } from './../../services/user.service';
// sidebar.component.ts
import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
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

  getSidebarStyles() {
    return {
      'sidebar-open': this.isSidebarOpen(),
      'sidebar-closed': !this.isSidebarOpen(),
    };
  }
}
