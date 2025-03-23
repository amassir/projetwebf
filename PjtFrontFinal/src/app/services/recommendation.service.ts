import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelRecommendationService {
  private apiUrl = 'http://localhost:3000/api'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  getMissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/missions`);
  }

  getRecommendedPersonnel(missionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/missions/${missionId}/recommendations`);
  }

  assignPersonnel(missionId: number, personnelId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/missions/${missionId}/assign`, { personnelId });
  }
}
