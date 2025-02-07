import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherCompetencesComponent } from './afficher-competences.component';

describe('AfficherCompetencesComponent', () => {
  let component: AfficherCompetencesComponent;
  let fixture: ComponentFixture<AfficherCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficherCompetencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
