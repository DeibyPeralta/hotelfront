import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHistorialComponent } from './create-historial.component';

describe('CreateHistorialComponent', () => {
  let component: CreateHistorialComponent;
  let fixture: ComponentFixture<CreateHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHistorialComponent]
    });
    fixture = TestBed.createComponent(CreateHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
