import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { VistaSociosComponent } from './vista-socios/vista-socios.component';

const routes: Routes = [
    {
        path: '', component: VistaSociosComponent, children: [
            { path: '', component: VistaSociosComponent },
            { path: 'socios', component: VistaSociosComponent },
            { path: '**', redirectTo: 'socios', pathMatch: 'full' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class sociosRoutingModule { }