import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent {
  constructor(private router: Router) {}

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
}
