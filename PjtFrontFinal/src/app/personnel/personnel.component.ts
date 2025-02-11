import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../services/personnel.service';


@Component({
  selector: 'app-personnel',
  standalone: false,
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  PersonnelArray: any[] = [];
  isResultloaded = false;
  isUpdateFormActive = false;

  prenomP = "";
  nomP = "";
  dateEmbaucheP = "";
  activiteP = "";
  statutP = "";
  idPersonnel = "";

  constructor(private personnelService: PersonnelService) {}

  ngOnInit(): void {
    this.getAllPersonnel();
  }

  getAllPersonnel() {
    this.personnelService.getAllPersonnel().subscribe({
      next: (resultData) => {
        this.isResultloaded = true;
        console.log(resultData);
        this.PersonnelArray = resultData;
      },
      error: (err) => {
        console.error("Error fetching personnel:", err);
        alert("Failed to fetch personnel. Please try again.");
      }
    });
  }

  save() {
    const personnelData = {
      prenomP: this.prenomP,
      nomP: this.nomP,
      dateEmbaucheP: this.dateEmbaucheP,
      activiteP: this.activiteP,
      statutP: this.statutP
    };

    if (this.idPersonnel) {
      this.personnelService.updatePersonnel(this.idPersonnel, personnelData).subscribe({
        next: () => {
          alert("Personnel Updated Successfully");
          this.getAllPersonnel();
        },
        error: (err) => {
          console.error("Error updating personnel:", err);
          alert("Failed to update personnel. Please try again.");
        }
      });
    } else {
      this.personnelService.registerPersonnel(personnelData).subscribe({
        next: () => {
          alert("Personnel Registered Successfully");
          this.getAllPersonnel();
        },
        error: (err) => {
          console.error("Error registering personnel:", err);
          alert("Failed to register personnel. Please try again.");
        }
      });
    }
  }

  setUpdate(personnel: any) {
    this.prenomP = personnel.prenomP;
    this.nomP = personnel.nomP;
    this.dateEmbaucheP = personnel.dateEmbaucheP;
    this.activiteP = personnel.activiteP;
    this.statutP = personnel.statutP;
    this.idPersonnel = personnel.idP;
    this.isUpdateFormActive = true;
  }

  setDelete(personnel: any) {
    if (!personnel.idP) {
      alert("Invalid personnel ID");
      return;
    }

    this.personnelService.deletePersonnel(personnel.idP).subscribe({
      next: () => {
        alert("Personnel Deleted Successfully");
        this.PersonnelArray = this.PersonnelArray.filter(per => per.idP !== personnel.idP);
      },
      error: (err) => {
        console.error("Error deleting personnel:", err);
        alert("Failed to delete personnel. Please try again.");
      }
    });
  }
}
