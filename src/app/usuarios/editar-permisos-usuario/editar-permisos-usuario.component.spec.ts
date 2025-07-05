import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPermisosUsuarioComponent } from './editar-permisos-usuario.component';

describe('EditarPermisosUsuarioComponent', () => {
  let component: EditarPermisosUsuarioComponent;
  let fixture: ComponentFixture<EditarPermisosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPermisosUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPermisosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
