import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmJobExclusionDialogComponent } from '../confirm-job-exclusion-dialog/confirm-job-exclusion-dialog.component';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  @Input() job: any;
  @Input() searchQuery!: string;

  formatTimeDifference(createdAt: string): string {
    const creationDate = new Date(createdAt);
    return formatDistanceToNow(creationDate, { locale: ptBR, addSuffix: true });
  }

  goToJobDetails(jobId: number) {
    this.router.navigate(['/dashboard/job-details'], {
      queryParams: { id: jobId },
    });
  }

  isAdmin(): boolean {
    if (this.authService.hasAuthority('ADMIN')) {
      return true;
    } else {
      return false;
    }
  }

  openDeleteDialog(job: any) {
    this.dialog.open(ConfirmJobExclusionDialogComponent, {
      data: job,
    });
  }
}
