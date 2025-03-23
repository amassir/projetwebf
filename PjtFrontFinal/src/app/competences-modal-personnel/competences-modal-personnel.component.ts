import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CompetencesService, Competences } from '../services/competences.service';
import { Personnel } from '../services/personnel.service';

@Component({
  selector: 'app-competences-modal-personnel',
  standalone: false,
  templateUrl: './competences-modal-personnel.component.html',
  styleUrls: ['./competences-modal-personnel.component.css']
})
export class CompetencesModalPersonnelComponent implements OnInit {
  @Input() personnel?: Personnel;
  competencesPersonnel: Competences[] = []; // Compétences associées au personnel
  allCompetences: Competences[] = []; // Toutes les compétences disponibles
  selectedCompetence?: string;
  errorMessage: string = "";
  isLoading = true;

  constructor(public bsModalRef: BsModalRef, private competenceService: CompetencesService) {}

  ngOnInit() {
    if (this.personnel?.idP) {
      this.fetchCompetencesPersonnel();
      this.fetchAllCompetences();
    }
  }

  fetchCompetencesPersonnel() {
    this.competenceService.getCompetencesByPersonnel(this.personnel!.idP).subscribe({
      next: (data) => {
        this.competencesPersonnel = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement compétences personnel:', err);
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
    if (!this.selectedCompetence || !this.personnel?.idP) return;

    if (this.competencesPersonnel.some(c => c.idC === this.selectedCompetence)) {
      this.errorMessage = "Cette compétence est déjà associée à ce personnel.";
      return;
    }

    this.competenceService.ajouterCompetencePersonnel(this.personnel!.idP, this.selectedCompetence).subscribe({
      next: () => {
        this.errorMessage = "";
        this.selectedCompetence = undefined;
        this.fetchCompetencesPersonnel();
      },
      error: (err) => {
        console.error("Erreur ajout compétence:", err);
      }
    });
  }

  dissocierCompetence(idC: string) {
    if (!this.personnel?.idP) return;

    this.competenceService.dissocierCompetencePersonnel(this.personnel.idP, idC).subscribe({
      next: () => {
        this.competencesPersonnel = this.competencesPersonnel.filter(c => c.idC !== idC);
      },
      error: (err) => {
        console.error("Erreur suppression compétence:", err);
      }
    });
  }
}
