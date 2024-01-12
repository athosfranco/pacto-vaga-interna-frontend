import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { differenceInMonths, differenceInYears } from 'date-fns';
import { SkillService } from '../../services/skill.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private skillService: SkillService,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {}

  user: any;

  formattedHireDate: any;

  skillsAvaliable: any[] = [];

  selectedSkill: any;

  getSkillsFromServer() {
    this.skillService.getAllSkills().subscribe(
      (skills) => {
        this.skillsAvaliable = skills;
        console.log('Skills:', skills);
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  updateUserInfo() {
    this.userService.getUserById(this.user.userId).subscribe((response) => {
      this.user = response;
      localStorage.setItem('user', JSON.stringify(response));
    });
  }

  openErrorSnackBar(errorMsg: string) {
    this.snackbar.open(errorMsg, 'Ok', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  addSkillToUser() {
    this.skillService
      .addSkillsToUser(this.user.userId, this.selectedSkill.skillId, 2)
      .subscribe(
        (response) => {
          console.log('SKILL ADDED:', response);
          this.updateUserInfo();
        },
        (error) => {
          this.openErrorSnackBar(error.error.message);
        }
      );
  }

  ngOnInit(): void {
    this.getSkillsFromServer();

    const userString = localStorage.getItem('user');

    if (userString) {
      this.user = JSON.parse(userString);
      this.formatHireDate(JSON.parse(userString).hireDate);
    }
  }

  isAdmin(): boolean {
    if (this.authService.hasAuthority('ADMIN')) {
      return true;
    } else {
      return false;
    }
  }

  formatHireDate(hireDate: string): void {
    const hireDateObject = new Date(hireDate);
    const currentDate = new Date();

    const monthsDifference = differenceInMonths(currentDate, hireDateObject);
    const yearsDifference = differenceInYears(currentDate, hireDateObject);

    if (yearsDifference > 0) {
      this.formattedHireDate = `Colaborador há mais de ${yearsDifference} ${
        yearsDifference === 1 ? 'ano' : 'anos'
      }`;
    } else if (monthsDifference > 1) {
      this.formattedHireDate = `Colaborador há ${monthsDifference} ${
        monthsDifference === 1 ? 'mês' : 'meses'
      }
      `;
    } else {
      this.formattedHireDate = `Colaborador novo`;
    }
  }
}
