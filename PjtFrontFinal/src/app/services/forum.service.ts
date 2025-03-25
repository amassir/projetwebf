import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:3000/api/forums';

  constructor(private http: HttpClient) {}

  // Récupérer tous les forums
  getForums(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Créer un nouveau forum
  createForum(forum: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, forum);
  }

  // Récupérer les commentaires d'un forum
  getCommentsByForum(forumId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${forumId}/comments`);
  }

  createComment(forumId: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${forumId}/comments`, comment);
  }
}