import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTableroComponent } from './create-tablero.component';

describe('CreateTableroComponent', () => {
  let component: CreateTableroComponent;
  let fixture: ComponentFixture<CreateTableroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTableroComponent]
    });
    fixture = TestBed.createComponent(CreateTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
