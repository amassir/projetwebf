import { Component } from '@angular/core';
import { PersonnelService } from '../services/personnelService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-personnel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ajouter-personnel.component.html',
  styleUrls: ['./ajouter-personnel.component.css']
})
export class AjouterPersonnelComponent {
  personnel = {
    prenomP: '',
    nomP: '',
    dateEmbaucheP: '',
    activiteP: '',
    statutP: ''
  };

  constructor(private personnelService: PersonnelService, private router: Router) {}

  addPersonnel(): void {
    this.personnelService.addPersonnel(this.personnel).subscribe(() => {
      this.router.navigate(['/lister-personnel']);
    });
  }
}