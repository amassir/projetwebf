import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Export de l'interface Competences
export interface Competences {
  idC: string;
  nomCfr: string;
  nomCen: string;
  aptitude: 'novice' | 'confirmé';
}

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {
  // Définition des URL pour les requêtes HTTP
  private apiUrlPersonnel = 'http://localhost:3000/api/personnel'; 
  private apiUrlMissions = 'http://localhost:3000/api/missions'; 
  private apiUrlCompetences = 'http://localhost:3000/api/competences'; 

  constructor(private http: HttpClient) {}

  // Récupérer toutes les compétences disponibles
  getCompetences(): Observable<any> {
    return this.http.get<any>(this.apiUrlCompetences);
  }

  // Ajouter une nouvelle compétence (hors mission)
  addCompetence(competence: any): Observable<any> {
    return this.http.post<any>(this.apiUrlCompetences, competence);
  }

  // Supprimer une compétence (hors mission)
  deleteCompetence(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlCompetences}/${id}`);
  }

  // Récupérer les compétences d'un personnel
  getCompetencesByPersonnel(idP: number): Observable<Competences[]> {
    return this.http.get<Competences[]>(`${this.apiUrlPersonnel}/${idP}/competences`);
  }

  // Associer une compétence à un personnel
  ajouterCompetencePersonnel(idP: number, idC: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlPersonnel}/${idP}/competences`, { idC });
  } 

  // Dissocier une compétence d'un personnel
  dissocierCompetencePersonnel(idP: number, idC: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlPersonnel}/${idP}/competences/${idC}`);
  }

  // Associer une compétence à une mission (avec vérification)
  ajouterCompetenceMission(idM: number, idC: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlMissions}/${idM}/competences`, { idC });
  }

  // Récupérer les compétences associées à une mission
  getCompetencesByMission(idM: number): Observable<Competences[]> {
    return this.http.get<Competences[]>(`${this.apiUrlMissions}/${idM}/competences`);
  }

  // Dissocier une compétence d'une mission
  dissocierCompetenceMission(idM: number, idC: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlMissions}/${idM}/competences/${idC}`);
  }
}
