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

  createJob(job: any): Observable<any> {
    const url = `${this.apiUrl}/jobs`;
    return this.http.post<any>(url, job);
  }
  editJob(job: any, jobId: any): Observable<any> {
    const url = `${this.apiUrl}/jobs/${jobId}`;
    return this.http.put<any>(url, job);
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

  updateJobApplication(
    jobApplicationId: number,
    requestBody: any
  ): Observable<any> {
    const url = `${this.apiUrl}/job-applications/update-stage/${jobApplicationId}`;
    return this.http.put<any>(url, requestBody);
  }

  getJobApplicationsByUserId(userId: string): Observable<any> {
    const url = `${this.apiUrl}/job-applications/byUserId/${userId}`;
    return this.http.get<any>(url);
  }
  getAllJobApplications(): Observable<any> {
    const url = `${this.apiUrl}/job-applications`;
    return this.http.get<any>(url);
  }

  getJobApplicationById(jobApplicationId: string): Observable<any> {
    const url = `${this.apiUrl}/job-applications/${jobApplicationId}`;
    return this.http.get<any>(url);
  }

  deleteJob(jobId: number): Observable<any> {
    const url = `${this.apiUrl}/jobs/${jobId}`;
    return this.http.delete<any>(url);
  }
}
