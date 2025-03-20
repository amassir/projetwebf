import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailU = ""; 
  mdpU = "";

  constructor(private authService: AuthService, private router: Router) {}

  save(){
    const userData = {
      emailU: this.emailU,
      mdpU: this.mdpU
    };

    this.authService.login(userData).subscribe({
      next: (response) => {
        sessionStorage.setItem('user', JSON.stringify(response.user));
        alert('Connexion réussie !');
        this.router.navigate(['/home']);
      },
      error: (err) => console.error('Erreur lors de la connexion.',err)
    });
  }
}