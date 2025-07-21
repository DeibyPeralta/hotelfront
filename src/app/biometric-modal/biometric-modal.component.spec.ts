import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricModalComponent } from './biometric-modal.component';

describe('BiometricModalComponent', () => {
  let component: BiometricModalComponent;
  let fixture: ComponentFixture<BiometricModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiometricModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiometricModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
