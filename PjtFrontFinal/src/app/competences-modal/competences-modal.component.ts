import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CompetencesService } from '../services/competences.service';

@Component({
  selector: 'app-competences-modal',
  standalone: false,
  templateUrl: './competences-modal.component.html',
  styleUrl: './competences-modal.component.css'
})
export class CompetencesModalComponent implements OnInit {
  @Input() personnel: any;
  competences: any[] = [];
  isLoading = true;

  constructor(public bsModalRef: BsModalRef, private competenceService: CompetencesService) {}
  
  ngOnInit() {
    if (this.personnel?.idP) {
      this.fetchCompetences();
    }
  }

  fetchCompetences() {
    this.competenceService.getCompetencesByPersonnel(this.personnel.idP).subscribe({
      next: (data) => {
        this.competences = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des compétences :', err);
        this.isLoading = false;
      }
    });
  }

}
