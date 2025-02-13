import { Component } from '@angular/core';
import { MissionsService } from '../services/missions.service';

@Component({
  selector: 'app-missions-form',
  standalone: false,
  templateUrl: './missions-form.component.html',
  styleUrls: ['./missions-form.component.css']
})
export class MissionsFormComponent {
  nomM = "";
  descriptionM = "";
  dateDebutM = "";
  dateFinM = "";
  anomalieM = "";

  constructor(private missionsService: MissionsService) {}

  save() {
    const missionData = {
      nomM: this.nomM,
      descriptionM: this.descriptionM,
      dateDebutM: this.dateDebutM,
      dateFinM: this.dateFinM,
      statutM: "en préparation",
      anomalieM: this.anomalieM
    };

    this.missionsService.addMission(missionData).subscribe({
      next: () => {
        alert("Mission Registered Successfully");
      },
      error: (err) => {
        console.error("Error registering mission:", err);
        alert("Failed to register mission. Please try again.");
      }
    });
  }
}