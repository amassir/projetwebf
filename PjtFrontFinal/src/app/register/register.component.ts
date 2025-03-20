import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nomU = "";
  prenomU = ""; 
  emailU =  "";
  mdpU = "";

  constructor(private authService: AuthService, private router: Router) {}

  save(){
    const userData = {
      nomU: this.nomU,
      prenomU: this.prenomU,
      emailU: this.emailU,
      mdpU: this.mdpU
    };

    this.authService.register(userData).subscribe({
      next: () => {
        alert('Inscription réussie !');
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Erreur lors de l\'inscription.',err)
    });
  }

}