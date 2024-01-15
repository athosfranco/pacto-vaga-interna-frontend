import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-jobs-page',
  templateUrl: './jobs-page.component.html',
  styleUrls: ['./jobs-page.component.css'],
})
export class JobsPageComponent implements OnInit, OnDestroy {
  searchValue = '';
  lastSearch = '';
  isLoading: boolean = false;
  jobList: any[] = [];
  private searchSubject = new Subject<string>();
  private subscription!: Subscription;

  constructor(private http: HttpClient) {}

  handleClear() {
    this.searchValue = '';
    this.lastSearch = '';
    this.getAllJobs();
  }

  getAllJobs() {
    this.http
      .get<any[]>(
        'https://pacto-vaga-interna-backend-production.up.railway.app/api/jobs'
      )
      .subscribe(
        (response) => {
          console.log('RESPOSTA INICIAL', response);
          this.jobList = response.sort((a, b) =>
            this.compareDates(b.createdAt, a.createdAt)
          );

          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao carregar vagas de trabalho iniciais:', error);
          this.isLoading = false;
        }
      );
  }

  ngOnInit() {
    this.isLoading = true;

    this.getAllJobs();

    this.subscription = this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap((query: string) => {
          if (query.length > 0) {
            this.isLoading = true;
            this.lastSearch = query;
            return this.http
              .get<any[]>(
                `https://pacto-vaga-interna-backend-production.up.railway.app/api/jobs/search?query=${query}`
              )
              .pipe(
                finalize(() => {
                  this.isLoading = false;
                })
              );
          } else {
            this.handleClear();
            return [];
          }
        })
      )
      .subscribe((response) => {
        console.log('RESPOSTA', response);
        this.jobList = response.sort((a, b) =>
          this.compareDates(b.createdAt, a.createdAt)
        );
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearchInputChange() {
    this.searchSubject.next(this.searchValue);
  }

  private compareDates(dateA: string, dateB: string): number {
    const timeA = new Date(dateA).getTime();
    const timeB = new Date(dateB).getTime();

    return timeA - timeB;
  }
}
