import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHistorialComponent } from './edit-historial.component';

describe('EditHistorialComponent', () => {
  let component: EditHistorialComponent;
  let fixture: ComponentFixture<EditHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHistorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
