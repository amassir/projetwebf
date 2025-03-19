import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  
  private apiUrl1 = "http://localhost:3000/api/personnel";
  private apiUrl2 = "http://localhost:3000/api/missions";

  constructor(private http: HttpClient) {}

  getPersonnel(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl1);
  }

  addPersonnel(personnel: any): Observable<any> {
    return this.http.post<any>(this.apiUrl1, personnel);
  }

  updatePersonnel(id: string, personnel: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl1}/${id}`, personnel);
  }

  deletePersonnel(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl1}/${id}`);
  }

  getPersonnelByMission(idM: number): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.apiUrl2}/${idM}/personnels`);
  }

  getPersonnelById(id: string): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.apiUrl1}/${id}`);
  }

  validatePersonnelRecommendations(missionId: number, recommendedPersonnels: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2}/${missionId}/validate`, recommendedPersonnels);
  }

  getPersonnelByCompetence(idC: string): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.apiUrl1}/competence/${idC}`);
  }
}
