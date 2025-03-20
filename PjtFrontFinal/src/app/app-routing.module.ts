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
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'personnel', component: PersonnelComponent, canActivate: [AuthGuard]},
  {path: 'missions', component: MissionsComponent, canActivate: [AuthGuard] },
  {path: 'forum', component: ForumComponent, canActivate: [AuthGuard] },
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: '**', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
