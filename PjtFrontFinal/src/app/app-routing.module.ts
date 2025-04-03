import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { MissionsComponent } from './missions/missions.component';
import { ForumComponent } from './forum/forum.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent},
  {path: 'personnel', component: PersonnelComponent},
  {path: 'missions', component: MissionsComponent},
  {path: 'forum', component: ForumComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
