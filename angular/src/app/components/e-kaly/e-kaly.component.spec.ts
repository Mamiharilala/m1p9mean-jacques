import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyComponent } from './e-kaly.component';

describe('EKalyComponent', () => {
  let component: EKalyComponent;
  let fixture: ComponentFixture<EKalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
