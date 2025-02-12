import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../services/personnel.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { CompetencesModalComponent } from '../competences-modal/competences-modal.component';

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
  bsModalRef?: BsModalRef;

  prenomP = "";
  nomP = "";
  dateEmbaucheP = "";
  activiteP = "";
  statutP = "";
  idPersonnel = "";

  constructor(private personnelService: PersonnelService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.getPersonnel();
  }

  getPersonnel() {
    this.personnelService.getPersonnel().subscribe({
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
          this.getPersonnel();
        },
        error: (err) => {
          console.error("Error updating personnel:", err);
          alert("Failed to update personnel. Please try again.");
        }
      });
    } else {
      this.personnelService.addPersonnel(personnelData).subscribe({
        next: () => {
          alert("Personnel Registered Successfully");
          this.getPersonnel();
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

  openCompetencesModal(personnel: any) {
    const modalOptions: ModalOptions = {
      class: "modal-lg",
      initialState: {
        personnel: personnel
      }
    };
    this.bsModalRef = this.modalService.show(CompetencesModalComponent, modalOptions);
  }
}
