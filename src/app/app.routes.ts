import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { DestinosComponent } from './componentes/destinos/destinos.component';
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';
import { CrearNegocioComponent } from './componentes/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/detalle-negocio/detalle-negocio.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
    { path: 'destinos', component: DestinosComponent},
    { path: "gestion-negocios", component: GestionNegociosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },    
    { path: 'detalle-negocio/:codigo', component: DetalleNegocioComponent },
    { path: "busqueda/:texto", component: BusquedaComponent },
    { path: "**", pathMatch: "full", redirectTo: "" },
    { path: "crear-negocio", component: CrearNegocioComponent, canActivate: [RolesGuard], data: {expectedRole: ["CLIENTE"] } },
    // { path: "gestio-negocios-admin", component: GestionNegociosAdminComponent, canActivate:[RolesGuard], data: { expectedRole: ["MODERADOR"] } }
    
];
