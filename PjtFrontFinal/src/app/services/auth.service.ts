import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Utilisateur {
  idU: number;
  prenomU: string;
  nomU: string;
  emailU: string;
  mdpU: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl1 = 'http://localhost:3000/api/auth';
  private apiUrl2 = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) {}

  register(utilisateur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl1, utilisateur);
  }

  login(utilisateur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl2, utilisateur);
  }
}