import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialgastosdiariosComponent } from './historialgastosdiarios.component';

describe('HistorialgastosdiariosComponent', () => {
  let component: HistorialgastosdiariosComponent;
  let fixture: ComponentFixture<HistorialgastosdiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialgastosdiariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialgastosdiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
