import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../services/personnelService';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-lister-personnel',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './lister-personnel.component.html',
  styleUrls: ['./lister-personnel.component.css']
})
export class ListerPersonnelComponent implements OnInit {
  personnels: any[] = [];
  page: number = 1;

  constructor(private personnelService: PersonnelService) {}

  ngOnInit(): void {
    this.personnelService.getPersonnels().subscribe(data => {
      this.personnels = data;
    });
  }
}