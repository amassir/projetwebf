import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentUser: any = null; 

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  // Charger l'utilisateur connecté depuis sessionStorage
  loadCurrentUser(): void {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      // Le code qui accède à sessionStorage
      const currentUser = sessionStorage.getItem('user');
      if (currentUser) {
        this.currentUser = JSON.parse(currentUser);
      }
    } else {
      // Gérer l'absence de sessionStorage (par exemple, afficher un message ou rediriger)
      console.log('sessionStorage non disponible');
    }
  }
}
