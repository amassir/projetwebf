import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  standalone: false,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  EmployeeArray: any[] = [];
  isResultloaded = false;
  isUpdateFormActive = false;

  prenomP: string = "";
  nomP: string = "";
  dateEmbaucheP: string = "";
  activiteP: string = "";
  statutP: string = "";
  idEmploye: string = "";

  private apiUrl = "http://localhost:3000/api/personnel";

  constructor(private http: HttpClient) {
    this.getAllEmployees();
  }

  ngOnInit(): void {
  }

  getAllEmployees() {
    this.http.get(this.apiUrl)
      .subscribe({
        next: (resultData: any) => {
          this.isResultloaded = true;
          console.log(resultData);
          this.EmployeeArray = resultData;
        },
        error: (err) => {
          console.error("Error fetching employees:", err);
          alert("Failed to fetch employees. Please try again.");
        }
      });
  }

  register() {
    let bodyData = {
      "prenomP": this.prenomP,
      "nomP": this.nomP,
      "dateEmbaucheP": this.dateEmbaucheP,
      "activiteP": this.activiteP,
      "statutP": this.statutP,
    };

    this.http.post(this.apiUrl, bodyData)
      .subscribe({
        next: (resultData: any) => {
          console.log(resultData);
          alert("Employee Registered Successfully");
          this.getAllEmployees();
        },
        error: (err) => {
          console.error("Error registering employee:", err);
          alert("Failed to register employee. Please try again.");
        }
      });
  }

  setUpdate(data: any) {
    this.prenomP = data.prenomP;
    this.nomP = data.nomP;
    this.dateEmbaucheP = data.dateEmbaucheP;
    this.activiteP = data.activiteP;
    this.statutP = data.statutP;
    this.idEmploye = data.idP;
    this.isUpdateFormActive = true;
  }

  updateRecords() {
    let bodyData = {
      "prenomP": this.prenomP,
      "nomP": this.nomP,
      "dateEmbaucheP": this.dateEmbaucheP,
      "activiteP": this.activiteP,
      "statutP": this.statutP
    };

    this.http.put(`${this.apiUrl}/${this.idEmploye}`, bodyData)
      .subscribe({
        next: (resultData: any) => {
          console.log(resultData);
          alert("Employee Updated Successfully");
          this.getAllEmployees();
        },
        error: (err) => {
          console.error("Error updating employee:", err);
          alert("Failed to update employee. Please try again.");
        }
      });
  }

  save() {
    if (this.idEmploye === '') {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  setDelete(data: any) {
    if (!data.idP) {
      console.error("Invalid employee ID");
      alert("Invalid employee ID");
      return;
    }

    this.http.delete(`${this.apiUrl}/${data.idP}`)
      .subscribe({
        next: (resultData: any) => {
          console.log(resultData);
          alert("Employee Deleted Successfully");

          // Supprime l'employé de la liste locale sans recharger toute la liste
          this.EmployeeArray = this.EmployeeArray.filter(emp => emp.idP !== data.idP);
        },
        error: (err) => {
          console.error("Error deleting employee:", err);
          alert("Failed to delete employee. Please try again.");
        }
      });
  }
}