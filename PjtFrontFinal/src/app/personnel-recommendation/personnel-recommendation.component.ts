import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PersonnelService } from '../services/personnel.service';
import { Missions } from '../services/missions.service';

@Component({
  selector: 'app-personnel-recommendation',
  standalone: false,
  templateUrl: './personnel-recommendation.component.html',
  styleUrls: ['./personnel-recommendation.component.css']
})
export class PersonnelRecommendationComponent implements OnInit {
  @Input() mission!: Missions;
  personnels: any[] = [];
  selectedPersonnels: any[] = [];
  recommendedPersonnels: any[] = [];
  isLoading = true;

  constructor(public bsModalRef: BsModalRef, private personnelService: PersonnelService) {}

  ngOnInit() {
    this.fetchPersonnels();
  }

  fetchPersonnels() {
    this.personnelService.getPersonnelByMission(this.mission.idM).subscribe({
      next: (data) => {
        this.personnels = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des personnels de la mission :', err);
        this.isLoading = false;
      }
    });
  }

  toggleSelection(personnel: any) {
    const index = this.selectedPersonnels.indexOf(personnel);
    if (index > -1) {
      this.selectedPersonnels.splice(index, 1);
    } else {
      this.selectedPersonnels.push(personnel);
    }
  }

  assignPersonnels() {
    // Implémentez la logique pour assigner les personnels sélectionnés à la mission
  }

  recommendPersonnel(personnel: any) {
    personnel.recommended = !personnel.recommended;
    if (personnel.recommended) {
      this.recommendedPersonnels.push(personnel);
    } else {
      this.recommendedPersonnels = this.recommendedPersonnels.filter(p => p.idP !== personnel.idP);
    }
  }

  validateRecommendations() {
    this.personnelService.validatePersonnelRecommendations(this.mission.idM, this.recommendedPersonnels).subscribe({
      next: () => {
        alert('Recommandations validées avec succès');
        this.bsModalRef.hide();
      },
      error: (err: any) => {
        console.error('Erreur lors de la validation des recommandations :', err);
        alert('Erreur lors de la validation des recommandations. Veuillez réessayer.');
      }
    });
  }
}