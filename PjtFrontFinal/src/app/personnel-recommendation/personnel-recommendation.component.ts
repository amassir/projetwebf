import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PersonnelService } from '../services/personnel.service';
import { MissionsService, Missions } from '../services/missions.service';

@Component({
  selector: 'app-personnel-recommendation',
  standalone: false,
  templateUrl: './personnel-recommendation.component.html',
  styleUrls: ['./personnel-recommendation.component.css']
})
export class PersonnelRecommendationComponent implements OnInit {
  @Input() mission!: Missions;
  recommendedPersonnel: any[] = [];
  isLoading = true;
  errorMessage: string = '';

  constructor(
    public bsModalRef: BsModalRef,
    private personnelService: PersonnelService,
    private missionsService: MissionsService
  ) {}

  ngOnInit() {
    if (!this.mission) {
      this.errorMessage = "🚨 Erreur: mission non définie !";
      return;
    }
    this.getRecommendations();
  }

  getRecommendations() {
    this.missionsService.getRecommendedPersonnel(this.mission.idM).subscribe({
      next: (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          this.recommendedPersonnel = data;
        } else {
          this.errorMessage = data?.message || "Aucune recommandation disponible.";
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error("Erreur lors du chargement :", err);
        this.errorMessage = "Impossible de récupérer les recommandations.";
        this.isLoading = false;
      }
    });
  }

  assignPersonnel(personnel: any) {
    const personnelData = { idM: this.mission.idM, idP: personnel.idP, dateDebutE: new Date() };
  
    this.missionsService.addPersonnelToMission(personnelData).subscribe({
      next: () => {
        personnel.assigned = true; // Met à jour l'état de l'élément dans recommendedPersonnel
        this.recommendedPersonnel = this.recommendedPersonnel.map(p =>
          p.idP === personnel.idP ? { ...p, assigned: true } : p
        );
      },
      error: (err: any) => {
        console.error("Erreur lors de l'assignation :", err);
        this.errorMessage = err.error.message || "Impossible d'assigner ce personnel.";
      }
    });
  }
  
}
