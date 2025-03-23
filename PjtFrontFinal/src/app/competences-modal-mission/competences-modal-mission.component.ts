import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CompetencesService, Competences } from '../services/competences.service';
import { Missions } from '../services/missions.service';

@Component({
  selector: 'app-competences-modal-mission',
  standalone: false,
  templateUrl: './competences-modal-mission.component.html',
  styleUrls: ['./competences-modal-mission.component.css']
})
export class CompetencesModalMissionComponent implements OnInit {
  @Input() mission?: Missions;
  competencesMission: Competences[] = [];
  allCompetences: Competences[] = [];
  selectedCompetence?: string;
  errorMessage: string = "";
  isLoading = true;

  constructor(public bsModalRef: BsModalRef, private competenceService: CompetencesService) {}

  ngOnInit() {
    if (this.mission?.idM) {
      this.fetchCompetencesMission();
      this.fetchAllCompetences();
    }
  }

  fetchCompetencesMission() {
    this.competenceService.getCompetencesByMission(this.mission!.idM).subscribe({
      next: (data) => {
        this.competencesMission = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement compétences mission:', err);
        this.isLoading = false;
      }
    });
  }

  fetchAllCompetences() {
    this.competenceService.getCompetences().subscribe({
      next: (data) => {
        this.allCompetences = data;
      },
      error: (err) => {
        console.error('Erreur chargement de toutes les compétences:', err);
      }
    });
  }

  ajouterCompetence() {
    if (!this.selectedCompetence || !this.mission?.idM) return;

    if (this.competencesMission.some(c => c.idC === this.selectedCompetence)) {
      this.errorMessage = "Cette compétence est déjà associée à cette mission.";
      return;
    }

    this.competenceService.ajouterCompetenceMission(this.mission!.idM, this.selectedCompetence).subscribe({
      next: () => {
        this.errorMessage = "";
        this.selectedCompetence = undefined;
        this.fetchCompetencesMission();
      },
      error: (err) => {
        console.error("Erreur ajout compétence:", err);
      }
    });
  }

  dissocierCompetence(idC: string) {
    if (!this.mission?.idM) return;

    this.competenceService.dissocierCompetenceMission(this.mission.idM, idC).subscribe({
      next: () => {
        this.competencesMission = this.competencesMission.filter(c => c.idC !== idC);
      },
      error: (err) => {
        console.error("Erreur suppression compétence:", err);
      }
    });
  }
}
