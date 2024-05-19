import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { DestinosComponent } from './componentes/destinos/destinos.component';
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';
import { CrearNegocioComponent } from './componentes/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/detalle-negocio/detalle-negocio.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'destinos', component: DestinosComponent},
    { path: 'gestion-negocios', component: GestionNegociosComponent },
    { path: 'crear-negocio', component: CrearNegocioComponent },
    { path: 'detalle-negocio/:codigo', component: DetalleNegocioComponent },
    { path: "busqueda/:texto", component: BusquedaComponent },
    { path: "**", pathMatch: "full", redirectTo: "" },
    
];
