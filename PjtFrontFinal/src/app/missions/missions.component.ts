import { Component, OnInit } from '@angular/core';
import { MissionsService } from '../services/missions.service';

@Component({
  selector: 'app-missions',
  standalone: false,
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  MissionsArray: any[] = [];
  isResultloaded = false;

  constructor(private missionsService: MissionsService) {}

  ngOnInit(): void {
    this.getMissions();
  }

  getMissions() {
    this.missionsService.getMissions().subscribe({
      next: (resultData) => {
        this.isResultloaded = true;
        console.log(resultData);
        this.MissionsArray = resultData;
      },
      error: (err) => {
        console.error("Error fetching missions:", err);
        alert("Failed to fetch missions. Please try again.");
      }
    });
  }

  setDelete(mission: any) {
    if (!mission.idM) {
      alert("Invalid mission ID");
      return;
    }

    this.missionsService.deleteMission(mission.idM).subscribe({
      next: () => {
        alert("Mission Deleted Successfully");
        this.MissionsArray = this.MissionsArray.filter(m => m.idM !== mission.idM);
      },
      error: (err) => {
        console.error("Error deleting mission:", err);
        alert("Failed to delete mission. Please try again.");
      }
    });
  }
}