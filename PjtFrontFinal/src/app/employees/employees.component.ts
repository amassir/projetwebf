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

  constructor(private http: HttpClient) {
    this.getAllEmployees();
  }

  ngOnInit(): void {
  }

  getAllEmployees() {
    this.http.get("")
      .subscribe((resultData: any) => {
        this.isResultloaded = true;
        console.log(resultData);
        this.EmployeeArray = resultData;
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

    this.http.post("https://jsonplaceholder.typicode.com/users", bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Employee Registered Successfully (Simulated)");
        this.getAllEmployees();
      });
  }

  setUpdate(data: any) {
    this.prenomP = data.prenomP;
    this.nomP = data.nomP;
    this.dateEmbaucheP = data.dateEmbaucheP;
    this.activiteP = data.activiteP;
    this.statutP = data.statutP
    this.idEmploye = data.id;
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

    this.http.put("" + this.idEmploye, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Employee Updated Successfully (Simulated)");
        this.getAllEmployees();
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
    this.http.delete("" + data.id)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Employee Deleted Successfully (Simulated)");
        this.getAllEmployees();
      });
  }
}