import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    if (typeof sessionStorage === 'undefined') {
      return false;
    }
    return !!sessionStorage.getItem('user');
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}