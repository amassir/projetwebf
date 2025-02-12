import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Competences {
  idC: number;
  nomCfr: string;
  nomCen: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {
  private apiUrl = 'http://localhost:3000/api/competences'; 

  constructor(private http: HttpClient) { }

  getCompetences(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addCompetence(competence: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, competence);
  }

  deleteCompetence(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getCompetencesByPersonnel(idP: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/personnel/${idP}`);
  }
  
}