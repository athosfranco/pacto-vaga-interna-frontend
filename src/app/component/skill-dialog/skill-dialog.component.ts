import { SkillService } from './../../services/skill.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrl: './skill-dialog.component.css',
})
export class SkillDialogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private skillService: SkillService
  ) {}

  skillForm!: FormGroup;

  allSkills: any[] = [];

  loadingSkills: boolean = false;

  ngOnInit(): void {
    this.skillForm = this.formBuilder.group({
      skillName: ['', Validators.required],
    });
    this.getAllSkillsFromServer();
  }

  getAllSkillsFromServer() {
    this.loadingSkills = true;
    this.skillService.getAllSkills().subscribe(
      (response) => {
        this.loadingSkills = false;
        console.log('SKILLS:', response);
        this.allSkills = response;
      },
      (error) => {
        this.loadingSkills = false;
        console.error('Erro ao buscar habilidades:', error);
      }
    );
  }

  addSkillToServer() {
    const skillData = {
      skillName: this.skillForm.get('skillName')!.value,
      expInYears: 0,
    };

    this.skillService.addSkill(skillData).subscribe(
      (response) => {
        this.getAllSkillsFromServer();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteSkill(skillId: any) {
    this.loadingSkills = true;
    this.skillService.deleteSkill(skillId).subscribe(
      (response) => {
        console.log(response);
        this.loadingSkills = false;
        this.getAllSkillsFromServer();
      },
      (error) => {
        console.log(error);
        this.loadingSkills = false;
      }
    );
  }
}
