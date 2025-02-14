import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PersonnelService } from '../services/personnel.service';
import { Missions } from '../services/missions.service';

@Component({
  selector: 'app-personnel-modal',
  standalone: false,
  templateUrl: './personnel-modal.component.html',
  styleUrls: ['./personnel-modal.component.css']
})
export class PersonnelModalComponent implements OnInit {
  @Input() mission!: Missions;
  personnels: any[] = [];
  isLoading = true;

  constructor(public bsModalRef: BsModalRef, private personnelService: PersonnelService) {}

  ngOnInit() {
    this.fetchPersonnels();
  }

  fetchPersonnels() {
    this.personnelService.getPersonnelByMission(this.mission.idM).subscribe({
      next: (data) => {
        this.personnels = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des personnels de la mission :', err);
        this.isLoading = false;
      }
    });
  }
}