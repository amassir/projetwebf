import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Export de l'interface Missions
export interface Missions {
  idM: number;
  nomM: string;
  descriptionM: string;
  dateDebutM: Date;
  dateFinM: Date;
  statutM: 'en préparation' | 'planifiée' | 'en cours' | 'terminée' | string; 
  anomalieM: string;
}

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
  // Définition de l'URL pour les requêtes HTTP
  private apiUrl = `${environment.url}/api/missions`;


  constructor(private http: HttpClient) { }

  // Récupérer toutes les missions disponibles
  getMissions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer une mission par son identifiant
  getMissionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une nouvelle mission
  addMission(mission: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mission);
  }

  // Mettre à jour une mission
  updateMission(id: number, mission: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, mission);
  }

  // Supprimer une mission
  deleteMission(id: number): Observable<void> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Ajouter les compétences associées à une mission
  addCompetenceToMission(competenceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${competenceData.idM}/competences`, competenceData);
  }

  // Ajouter les personnels associés à une mission
  addPersonnelToMission(personnelData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${personnelData.idM}/personnels`, personnelData);
  }

  // Mettre à jour le statut d'une mission
  updateMissionStatut(idM: number): Observable<Missions> {
    return this.http.put<Missions>(`${this.apiUrl}/${idM}`, {});
  }


  // Récupérer les recommandations de personnel
  getRecommendedPersonnel(missionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${missionId}/recommendations`);
  }
}
