import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Missions {
  idM: number;
  nomM: string;
  descriptionM: string;
  dateDebutM: Date;
  dateFinM: Date;
  statutM: 'en préparation' | 'planifiée' | 'en cours' | 'terminée';
  anomalieM: string;
}

@Injectable({
  providedIn: 'root'
})

export class MissionsService {
  private apiUrl = 'http://localhost:3000/api/missions'; 

  constructor(private http: HttpClient) { }

  getMissions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMissionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addMission(mission: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mission);
  }

  updateMission(id: number, mission: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, mission);
  }

  deleteMission(id: number): Observable<void> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  addCompetenceToMission(competenceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${competenceData.idM}/competences`, competenceData);
  }

  addPersonnelToMission(personnelData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${personnelData.idM}/personnels`, personnelData);
  }
}