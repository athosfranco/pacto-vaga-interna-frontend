import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { differenceInMonths, differenceInYears } from 'date-fns';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private skillService: SkillService
  ) {}

  user: any;

  formattedHireDate: any;

  skillsAvaliable: any[] = [];

  selectedSkill: any;

  addSkillToUser() {
    this.skillService
      .addSkillsToUser(this.user.userId, this.selectedSkill.skillId, 2)
      .subscribe(
        (response) => {
          console.log('SKILL ADDED:', response);
          this.userService
            .getUserById(this.user.userId)
            .subscribe((response) => {
              this.user = response;
              localStorage.setItem('user', JSON.stringify(response));
            });
        },
        (error) => {
          console.log('error:', error);
        }
      );
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('user');

    if (userString) {
      this.user = JSON.parse(userString);

      this.formatHireDate(JSON.parse(userString).hireDate);
    }

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
