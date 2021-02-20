import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './../material/material.module';
import { PagiRgtaComponent1 } from './pagi-rgta1/pagi-rgta1.component';
import { LartiComponent } from './larti/larti.component';
import { ComponentsModule } from './../components/components.module';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { ConsultaEspecialComponent } from './consulta-especial/consulta-especial.component';
import { IsanegComponent } from './isaneg/isaneg.component';
import { NuestraEmpresaComponent } from './nuestra-empresa/nuestra-empresa.component';
import { NuestroServicioComponent } from './nuestro-servicio/nuestro-servicio.component';
import { PcpeProduccionComponent } from './pcpe-produccion/pcpe-produccion.component';
import { PcpeSgcorComponent } from './pcpe-sgcor/pcpe-sgcor.component';
import { PcpeSgdiComponent } from './pcpe-sgdi/pcpe-sgdi.component';
import { PcpeSilegComponent } from './pcpe-sileg/pcpe-sileg.component';
import { NuestroProductosComponent } from './nuestro-productos/nuestro-productos.component';
import { SgcorComponent } from './sgcor/sgcor.component';
import { TrabajosRealizadosComponent } from './trabajos-realizados/trabajos-realizados.component';
import { CioComponent } from './cio/cio.component';
import { CiopeComponent } from './ciope/ciope.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
import { AlianzasComponent } from './alianzas/alianzas.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { CabezeraComponent } from './cabezera/cabezera.component';
import { CompanyComponent } from './company/company.component';
import { GelocationComponent } from './gelocation/gelocation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagiRgtaComponent } from './pagi-rgta/pagi-rgta.component';
import { RegistroComponent } from './registro/registro.component';
import { RgtacdeComponent } from './rgtacde/rgtacde.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { Login2Component } from './login2/login2.component';
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoEdicionComponent } from './pedido/pedido-edicion/pedido-edicion.component';
import { MenuPventaComponent } from './login2/menu-pventa/menu-pventa.component';
import { CajaComponent } from './pedido/caja/caja.component';
import { CajaEdicionComponent } from './pedido/caja/caja-edicion/caja-edicion.component';
import { FactuacionComponent } from './factuacion/factuacion.component';

@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    ConsultaEspecialComponent,
    IsanegComponent,
    NuestraEmpresaComponent,
    NuestroServicioComponent,
    PcpeProduccionComponent,
    PcpeSgcorComponent,
    PcpeSgdiComponent,
    PcpeSilegComponent,
    NuestroProductosComponent,
    SgcorComponent,
    TrabajosRealizadosComponent,
    CioComponent,
    CiopeComponent,
    ClientesComponent,
    CapacitacionComponent,
    AlianzasComponent,
    AsistenciaComponent,
    CabezeraComponent,
    CompanyComponent,
    GelocationComponent,
    HomeComponent,
    LoginComponent,
    LartiComponent,
    PagiRgtaComponent1,
    PagiRgtaComponent,
    RegistroComponent,
    RgtacdeComponent,
    UsuarioComponent,
    Login2Component,
    CajaComponent,
    CajaEdicionComponent,
    PedidoComponent,
    PedidoEdicionComponent,
    MenuPventaComponent,
    FactuacionComponent
  ],exports: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ]
})
export class PagesModule { }
