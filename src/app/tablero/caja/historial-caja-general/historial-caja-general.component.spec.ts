import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCajaGeneralComponent } from './historial-caja-general.component';

describe('HistorialCajaGeneralComponent', () => {
  let component: HistorialCajaGeneralComponent;
  let fixture: ComponentFixture<HistorialCajaGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialCajaGeneralComponent]
    });
    fixture = TestBed.createComponent(HistorialCajaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
