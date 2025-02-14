import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CompetencesService } from '../services/competences.service';
import { MissionsService } from '../services/missions.service';
import { Missions } from '../services/missions.service';

@Component({
  selector: 'app-add-competences-modal',
  standalone: false,
  templateUrl: './add-competences-modal.component.html',
  styleUrls: ['./add-competences-modal.component.css']
})
export class AddCompetencesModalComponent implements OnInit {
  @Input() mission!: Missions;
  competences: any[] = [];
  selectedCompetence: string = '';

  constructor(public bsModalRef: BsModalRef, private competencesService: CompetencesService, private missionsService: MissionsService) {}

  ngOnInit() {
    this.fetchCompetences();
  }

  fetchCompetences() {
    this.competencesService.getCompetences().subscribe({
      next: (data) => {
        this.competences = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des compétences :', err);
      }
    });
  }

  addCompetence() {
    const competenceData = {
      idM: this.mission.idM,
      idC: this.selectedCompetence,
      statutC: 'non satisfait'
    };

    this.missionsService.addCompetenceToMission(competenceData).subscribe({
      next: () => {
        alert('Compétence ajoutée avec succès');
        this.bsModalRef.hide();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la compétence :', err);
        alert('Erreur lors de l\'ajout de la compétence. Veuillez réessayer.');
      }
    });
  }
}