import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CompetencesService, Competences } from '../services/competences.service';
import { Personnel } from '../services/personnel.service';
import { Missions } from '../services/missions.service';

@Component({
  selector: 'app-competences-modal',
  standalone: false,
  templateUrl: './competences-modal.component.html',
  styleUrls: ['./competences-modal.component.css']
})
export class CompetencesModalComponent implements OnInit {
  @Input() personnel?: Personnel;
  @Input() mission?: Missions;
  competencesMission: Competences[] = []; // Compétences associées à la mission
  allCompetences: Competences[] = []; // Toutes les compétences disponibles
  competences: any[] = [];
  selectedCompetence?: string;
  errorMessage: string = ""; // Message d'erreur
  isLoading = true;

  constructor(public bsModalRef: BsModalRef, private competenceService: CompetencesService) {}

  ngOnInit() {
    if (this.mission?.idM) {
      this.fetchCompetencesMission();
      this.fetchAllCompetences();
    } else if (this.personnel?.idP) {
      this.fetchCompetencesPersonnel();
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

    // Vérifier si la compétence est déjà associée
    if (this.competencesMission.some(c => c.idC === this.selectedCompetence)) {
      this.errorMessage = "Cette compétence est déjà associée à cette mission.";
      return;
    }

    // Ajouter la compétence à la mission
    this.competenceService.ajouterCompetenceMission(this.mission!.idM, this.selectedCompetence).subscribe({
      next: () => {
        this.errorMessage = ""; // Effacer l'erreur en cas de succès
        this.selectedCompetence = undefined; // Réinitialiser la sélection
        
        // 🔄 Rafraîchir la liste depuis l'API pour éviter l'affichage d'une ligne vide
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
