import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css',
})
export class LogoutDialogComponent {
  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LogoutDialogComponent>
  ) {}

  onLogout() {
    this.authService.logout();
    this.dialogRef.close();
  }
}
