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

  isLoggedIn(): boolean {
    if (typeof sessionStorage === 'undefined') {
      return false;
    }
    return !!sessionStorage.getItem('user');
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
