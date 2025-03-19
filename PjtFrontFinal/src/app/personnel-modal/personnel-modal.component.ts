import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PersonnelService, Personnel } from '../services/personnel.service';
import { Missions } from '../services/missions.service';

@Component({
  selector: 'app-personnel-modal',
  standalone: false,
  templateUrl: './personnel-modal.component.html',
  styleUrls: ['./personnel-modal.component.css']
})
export class PersonnelModalComponent implements OnInit {
  @Input() mission?: Missions; // La mission concernée
  personnels: Personnel[] = []; // Liste des personnels affectés
  isLoading = true; // Indicateur de chargement

  constructor(public bsModalRef: BsModalRef, private personnelService: PersonnelService) {}

  ngOnInit() {
    console.log("Mission reçue dans le modal :", this.mission);
    if (this.mission?.idM) {
      this.fetchPersonnelsMission();
    }
  }

  fetchPersonnelsMission() {
    this.personnelService.getPersonnelByMission(this.mission!.idM).subscribe({
      next: (data: any[]) => {
        // Adapter les données pour correspondre à l'interface attendue
        this.personnels = data.map(p => ({
          idP: p.idP,
          prenomP: p.prenom, // Renommer pour correspondre à l'interface
          nomP: p.nom,
          dateEmbaucheP: p.dateEmbaucheP || '',
          activiteP: p.activiteP || '',
          statutP: p.statutP || ''
        }));
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des personnels de la mission :', err);
        this.isLoading = false;
      }
    });
  }  
  
}
