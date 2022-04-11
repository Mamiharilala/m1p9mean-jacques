import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatCreateComponent } from './plat-create.component';

describe('PlatCreateComponent', () => {
  let component: PlatCreateComponent;
  let fixture: ComponentFixture<PlatCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
