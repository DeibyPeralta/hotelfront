import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingWashLogComponent } from './parking-wash-log.component';

describe('ParkingWashLogComponent', () => {
  let component: ParkingWashLogComponent;
  let fixture: ComponentFixture<ParkingWashLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingWashLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkingWashLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
