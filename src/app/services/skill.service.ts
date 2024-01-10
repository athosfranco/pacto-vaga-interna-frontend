import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllSkills(): Observable<any[]> {
    const url = `${this.apiUrl}/skills`;
    return this.http.get<any[]>(url);
  }

  addSkillsToUser(
    userId: string,
    skillId: string,
    expYears: number
  ): Observable<any> {
    const url = `${this.apiUrl}/skills/add-skill-to-user`;

    const params = new HttpParams()
      .set('userId', userId)
      .set('skillId', skillId)
      .set('expYears', expYears);

    return this.http.post<any>(url, {}, { params });
  }
}
