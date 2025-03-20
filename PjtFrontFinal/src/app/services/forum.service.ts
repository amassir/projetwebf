import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Forum {
    idF: number;
    titreF: string;
    contenuF: string;
    idU: number; 
  }

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'http://localhost:3000/api/forum';

  constructor(private http: HttpClient) {}

  getDiscussions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addDiscussion(discussion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, discussion);
  }

  getDiscussionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addCommentaire(commentaire: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${commentaire.idF}/commentaire`, commentaire);
  }

  voteDiscussion(id: number, voteType: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/vote/${voteType}`, {});
  }
}