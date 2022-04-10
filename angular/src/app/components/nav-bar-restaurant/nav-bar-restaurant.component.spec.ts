import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarRestaurantComponent } from './nav-bar-restaurant.component';

describe('NavBarRestaurantComponent', () => {
  let component: NavBarRestaurantComponent;
  let fixture: ComponentFixture<NavBarRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
