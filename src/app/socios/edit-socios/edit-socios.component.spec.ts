import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSociosComponent } from './edit-socios.component';

describe('EditSociosComponent', () => {
  let component: EditSociosComponent;
  let fixture: ComponentFixture<EditSociosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSociosComponent]
    });
    fixture = TestBed.createComponent(EditSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
