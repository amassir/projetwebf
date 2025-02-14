import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PersonnelService } from '../services/personnel.service';
import { MissionsService } from '../services/missions.service';
import { Missions } from '../services/missions.service';

@Component({
  selector: 'app-add-personnel-modal',
  standalone: false,
  templateUrl: './add-personnel-modal.component.html',
  styleUrls: ['./add-personnel-modal.component.css']
})
export class AddPersonnelModalComponent implements OnInit {
  @Input() mission!: Missions;
  personnels: any[] = [];
  selectedPersonnel: string = '';

  constructor(public bsModalRef: BsModalRef, private personnelService: PersonnelService, private missionsService: MissionsService) {}

  ngOnInit() {
    this.fetchPersonnels();
  }

  fetchPersonnels() {
    this.personnelService.getPersonnel().subscribe({
      next: (data) => {
        this.personnels = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des personnels :', err);
      }
    });
  }

  addPersonnel() {
    const personnelData = {
      idM: this.mission.idM,
      idP: this.selectedPersonnel,
      dateDebutE: new Date()
    };

    this.missionsService.addPersonnelToMission(personnelData).subscribe({
      next: () => {
        alert('Personnel ajouté avec succès');
        this.bsModalRef.hide();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du personnel :', err);
        alert('Erreur lors de l\'ajout du personnel. Veuillez réessayer.');
      }
    });
  }
}