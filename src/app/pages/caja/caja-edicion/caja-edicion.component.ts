import { DatosCajaDTO } from './../../../DTO/DatosCajaDTO';
import { switchMap } from 'rxjs/operators';
import { EstadosDTO } from './../../../DTO/EstadosDTO';
import { CajaDTO } from './../../../DTO/CajaDTO';
import { TapusupvenService } from './../../../services/tapusupven.service';
import { Observable } from 'rxjs';
import { ArcaaccajService } from './../../../services/arcaaccaj.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IdArcaaccaj } from './../../../models/IdArcaaccaj';
import { TapUsuPven } from './../../../models/TapUsuPven';
import { Arcaaccaj } from './../../../models/Arcaaccaj';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-caja-edicion',
  templateUrl: './caja-edicion.component.html',
  styleUrls: ['./caja-edicion.component.css']
})
export class CajaEdicionComponent implements OnInit {

  form: FormGroup;
  edicion:boolean;
  idCaja: IdArcaaccaj;
  cajeros$: Observable<TapUsuPven[]>;
  cajas$: Observable<CajaDTO[]>;
  cajeroSeleccionado: string;
  cajaSeleccionada: string;
  estados: EstadosDTO[] = [
    { codigo: 'A', nombre: 'Abierto' },
    { codigo: 'C', nombre: 'Cerrado' }]
  estadoSeleccionado: string;
  maxFecha: Date = new Date();
  maxFecha1: Date = new Date();
  constructor(
    public cajaService: ArcaaccajService,
    public usuService: TapusupvenService,
    public route: ActivatedRoute,
    public router: Router,
    public dialogRef: MatDialogRef<CajaEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Arcaaccaj
  ) { }

  ngOnInit(): void {
    this.listaCajas();
    this.listaCajeros();

   if(this.data.cajera == null){
     this.edicion=false;
     console.log(this.edicion);

    this.form = new FormGroup({
      cia: new FormControl(sessionStorage.getItem('cia')),
      centro: new FormControl(sessionStorage.getItem('centro')),
      caja: new FormControl(''),
      codAper: new FormControl(''),
      fecha: new FormControl(),
      hora: new FormControl(''),
      cajera: new FormControl(''),
      saldoInicial: new FormControl(0),
      estado: new FormControl('A'),
      fechaCierre: new FormControl(),
      horaCierre: new FormControl('')
    })
    }else{
      this.edicion=true;
      console.log(this.edicion);
      this.initForm();
    }

  }
  initForm(){
    this.form = new FormGroup({
      cia: new FormControl(this.data.idArcaja.cia),
      centro: new FormControl(this.data.idArcaja.centro),
      caja: new FormControl(this.data.idArcaja.codCaja, [Validators.required]),
      codAper: new FormControl(this.data.idArcaja.cod_aper),
      fecha: new FormControl(this.data.fecha, [Validators.required]),
      hora: new FormControl(this.data.hora, [Validators.required]),
      cajera: new FormControl(this.data.cajera, [Validators.required]),
      saldoInicial: new FormControl(this.data.saldoInicial),
      estado: new FormControl(this.data.estado),
      fechaCierre: new FormControl(this.data.fechaCierre),
      horaCierre: new FormControl(this.data.horaCierre)
    })
  }
  listaCajeros() {
    this.cajeros$ = this.usuService.cajeros(sessionStorage.getItem('cia'), sessionStorage.getItem('centro'));
  }
  listaCajas() {
    this.cajas$ = this.cajaService.cajas(sessionStorage.getItem('cia'), sessionStorage.getItem('centro'));
  }
  operar() {
    let idCaja = new IdArcaaccaj();
    idCaja.cia = this.form.value['cia'];
    idCaja.centro = this.form.value['centro'];
    idCaja.codCaja = this.form.value['caja'];
    idCaja.cod_aper = this.form.value['codAper'];
    let caja = new Arcaaccaj();
    caja.idArcaja = idCaja;
    caja.fecha = this.form.value['fecha'];
    caja.hora = this.form.value['hora'];
    caja.cajera = this.form.value['cajera'];
    caja.saldoInicial = this.form.value['saldoInicial'];
    caja.estado = this.form.value['estado'];
    caja.fechaCierre = this.form.value['fechaCierre'];
    caja.horaCierre = this.form.value['horaCierre'];

    let datos = new DatosCajaDTO(idCaja.cia,idCaja.centro,idCaja.codCaja,
      caja.cajera)
    if(this.edicion){
      console.log("1");
      this.cajaService.actualizaCaja(caja).pipe(switchMap( () =>{
        return this.cajaService.caja(datos);
      })).subscribe(data=>{
        this.cajaService.cajasCreadas.next(data);
        this.cajaService.mensajeCambio.next('SE ACTUALIZÓ');
      });
    }else{
      console.log("2");
      this.cajaService.aperturaCaja(caja).pipe(switchMap( () =>{
        return this.cajaService.caja(datos);
      })).subscribe(data=>{
        this.cajaService.cajasCreadas.next(data);
        this.cajaService.mensajeCambio.next('SE REGISTRÓ');
      });
    }
    this.cancelar();
  }
  cancelar() {
    this.dialogRef.close();
  }
}
