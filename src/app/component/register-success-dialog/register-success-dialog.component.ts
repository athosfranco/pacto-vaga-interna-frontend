import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-success-dialog',
  templateUrl: './register-success-dialog.component.html',
  styleUrl: './register-success-dialog.component.css',
})
export class RegisterSuccessDialogComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<RegisterSuccessDialogComponent>
  ) {}

  ngOnDestroy(): void {
    this.router.navigate(['/login']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }
}
