import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiPersonnel = 'http://localhost:3000/api/personnel'; 
  private apiMissions = 'http://localhost:3000/api/missions'; 
  private apiCompetences = 'http://localhost:3000/api/competences'; 

  constructor(private http: HttpClient) {}

  // Récupérer toutes les compétences disponibles
  getCompetences(): Observable<any> {
    return this.http.get<any>(this.apiCompetences);
  }

  // Ajouter une nouvelle compétence (hors mission)
  addCompetence(competence: any): Observable<any> {
    return this.http.post<any>(this.apiCompetences, competence);
  }

  // Supprimer une compétence (hors mission)
  deleteCompetence(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiCompetences}/${id}`);
  }

  // Récupérer les compétences d'un personnel
  getCompetencesByPersonnel(idP: number): Observable<Competences[]> {
    return this.http.get<Competences[]>(`${this.apiPersonnel}/${idP}/competences`);
  }

  // Associer une compétence à une mission (avec vérification)
  ajouterCompetenceMission(idM: number, idC: string): Observable<any> {
    return this.http.post<any>(`${this.apiMissions}/${idM}/competences`, { idC });
  }

  // Récupérer les compétences associées à une mission
  getCompetencesByMission(idM: number): Observable<Competences[]> {
    return this.http.get<Competences[]>(`${this.apiMissions}/${idM}/competences`);
  }

  // Dissocier une compétence d'une mission
  dissocierCompetenceMission(idM: number, idC: string): Observable<any> {
    return this.http.delete<any>(`${this.apiMissions}/${idM}/competences/${idC}`);
  }
}
