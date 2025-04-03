import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Export de l'interface Forum
export interface Forum {
    idF: number;
    titreF: string;
    contenuF: string;
    votesPositifs: number;
    votesNegatifs: number;
    idU: number; 
  }

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  // Définition de l'URL pour les requêtes HTTP
  private apiUrl = `${environment.url}/api/forums`;

  constructor(private http: HttpClient) {}

  // Récupérer tous les forums disponibles
  getForums(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajouter un nouveau sujet de forum
  createForum(forum: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, forum);
  }

  // Récupérer les commentaires d'un forum
  getCommentsByForum(forumId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${forumId}/comments`);
  }

  // Ajouter un nouveau commentaire
  createComment(forumId: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${forumId}/comments`, comment);
  }
}