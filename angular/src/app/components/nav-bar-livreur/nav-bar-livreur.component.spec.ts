import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarLivreurComponent } from './nav-bar-livreur.component';

describe('NavBarLivreurComponent', () => {
  let component: NavBarLivreurComponent;
  let fixture: ComponentFixture<NavBarLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarLivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
