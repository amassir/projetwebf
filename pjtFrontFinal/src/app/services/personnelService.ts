import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private apiUrl = 'http://localhost:3000/api/personnel'; 

  constructor(private http: HttpClient) { }

  getPersonnels(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addPersonnel(personnel: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, personnel);
  }

  deletePersonnel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}