import { Routes } from '@angular/router';
import { ListerPersonnelComponent } from './lister-personnel/lister-personnel.component';
import { AjouterPersonnelComponent } from './ajouter-personnel/ajouter-personnel.component';

export const routes: Routes = [
    { path: '', redirectTo: 'lister-personnel', pathMatch: 'full' },
    { path: 'lister-personnel', component: ListerPersonnelComponent },
    { path: 'ajouter-personnel', component: AjouterPersonnelComponent },
];