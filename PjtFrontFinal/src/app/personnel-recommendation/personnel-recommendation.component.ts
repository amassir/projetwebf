import { Component, OnInit } from '@angular/core';
import { MissionsService } from '../services/missions.service';

@Component({
  selector: 'app-personnel-recommendation',
  standalone: false,
  templateUrl: './personnel-recommendation.component.html',
  styleUrls: ['./personnel-recommendation.component.css']
})
export class PersonnelRecommendationComponent implements OnInit {
  recommendedPersonnel: any[] = [];
  isLoading = false;
  selectedMissionId: number | null = null;
  errorMessage: string | null = null; // Ajout d'un message d'erreur

  constructor(private missionsService: MissionsService) {}

  ngOnInit(): void {}

  getRecommendations() {
    if (!this.selectedMissionId) {
      alert("Veuillez sélectionner une mission");
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = null; // Réinitialiser le message d'erreur
    
    this.missionsService.getRecommendedPersonnel(this.selectedMissionId).subscribe({
      next: (resultData) => {
        this.isLoading = false;
        console.log("Données reçues :", resultData); // Debug: affiche les données dans la console
        
        if (resultData.length === 0) {
          this.errorMessage = "Aucune recommandation trouvée pour cette mission.";
        }

        this.recommendedPersonnel = resultData;
      },
      error: (err) => {
        this.isLoading = false;
        console.error("Erreur lors du chargement des recommandations:", err);
        this.errorMessage = "Impossible de récupérer les recommandations. Vérifiez l'ID de la mission.";
      }
    });
  }  
}
