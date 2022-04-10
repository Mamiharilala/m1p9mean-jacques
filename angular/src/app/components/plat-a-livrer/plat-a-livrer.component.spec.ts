import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatALivrerComponent } from './plat-a-livrer.component';

describe('PlatALivrerComponent', () => {
  let component: PlatALivrerComponent;
  let fixture: ComponentFixture<PlatALivrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatALivrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatALivrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
