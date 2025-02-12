import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { HttpClientModule } from '@angular/common/http';
import { CompetencesModalComponent } from './competences-modal/competences-modal.component';
import { MissionsComponent } from './missions/missions.component';
import { MissionsFormComponent } from './missions-form/missions-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PersonnelRecommendationComponent } from './personnel-recommendation/personnel-recommendation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    PersonnelComponent,
    CompetencesModalComponent,
    PersonnelRecommendationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    FormsModule,
    MissionsComponent,
    MissionsFormComponent,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
