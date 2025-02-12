import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MissionsService, Missions } from '../services/missions.service';
import { CompetencesService, Competences } from '../services/competences.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mission-form',
  templateUrl: './missions-form.component.html',
  styleUrls: ['./missions-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class MissionsFormComponent implements OnInit {
  missionForm: FormGroup;
  competences: Competences[] = [];

  constructor(
    private fb: FormBuilder,
    private missionService: MissionsService,
    private competenceService: CompetencesService
  ) {
    this.missionForm = this.fb.group({
      nomM: ['', Validators.required],
      descriptionM: ['', Validators.required],
      dateDebutM: ['', Validators.required],
      dateFinM: ['', Validators.required],
      competences: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.competenceService.getCompetences().subscribe(data => {
      this.competences = data;
      this.addCompetenceCheckboxes();
    });
  }

  private addCompetenceCheckboxes(): void {
    this.competences.forEach(() => this.competencesFormArray.push(new FormControl(false)));
  }

  get competencesFormArray(): FormArray {
    return this.missionForm.get('competences') as FormArray;
  }

  onSubmit(): void {
    if (this.missionForm.valid) {
      const mission: Missions = {
        ...this.missionForm.value,
        statutM: 'en préparation',
        anomalieM: ''
      };
      this.missionService.addMission(mission).subscribe(createdMission => {
        const selectedCompetences = this.missionForm.value.competences
          .map((checked: boolean, i: number) => checked ? this.competences[i].idC : null)
          .filter((v: number | null) => v !== null);
        selectedCompetences.forEach((competenceId: number) => {
          
        });
      });
    }
  }
}