import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInZoom', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translate(-50%, -30%)',
        })
      ),
      transition(':enter, :leave', [animate('800ms')]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  tokenExpiredNotif: boolean = false;

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.tokenExpiredNotif = this.authService.getTokenExpiredNotification();
  }

  errorMessage: string | null = null;
  isLoading: boolean = false;

  onGoToRegister(): void {
    this.router.navigate(['/register']);
  }

  onLogin(): void {
    this.errorMessage = null;
    this.isLoading = true;

    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        this.userService.saveUserOnService(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        const token = response.jwt;
        localStorage.setItem('access_token', token);

        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      (e) => {
        console.error('Login failed', e);
        this.errorMessage = e.error.message;
        this.isLoading = false;
      }
    );
  }
}
