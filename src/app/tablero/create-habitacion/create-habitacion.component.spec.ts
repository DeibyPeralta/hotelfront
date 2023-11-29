import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHabitacionComponent } from './create-habitacion.component';

describe('CreateHabitacionComponent', () => {
  let component: CreateHabitacionComponent;
  let fixture: ComponentFixture<CreateHabitacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHabitacionComponent]
    });
    fixture = TestBed.createComponent(CreateHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
