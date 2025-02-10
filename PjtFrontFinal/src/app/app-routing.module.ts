import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
