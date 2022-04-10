import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatRestaurantComponent } from './plat-restaurant.component';

describe('PlatRestaurantComponent', () => {
  let component: PlatRestaurantComponent;
  let fixture: ComponentFixture<PlatRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
