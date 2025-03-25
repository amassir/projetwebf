import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Export de l'interface Utilisateur
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
  // Définition des URL pour les requêtes HTTP
  private apiUrlRegister = 'http://localhost:3000/api/auth';
  private apiUrlLogin = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) {}
  
  // Inscription d'un utilisateur
  register(utilisateur: any): Observable<any> {
    return this.http.post<any>(this.apiUrlRegister, utilisateur);
  }

  // Connexion d'un utilisateur
  login(utilisateur: any): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, utilisateur);
  }
}