import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { JobService } from '../../services/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmJobCreationDialogComponent } from '../../component/confirm-job-creation-dialog/confirm-job-creation-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-job-page',
  templateUrl: './edit-job-page.component.html',
  styleUrl: './edit-job-page.component.css',
})
export class EditJobPageComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private skillService: SkillService,
    private jobService: JobService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  jobEditForm = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  allSkills: any[] = [];

  job: any;

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
            title: this.jobEditForm.get('title')!.value,
            description: this.jobEditForm.get('description')!.value,
            requiredSkills: this.selectedSkills,
            publishedByUserId: userId,
          },
          isEditing: true,
          jobId: this.job.jobId,
        },
      });
    }
  }

  ngOnInit() {
    this.getAllSkillsFromServer();

    const jobId = this.activatedRoute.snapshot.queryParams['id'];

    this.jobService.getJobById(jobId).subscribe(
      (jobDetails) => {
        this.job = jobDetails;
        console.log('Job Details:', jobDetails);

        this.jobEditForm.patchValue({
          title: jobDetails.title,
          description: jobDetails.description,
        });

        this.selectedSkills = jobDetails.requiredSkills;
      },
      (error) => {
        console.error('Error fetching job details:', error);
      }
    );
  }
}
