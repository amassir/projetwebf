import { Component, OnInit } from '@angular/core';
import { MissionsService, Missions } from '../services/missions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MissionsComponent implements OnInit {
  missions: Missions[] = [];

  constructor(private missionService: MissionsService) {}

  ngOnInit(): void {
    this.missionService.getMissions().subscribe(data => {
      this.missions = data;
    });
  }
}