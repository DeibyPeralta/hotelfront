import { DashboardTableroComponent } from './dashboard-tablero.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { VistaTableroComponent } from './vista-tablero/vista-tablero.component';
import { CreateTableroComponent } from './create-tablero/create-tablero.component';
import { EditarTableroComponent } from './editar-tablero/editar-tablero.component';
import { HabitacionesComponent } from '../usuarios/habitaciones/habitaciones.component';
import { HistorialComponent } from './historial/historial.component';
import { AgregarClientesComponent } from './agregar-clientes/agregar-clientes.component';
import { CajaComponent } from './caja/caja.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from '../usuarios/configuration/configuration.component';
import { AuthGuard } from '../guards/auth.guard';
import { GastosdiariosComponent } from './gastosdiarios/gastosdiarios.component';

const routes: Routes = [
    {
        path: '', component: DashboardTableroComponent, children: [
            { path: '', component: VistaTableroComponent },
            { path: 'vista', component: VistaTableroComponent },
            { path: 'editar', component: EditarTableroComponent },
            { path: 'agregar', component: AgregarClientesComponent },
            { path: 'habitaciones', component: HabitacionesComponent },
            { path: 'historial', component: HistorialComponent },
            { path: 'gastos-del-dia', component: GastosdiariosComponent },
            { path: 'registrar/:index', component: CreateTableroComponent },
            { path: 'caja', component: CajaComponent, canActivate: [AuthGuard], data: { roles: ['1'] } },
            { path: 'socios', loadChildren: () => import('../socios/socios.module').then(x => x.SociosModule) },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['1'] } },
            { path: 'permisos', component: ConfigurationComponent, canActivate: [AuthGuard], data: { roles: ['1'] } },
            { path: '**', redirectTo: 'vista', pathMatch: 'full' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardTableroRoutingModule { }