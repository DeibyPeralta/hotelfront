import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTableroComponent } from './vista-tablero.component';

describe('VistaTableroComponent', () => {
  let component: VistaTableroComponent;
  let fixture: ComponentFixture<VistaTableroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaTableroComponent]
    });
    fixture = TestBed.createComponent(VistaTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
