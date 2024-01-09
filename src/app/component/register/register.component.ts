import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { RegisterSuccessDialogComponent } from '../register-success-dialog/register-success-dialog.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    DatePipe,
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'LL',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class RegisterComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  currentYear = new Date().getFullYear();
  today = new Date();
  minDate = new Date(this.currentYear - 10, 0, 1);
  maxDate = this.today;

  @ViewChild('stepper') stepper!: MatStepper;

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    currentJob: ['', Validators.required],
    hireDate: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  isLoadingRegister: boolean = false;

  invalidPasswordError: boolean = false;

  usernameAlreadyExistsError: boolean = false;

  canProceedToNextStep(stepIndex: number): boolean {
    switch (stepIndex) {
      case 0:
        return this.firstFormGroup.valid;
      case 1:
        return this.secondFormGroup.valid;
      case 2:
        return this.thirdFormGroup.valid;
      default:
        return false;
    }
  }

  onUsernameInput(event: any): void {
    const input = event.target as HTMLInputElement;
    let newValue = input.value.toLowerCase();

    newValue = newValue.replace(/\s/g, '').replace(/[_\W]+/g, '');

    input.value = newValue;

    this.thirdFormGroup.get('username')!.setValue(newValue);
  }

  onGoBackToLogin(): void {
    this.router.navigate(['/login']);
  }

  registrationSuccess: boolean = false;

  onRegister(): void {
    this.isLoadingRegister = true;
    const hireDate = this.secondFormGroup.get('hireDate')!.value;

    let hireDateConvertedToLocalTimestamp;

    if (hireDate) {
      hireDateConvertedToLocalTimestamp = this.datePipe.transform(
        hireDate,
        'yyyy-MM-ddTHH:mm:ss'
      );
    }

    const registrationData = {
      username: this.thirdFormGroup.get('username')!.value,
      password: this.thirdFormGroup.get('password')!.value,
      firstName: this.firstFormGroup.get('firstName')!.value,
      lastName: this.firstFormGroup.get('lastName')!.value,
      gender: this.firstFormGroup.get('gender')!.value,
      currentJob: this.secondFormGroup.get('currentJob')!.value,
      hireDate: hireDateConvertedToLocalTimestamp,
    };

    this.authService.register(registrationData).subscribe(
      (response) => {
        this.isLoadingRegister = false;
        this.stepper.next();
        this.registrationSuccess = true;
        this.openDialog();
      },
      (e) => {
        this.isLoadingRegister = false;
        console.log(e);

        if (e.error.message.includes('já existe')) {
          this.usernameAlreadyExistsError = true;
        }
        if (e.error.message.includes('A senha precisa ter')) {
          this.invalidPasswordError = true;
        }
      }
    );
  }

  verifyPasswordMatch(): boolean {
    const pwd = this.thirdFormGroup.get('password')!.value;
    const confirmPwd = this.thirdFormGroup.get('confirmPassword')!.value;
    if (pwd === confirmPwd) {
      return true;
    }
    return false;
  }

  openDialog() {
    this.dialog.open(RegisterSuccessDialogComponent);
  }
}
