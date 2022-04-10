import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarEkalyComponent } from './nav-bar-ekaly.component';

describe('NavBarEkalyComponent', () => {
  let component: NavBarEkalyComponent;
  let fixture: ComponentFixture<NavBarEkalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarEkalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarEkalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
