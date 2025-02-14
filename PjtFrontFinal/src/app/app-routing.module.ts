import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { MissionsComponent } from './missions/missions.component';
import { PersonnelRecommendationComponent } from './personnel-recommendation/personnel-recommendation.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'personnel', component: PersonnelComponent},
  {path: 'missions', component: MissionsComponent },
  {path: 'personnel-recommendation', component: PersonnelRecommendationComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
