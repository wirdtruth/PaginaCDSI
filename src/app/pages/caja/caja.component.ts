import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CajaEdicionComponent } from './caja-edicion/caja-edicion.component';
import { IdArcaaccaj } from './../../models/IdArcaaccaj';
import { DatosCajaDTO } from './../../DTO/DatosCajaDTO';
import { FormGroup, FormControl } from '@angular/forms';
import { ArcaaccajService } from './../../services/arcaaccaj.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Arcaaccaj } from 'src/app/models/Arcaaccaj';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {

  form: FormGroup;
  maxFecha: Date = new Date();
  displayedColumns = ['fecha', 'hora', 'codCaja', 'cajera', 'saldoInicial', 'estado', 'fechaCierre', 'horaCierre','acciones'];
  dataSource: MatTableDataSource<Arcaaccaj>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  caja: string;
  cajera: string;

  constructor(
    public cajaService: ArcaaccajService,
    public snackBar: MatSnackBar,
    public route: ActivatedRoute,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      centro: new FormControl(sessionStorage.getItem('centro')),
      fecha: new FormControl()
    });
    this.cajaService.cajasCreadas.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.cajaService.mensajeCambio.subscribe(data=> {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
      });
    });
    //this.datosCaja();
  }
  buscar() {
    this.datosCaja();
  }
  datosCaja() {
    let datos = new DatosCajaDTO(sessionStorage.getItem('cia'), this.form.value['centro'], this.caja, this.cajera);
    datos.fecha = moment(this.form.value['fecha']).format('YYYY-MM-DDTHH:mm:ss') ;
    if (datos.centro) {
      delete datos.caja;
      delete datos.cajera;
    }

    this.cajaService.totalCajas(datos).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(caja:Arcaaccaj){
    let datos = new DatosCajaDTO(sessionStorage.getItem('cia'), this.form.value['centro'],caja.idArcaja.codCaja,caja.cajera)
    this.cajaService.eliminar(caja.idArcaja).pipe(switchMap( ()=>{
      return this.cajaService.caja(datos);
    })).subscribe(data=>{
      this.cajaService.cajasCreadas.next(data);
      this.cajaService.mensajeCambio.next('SE ELIMINÓ');
    })
  }

  abrirDialogo(caja?:Arcaaccaj){
    let caj = caja != null ? caja:new Arcaaccaj();
    this.dialog.open(CajaEdicionComponent,{
    width:'50%',
    data:caj
  });
  }
}
