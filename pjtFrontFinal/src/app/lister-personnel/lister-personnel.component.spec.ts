import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerPersonnelComponent } from './lister-personnel.component';

describe('ListerPersonnelComponent', () => {
  let component: ListerPersonnelComponent;
  let fixture: ComponentFixture<ListerPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListerPersonnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
