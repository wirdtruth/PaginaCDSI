import Swal from 'sweetalert2';
import { DatosCajaDTO } from '../../../DTO/DatosCajaDTO';
import { ArcaaccajService } from '../../../services/arcaaccaj.service';
import { Router } from '@angular/router';
import { TapusupvenService } from '../../../services/tapusupven.service';
import { TapUsuPven } from '../../../models/TapUsuPven';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Arcaaccaj } from 'src/app/models/Arcaaccaj';
import * as moment from 'moment';
@Component({
  selector: 'app-usuarios-caja',
  templateUrl: './usuarios-caja.component.html',
  styleUrls: ['./usuarios-caja.component.css']
})
export class UsuariosCajaComponent implements OnInit {

  maxFecha:Date = new Date();
  empleados: TapUsuPven[] = [];
  empleadoSeleccionado: TapUsuPven;
  cajas: Arcaaccaj[] = [];
  cajaSeleccionada: Arcaaccaj;
  codEmp: string;
  cia: string;
  codCaja: string;
  constructor(
    public usuService: TapusupvenService,
    public dialogRef: MatDialogRef<UsuariosCajaComponent>,
    public cajaService: ArcaaccajService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cia = sessionStorage.getItem('cia');
    this.codEmp = sessionStorage.getItem('codEmp');
    this.maxFecha.setHours(0);
    this.maxFecha.setMinutes(0);
    this.maxFecha.setSeconds(0);
    this.maxFecha.setMilliseconds(0);
    this.listaUsuarios();
  }
  listaUsuarios() {
    this.usuService.traerUsuario(this.cia, this.codEmp).subscribe(data => {
      this.empleados = data;
    })
  }
  cancelar() {
    this.dialogRef.close();
  }
  cajasAbiertasCajero() {
    if (this.empleadoSeleccionado != null) {
      sessionStorage.setItem('centro', this.empleadoSeleccionado.centro);
      let datos = new DatosCajaDTO(this.cia, this.empleadoSeleccionado.centro,
        this.codCaja, this.codEmp);
      if (this.empleadoSeleccionado.tipusua == "04") {
        this.cajaService.caja(datos).subscribe(data => {
          this.cajas = data;
        })
      }
    }
  }
  aceptar() {
    let datos = new DatosCajaDTO(this.cia, this.empleadoSeleccionado.centro,
      this.codCaja, this.codEmp);
      datos.fecha = moment(this.maxFecha).format('YYYY-MM-DDTHH:mm:ss');

    if (this.cajas.length >= 1) {
      if (this.empleadoSeleccionado.centro != null) {
          this.cajaService.totalCajas(datos).subscribe(data => {
            this.cajaService.cajasCreadas.next(data);
          })
          this.cancelar();
          this.router.navigateByUrl('/dashboard/caja');
        /*, err => {
          if (err.status == 404) {
            Swal.close();
            Swal.fire({
              allowOutsideClick: false,
              icon: 'info',
              title: 'Debe aperturar caja'
            });
            this.cancelar();
            this.router.navigateByUrl('/dashboard/caja');
          }
        }*/
      } else {
        Swal.close();
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Seleccione Usuario'
        });
      }
    } else {
        Swal.close();
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'No hay cajas abiertas'
        });
        this.cancelar();
        this.router.navigateByUrl('/dashboard/caja');
    }
  }
}
