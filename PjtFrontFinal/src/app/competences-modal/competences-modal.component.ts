import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CompetencesService } from '../services/competences.service';
import { Personnel } from '../services/personnel.service';
import { Missions } from '../services/missions.service';

@Component({
  selector: 'app-competences-modal',
  standalone: false,
  templateUrl: './competences-modal.component.html',
  styleUrl: './competences-modal.component.css'
})

export class CompetencesModalComponent implements OnInit {
  @Input() personnel?: Personnel;  // Peut être `undefined`
  @Input() mission?: Missions;  // Ajout pour la gestion des missions
  competences: any[] = [];
  isLoading = true;

  constructor(public bsModalRef: BsModalRef, private competenceService: CompetencesService) {}

  ngOnInit() {
    if (this.personnel?.idP) {
      this.fetchCompetencesPersonnel();
    } else if (this.mission?.idM) {
      this.fetchCompetencesMission();
    }
  }

  fetchCompetencesPersonnel() {
    this.competenceService.getCompetencesByPersonnel(this.personnel!.idP).subscribe({
      next: (data) => {
        this.competences = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des compétences du personnel :', err);
        this.isLoading = false;
      }
    });
  }

  fetchCompetencesMission() {
    this.competenceService.getCompetencesByMission(this.mission!.idM).subscribe({
      next: (data) => {
        this.competences = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des compétences de la mission :', err);
        this.isLoading = false;
      }
    });
  }
}
