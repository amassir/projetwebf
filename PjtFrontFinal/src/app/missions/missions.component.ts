import { Component, OnInit } from '@angular/core';
import { MissionsService } from '../services/missions.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { CompetencesModalMissionComponent } from '../competences-modal-mission/competences-modal-mission.component';
import { AddCompetencesModalComponent } from '../add-competences-modal/add-competences-modal.component';
import { AddPersonnelModalComponent } from '../add-personnel-modal/add-personnel-modal.component';
import { PersonnelModalComponent } from '../personnel-modal/personnel-modal.component';
import { PersonnelRecommendationComponent } from '../personnel-recommendation/personnel-recommendation.component';

@Component({
  selector: 'app-missions',
  standalone: false,
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  missionsArray: any[] = [];
  isResultLoaded = false;
  bsModalRef?: BsModalRef;

  nomM = "";
  descriptionM = "";
  dateDebutM = "";
  dateFinM = "";
  anomalieM = "";

  constructor(private missionsService: MissionsService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.getMissions();
  }

  getMissions() {
    this.missionsService.getMissions().subscribe({
      next: (resultData) => {
        this.isResultLoaded = true;
        this.missionsArray = resultData;
      },
      error: (err) => {
        console.error("❌ Erreur lors de la récupération des missions :", err);
        alert("Erreur de récupération des missions.");
      }
    });
  }

  save() {
    const missionData = {
      nomM: this.nomM,
      descriptionM: this.descriptionM,
      dateDebutM: this.dateDebutM,
      dateFinM: this.dateFinM,
      statutM: 'en préparation',
      anomalieM: this.anomalieM
    };

    this.missionsService.addMission(missionData).subscribe({
      next: () => {
        alert("✅ Mission ajoutée avec succès !");
        this.getMissions();
      },
      error: (err) => {
        console.error("❌ Erreur lors de l'ajout de la mission :", err);
        alert("Erreur lors de l'ajout de la mission.");
      }
    });
  }

  setDelete(mission: any) {
    if (!mission.idM) {
      alert("⚠️ Mission invalide !");
      return;
    }

    this.missionsService.deleteMission(mission.idM).subscribe({
      next: () => {
        alert("🗑️ Mission supprimée !");
        this.missionsArray = this.missionsArray.filter(m => m.idM !== mission.idM);
      },
      error: (err) => {
        console.error("❌ Erreur lors de la suppression :", err);
        alert("Erreur lors de la suppression de la mission.");
      }
    });
  }

  openPersonnelRecommendationModal(mission: any) {
    const modalOptions: ModalOptions = {
      class: "modal-lg",
      initialState: { mission }
    };
    this.bsModalRef = this.modalService.show(PersonnelRecommendationComponent, modalOptions);
  }

  openCompetencesModal(mission: any) {
    const modalOptions: ModalOptions = {
      class: "modal-lg",
      initialState: { mission }
    };
    this.bsModalRef = this.modalService.show(CompetencesModalMissionComponent, modalOptions);
  }

  openAddCompetencesModal(mission: any) {
    const modalOptions: ModalOptions = {
      class: "modal-lg",
      initialState: { mission }
    };
    this.bsModalRef = this.modalService.show(AddCompetencesModalComponent, modalOptions);
  }

  openAddPersonnelModal(mission: any) {
    const modalOptions: ModalOptions = {
      class: "modal-lg",
      initialState: {
        mission,
        competences: mission.Competences
      }
    };
    this.bsModalRef = this.modalService.show(AddPersonnelModalComponent, modalOptions);
  }

  openPersonnelModal(mission: any) {
    const modalOptions: ModalOptions = {
      class: "modal-lg",
      initialState: { mission }
    };
    this.bsModalRef = this.modalService.show(PersonnelModalComponent, modalOptions);
  }
}
