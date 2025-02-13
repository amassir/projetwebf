import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { MissionsComponent } from './missions/missions.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'personnel', component: PersonnelComponent},
  {path: 'missions', component: MissionsComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
