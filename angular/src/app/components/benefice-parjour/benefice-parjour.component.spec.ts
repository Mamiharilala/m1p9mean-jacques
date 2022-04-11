import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficeParjourComponent } from './benefice-parjour.component';

describe('BeneficeParjourComponent', () => {
  let component: BeneficeParjourComponent;
  let fixture: ComponentFixture<BeneficeParjourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficeParjourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficeParjourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
