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
    const user = sessionStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }
}
