import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficeParrestaurantComponent } from './benefice-parrestaurant.component';

describe('BeneficeParrestaurantComponent', () => {
  let component: BeneficeParrestaurantComponent;
  let fixture: ComponentFixture<BeneficeParrestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficeParrestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficeParrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
