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

  getMissions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addMission(mission: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mission);
  }

  deleteMission(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
}