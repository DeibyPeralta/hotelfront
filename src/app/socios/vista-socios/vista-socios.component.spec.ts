import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaSociosComponent } from './vista-socios.component';

describe('VistaSociosComponent', () => {
  let component: VistaSociosComponent;
  let fixture: ComponentFixture<VistaSociosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaSociosComponent]
    });
    fixture = TestBed.createComponent(VistaSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
