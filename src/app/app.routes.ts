import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { DestinosComponent } from './componentes/destinos/destinos.component'

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'destinos', component: DestinosComponent},
    { path: "**", pathMatch: "full", redirectTo: "" },
];
