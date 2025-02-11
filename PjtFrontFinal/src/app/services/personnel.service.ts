import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private readonly apiUrl = "http://localhost:3000/api/personnel";

  constructor(private http: HttpClient) {}

  getAllPersonnel(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  registerPersonnel(personnel: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, personnel);
  }

  updatePersonnel(id: string, personnel: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, personnel);
  }

  deletePersonnel(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
