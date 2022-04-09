import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeDeliveredComponent } from './commande-delivered.component';

describe('CommandeDeliveredComponent', () => {
  let component: CommandeDeliveredComponent;
  let fixture: ComponentFixture<CommandeDeliveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeDeliveredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeDeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
