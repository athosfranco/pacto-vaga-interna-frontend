// auth.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private apiUrl = 'http://localhost:8080';

  private tokenExpiredNotification: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    //VERIFICA TOKEN NA INICIALIZAÇÃO
    this.checkTokenExpiration();
    //VERIFICA SE HÁ SESSÃO DE USUÁRIO
    // this.initUser();
    // VERIFICA TOKEN A CADA 5 MIN
    setInterval(() => {
      this.checkTokenExpiration();
    }, 5 * 60 * 1000);
  }

  private fetchUserFromServer(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };
    const userId = localStorage.getItem('user_id');

    return this.http.get(`${this.apiUrl}/api/users/${userId}`, { headers });
  }

  // private initUser(): void {
  //   const token = localStorage.getItem('access_token');

  //   const tokenIsValid = token && !this.jwtHelper.isTokenExpired(token);

  //   if (tokenIsValid) {
  //     this.fetchUserFromServer().subscribe(
  //       (user) => {
  //         console.log('USER:', user);
  //         this.userService.saveUserOnService(user);
  //       },
  //       (error) => {
  //         alert('Erro ao buscar info do user, ver console');
  //         console.error('Error fetching user information:', error);
  //         this.logout();
  //       }
  //     );
  //   }
  // }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(username: string, password: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = { username, password };

    return this.http.post(`${this.apiUrl}/auth/login`, body, { headers });
  }

  public register(data: any): Observable<any> {
    console.log('REGISTRATION BODY:', data);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiUrl}/auth/register`, data, { headers });
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  public isTokenExpired(): boolean {
    const token = localStorage.getItem('access_token');

    if (token) {
      return this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  public getTokenExpiredNotification(): boolean {
    return this.tokenExpiredNotification;
  }

  public checkTokenExpiration(): void {
    if (this.isTokenExpired()) {
      this.tokenExpiredNotification = true;
      this.logout();
    }
  }
}
