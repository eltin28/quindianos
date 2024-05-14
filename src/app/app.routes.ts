import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { DestinosComponent } from './componentes/destinos/destinos.component';
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'destinos', component: DestinosComponent},
    { path: 'gestion-negocios', component: GestionNegociosComponent },
    { path: "**", pathMatch: "full", redirectTo: "" },
    
];
