import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private openSidebar = false;

  toggleSidebar() {
    this.openSidebar = !this.openSidebar;
  }

  isSidebarOpen() {
    return this.openSidebar;
  }
}
