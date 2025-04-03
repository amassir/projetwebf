import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private router: Router) {}

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    // Vérifie si l'environnement est un navigateur avant d'utiliser sessionStorage
    if (typeof window === 'undefined') {
      return false;  // Si nous sommes sur le serveur, l'utilisateur n'est pas connecté
    }
    return !!sessionStorage.getItem('user'); 
  }

  // Vérifie si l'utilisateur est sur la page de login
  isOnLoginPage(): boolean {
    return this.router.url === '/login';
  }
  
  isOnRegisterPage(): boolean {
    return this.router.url === '/register';
  }

  // Fonction appelée lors du clic sur le bouton "Connexion"
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Déconnexion de l'utilisateur
  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
