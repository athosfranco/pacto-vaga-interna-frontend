import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { JobService } from '../../services/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmJobCreationDialogComponent } from '../../component/confirm-job-creation-dialog/confirm-job-creation-dialog.component';

@Component({
  selector: 'app-create-job-page',
  templateUrl: './create-job-page.component.html',
  styleUrl: './create-job-page.component.css',
})
export class CreateJobPageComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private skillService: SkillService,
    private jobService: JobService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  jobForm = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  allSkills: any[] = [];

  selectedSkills: any[] = [];

  getAllSkillsFromServer() {
    this.skillService.getAllSkills().subscribe(
      (response) => {
        console.log('SKILLS:', response);
        this.allSkills = response;
      },
      (error) => {
        console.error('Erro ao buscar habilidades:', error);
      }
    );
  }

  selectSkill(selectedSkill: any) {
    if (this.selectedSkills.includes(selectedSkill)) {
      this.selectedSkills = this.selectedSkills.filter(
        (skill) => selectedSkill !== skill
      );
    } else {
      this.selectedSkills.push(selectedSkill);
    }
    console.log('selected skills:', this.selectedSkills);
  }

  openSnackBar(msg: string) {
    this.snackbar.open(msg, 'Ok', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  openConfirmationDialog() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userId = JSON.parse(userString).userId;

      this.dialog.open(ConfirmJobCreationDialogComponent, {
        data: {
          jobData: {
            title: this.jobForm.get('title')!.value,
            description: this.jobForm.get('description')!.value,
            requiredSkills: this.selectedSkills,
            publishedByUserId: userId,
          },
          isEditing: false,
        },
      });
    }
  }

  ngOnInit() {
    this.getAllSkillsFromServer();
  }
}
