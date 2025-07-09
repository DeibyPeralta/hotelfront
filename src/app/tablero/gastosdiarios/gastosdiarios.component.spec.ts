import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosdiariosComponent } from './gastosdiarios.component';

describe('GastosdiariosComponent', () => {
  let component: GastosdiariosComponent;
  let fixture: ComponentFixture<GastosdiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosdiariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GastosdiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
