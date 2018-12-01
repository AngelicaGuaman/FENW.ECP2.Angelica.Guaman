import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {InicioComponent} from './components/inicio/inicio.component';
import {LoginComponent} from './components/login/login.component';
import {InstalacionesComponent} from './components/instalaciones/instalaciones.component';
import {RegistroComponent} from './components/registro/registro.component';
import {ReservaComponent} from './components/reserva/reserva.component';
import {ServiciosComponent} from './components/servicios/servicios.component';

const routes: Routes = [
  {path: '', component: InicioComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'instalaciones', component: InstalacionesComponent, pathMatch: 'full'},
  {path: 'registro', component: RegistroComponent, pathMatch: 'full'},
  {path: 'servicios', component: ServiciosComponent, pathMatch: 'full'},
  {path: 'reserva', component: ReservaComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
