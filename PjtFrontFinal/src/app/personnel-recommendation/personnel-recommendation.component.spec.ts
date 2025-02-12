import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelRecommendationComponent } from './personnel-recommendation.component';

describe('PersonnelRecommendationComponent', () => {
  let component: PersonnelRecommendationComponent;
  let fixture: ComponentFixture<PersonnelRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonnelRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
