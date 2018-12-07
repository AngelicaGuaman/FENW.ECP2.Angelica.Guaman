import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {FooterComponent} from './footer/footer.component';
import {InstalacionesComponent} from './components/instalaciones/instalaciones.component';
import {ReservaComponent} from './components/reserva/reserva.component';
import {LoginComponent} from './components/login/login.component';
import {RegistroComponent} from './components/registro/registro.component';
import {MenuComponent} from './menu/menu.component';
import {ServiciosComponent} from './components/servicios/servicios.component';

import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule, MatNativeDateModule, MatInputModule} from '@angular/material';

import {MyDatePickerModule} from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    InstalacionesComponent,
    ReservaComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    ServiciosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MyDatePickerModule,
    MatDatepickerModule,
    MatDialogModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
