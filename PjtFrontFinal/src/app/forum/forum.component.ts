import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-forum',
  standalone: false,
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  discussions: any[] = [];
  titreF = '';
  contenuF = '';
  newComment = '';

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.getDiscussions();
  }

  getDiscussions() {
    this.forumService.getDiscussions().subscribe({
      next: (data) => this.discussions = data,
      error: (err) => console.error('Erreur lors de la récupération des discussions', err)
    });
  }

  addDiscussion() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (!user || !user.idU) {
      alert('Utilisateur non connecté. Veuillez vous reconnecter.');
      return;
    }
  
    const newDiscussion = { titreF: this.titreF, contenuF: this.contenuF, idU: user.idU }; 
    this.forumService.addDiscussion(newDiscussion).subscribe({
      next: () => {
        alert('Discussion ajoutée avec succès !');
        this.getDiscussions();
        this.titreF = '';
        this.contenuF = '';
      },
      error: (err) => console.error('Erreur lors de l\'ajout de la discussion', err)
    });
  }

  vote(idF: number, voteType: string) {
    this.forumService.voteDiscussion(idF, voteType).subscribe({
      next: () => this.getDiscussions(),
      error: (err) => console.error('Erreur lors du vote', err)
    });
  }

  addComment(idF: number) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}'); 
    if (!user || !user.idU) {
      alert('Utilisateur non connecté. Veuillez vous reconnecter.');
      return;
    }
  
    const commentaire = { contenuC: this.newComment, idF, idU: user.idU };
    this.forumService.addCommentaire(commentaire).subscribe({
      next: () => {
        alert('Commentaire ajouté avec succès !'); 
        this.newComment = ''; 
        this.getDiscussions(); 
      },
      error: (err) => console.error('Erreur lors de l\'ajout du commentaire', err)
    });
  }
}