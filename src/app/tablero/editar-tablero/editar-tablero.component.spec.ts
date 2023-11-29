import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTableroComponent } from './editar-tablero.component';

describe('EditarTableroComponent', () => {
  let component: EditarTableroComponent;
  let fixture: ComponentFixture<EditarTableroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarTableroComponent]
    });
    fixture = TestBed.createComponent(EditarTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
