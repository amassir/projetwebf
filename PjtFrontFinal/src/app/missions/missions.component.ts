import { Component, OnInit } from '@angular/core';
import { MissionsService } from '../services/missions.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { CompetencesModalMissionComponent } from '../competences-modal-mission/competences-modal-mission.component';
import { PersonnelModalComponent } from '../personnel-modal/personnel-modal.component';
import { PersonnelRecommendationComponent } from '../personnel-recommendation/personnel-recommendation.component';

@Component({
  selector: 'app-missions',
  standalone: false,
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  idMission = "";
  isUpdateFormActive = false;
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

  setUpdate(mission: any) {
    this.nomM = mission.nomM;
    this.descriptionM = mission.descriptionM;
    this.dateDebutM = mission.dateDebutM;
    this.dateFinM = mission.dateFinM;
    this.anomalieM = mission.anomalieM;
    this.idMission = mission.idM;
    this.isUpdateFormActive = true;
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

    if (this.idMission) {
      // Mode modification
      this.missionsService.updateMission(Number(this.idMission), missionData).subscribe({
        next: () => {
          alert("✅ Mission mise à jour avec succès !");
          this.getMissions();
          this.isUpdateFormActive = true; // Rester en mode modification
        },
        error: (err) => {
          console.error("❌ Erreur lors de la mise à jour :", err);
          alert("Erreur lors de la mise à jour.");
        } 
      });
    } else {
      // Mode ajout
      this.missionsService.addMission(missionData).subscribe({
        next: () => {
          alert("✅ Mission ajoutée avec succès !");
          this.getMissions();
          this.isUpdateFormActive = false; // Revenir en mode ajout
        },
        error: (err) => {
          console.error("❌ Erreur lors de l'ajout :", err);
          alert("Erreur lors de l'ajout.");
        }
      });
    }
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

  openPersonnelModal(mission: any) {
    const modalOptions: ModalOptions = {
      class: "modal-lg",
      initialState: { mission }
    };
    this.bsModalRef = this.modalService.show(PersonnelModalComponent, modalOptions);
  }

  modifierMission() {
    alert("Cette action est désactivée en mode démo.");
  }
  
  supprimerMission() {
    alert("Cette action est désactivée en mode démo.");
  }
}
