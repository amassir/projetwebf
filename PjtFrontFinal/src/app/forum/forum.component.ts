import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-forum',
  standalone: false,
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  forums: any[] = [];
  comments: { [key: number]: any[] } = {};
  newComment: { [key: number]: string } = {}; 
  newForum = { titreF: '', contenuF: '', idU: 0 };
  currentUser: any = null;

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.getForums();
  }

  // Charger l'utilisateur connecté
  loadCurrentUser() {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.newForum.idU = this.currentUser.idU;
    }
  }

  // Récupérer tous les forums
  getForums(): void {
    this.forumService.getForums().subscribe({
      next: (data) => {
        this.forums = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des forums :', err);
      }
    });
  }

  // Récupérer les commentaires d'un forum
  getComments(forumId: number): void {
    this.forumService.getCommentsByForum(forumId).subscribe({
      next: (data) => {
        this.comments[forumId] = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commentaires :', err);
      }
    });
  }

  // Fonction pour créer un forum ou un commentaire
  save(type: 'forum' | 'comment', forumId?: number): void {
    if (!this.currentUser) {
      alert('Vous devez être connecté pour effectuer cette action.');
      return;
    }

    if (type === 'forum') {
      // Création d'un forum
      this.forumService.createForum(this.newForum).subscribe({
        next: () => {
          alert('Forum créé avec succès !');
          this.newForum = { titreF: '', contenuF: '', idU: this.currentUser.idU }; 
          this.getForums(); 
        },
        error: (err) => {
          console.error('Erreur lors de la création du forum :', err);
        }
      });
    } else if (type === 'comment' && forumId !== undefined) {
      // Création d'un commentaire
      const comment = { contenuC: this.newComment[forumId], idU: this.currentUser.idU };
      this.forumService.createComment(forumId, comment).subscribe({
        next: () => {
          alert('Commentaire ajouté avec succès !');
          this.newComment[forumId] = ''; 
          this.getComments(forumId); 
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du commentaire :', err);
        }
      });
    }
  }
}