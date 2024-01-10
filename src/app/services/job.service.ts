import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getJobById(jobId: string): Observable<any> {
    const url = `${this.apiUrl}/jobs/${jobId}`;
    return this.http.get<any>(url);
  }

  registerJobApplication(
    userId: string,
    jobId: string,
    requestBody: any
  ): Observable<any> {
    const url = `${this.apiUrl}/job-applications?userId=${userId}&jobId=${jobId}`;
    // const params = { userId, jobId };
    return this.http.post<any>(url, requestBody);
  }

  getJobApplicationsByUserId(userId: string): Observable<any> {
    const url = `${this.apiUrl}/job-applications/byUserId/${userId}`;
    return this.http.get<any>(url);
  }

  getJobApplicationById(jobApplicationId: string): Observable<any> {
    const url = `${this.apiUrl}/job-applications/${jobApplicationId}`;
    return this.http.get<any>(url);
  }
}
