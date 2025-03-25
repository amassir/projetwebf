import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Export de l'interface Personnel
export interface Personnel {
  idP: number;
  prenomP: string;
  nomP: string;
  dateEmbaucheP: string;
  activiteP: string;
  statutP: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  // Définition des URL pour les requêtes HTTP
  private apiUrlPersonnel = "http://localhost:3000/api/personnel";
  private apiUrlMissions = "http://localhost:3000/api/missions";

  constructor(private http: HttpClient) {}

  // Récupérer tous les personnels disponibles
  getPersonnel(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlPersonnel);
  }

  // Ajouter un nouveau personnel
  addPersonnel(personnel: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPersonnel, personnel);
  }

  // Mettre à jour un personnel
  updatePersonnel(id: string, personnel: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlPersonnel}/${id}`, personnel);
  }

  // Supprimer un personnel
  deletePersonnel(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlPersonnel}/${id}`);
  }

  // Récupérer les personnels associés à une mission
  getPersonnelByMission(idM: number): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.apiUrlMissions}/${idM}/personnels`);
  }

  // Récupérer un personnel par son identifiant
  getPersonnelById(id: string): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.apiUrlPersonnel}/${id}`);
  }

  // Valider les recommandations de personnels
  validatePersonnelRecommendations(missionId: number, recommendedPersonnels: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrlMissions}/${missionId}/validate`, recommendedPersonnels);
  }

  // Récupérer les personnels associés à une compétence
  getPersonnelByCompetence(idC: string): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.apiUrlPersonnel}/competence/${idC}`);
  }

  // Supprimer un personnel d'une mission
  supprimerPersonnelDeMission(idM: number, idP: number): Observable<any> {
    return this.http.delete(`${this.apiUrlMissions}/${idM}/personnels/${idP}`);
  }
  
}
