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
  private apiUrl1 = 'http://localhost:3000/api/personnel'; 
  private apiUrl2 = 'http://localhost:3000/api/missions'; 
  private apiUrl3 = 'http://localhost:3000/api/competences'; 

  constructor(private http: HttpClient) {}
  


  getCompetences(): Observable<any> {
    return this.http.get<any>(this.apiUrl3);
  }

  addCompetence(competence: any): Observable<any> {
    return this.http.post<any>(this.apiUrl3, competence);
  }

  deleteCompetence(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl3}/${id}`);
  }

  getCompetencesByPersonnel(idP: number): Observable<Competences[]> {
    return this.http.get<Competences[]>(`${this.apiUrl1}/${idP}/competences`);
  }

  getCompetencesByMission(idM: number): Observable<any[]> {
    return this.http.get<Competences[]>(`${this.apiUrl2}/${idM}/competences`);
  }
}
