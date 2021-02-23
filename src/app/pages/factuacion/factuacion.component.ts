import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { DatosClienteDTO } from 'src/app/DTO/DatosClienteDTO';
import { Arccmc } from 'src/app/models/Arccmc';
import { ArccmcService } from 'src/app/services/arccmc.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-factuacion',
  templateUrl: './factuacion.component.html',
  styleUrls: ['./factuacion.component.css']
})

export class FactuacionComponent implements OnInit {
  groupEmpresa:FormGroup;
  groupArticulo:FormGroup;
  //elemento: EmpresaElement;
  detalle: Arfafl[];
  options: Arccmc[] = [];
  /*[{ruc: '99999999999', razon: 'Empresa 1'},
  {ruc: '88888888888', razon: 'Empresa 2'},
  {ruc: '77777777777', razon: 'Empresa 3'},
  {ruc: '66666666666', razon: 'Empresa 4'},
  {ruc: '88888777777', razon: 'Empresa 3'},
  {ruc: '88888666666', razon: 'Empresa 4'},
  ];*/

  factuOptions: Observable<Arccmc[]>;
  codProd = '';
  desProd = '';
  cantProd = 1;
  totalFactu:number = 0;

  displayedColumns: string[] = ['item', 'codigo', 'medida', 'descripcion', 'tipoAfec', 'cantidad',
'pu', 'descu','icbCop', 'IGV', 'total','eliminar'];
  dataSource = new MatTableDataSource<FacturaElement>(ELEMENT_DATA);

  constructor(public pedidoService: PedidoService,
    public clienteServices: ArccmcService,
    public arindaService: ArticuloService) { }


  ngOnInit(): void {
    this.groupEmpresa = new FormGroup({
      ruc: new FormControl(),
      racSoc: new FormControl()
    });
    this.groupArticulo = new FormGroup({
      codProd: new FormControl(),
      desProd: new FormControl(),
      cantProd: new FormControl()
    });
    this.factuOptions = this.groupEmpresa.controls['ruc'].valueChanges
    .pipe(
      debounceTime(300),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string){
    if (value.length < 4) {
      return [];
    } else {
      const filterValue = value;
      this.clienteServices.listaClientesRucLike(sessionStorage.getItem('cia'),filterValue)
      .subscribe( data => {
        this.options = data;
      })
      return  this.options;
      //this.clienteServices.listaClientesRucLike(sessionStorage.getItem('cia'))
      //return this.options.filter(option => option.ruc.includes(filterValue));

    }
    /*filtrarArticulos(val: any) {
      if (val != null) {
        let filtro:string = String(val);
        this.arindaService.listaArtiDesc(sessionStorage.getItem('cia'), filtro.trim()).subscribe(data => {
          this.articulos = data;
        })
        return this.articulos;
      }
    */
  }
  
addElement() {
  ELEMENT_DATA.push({item: this.getItemNumber(), codigo: this.groupArticulo.controls['codProd'].value, medida:0, 
  descripcion: this.groupArticulo.controls['desProd'].value, tipoAfec: 0,cantidad: this.groupArticulo.controls['cantProd'].value, pu: 0, descu: 0, icbCop: 0, IGV: 0, total: 0})
   this.dataSource = new MatTableDataSource(ELEMENT_DATA);
}

getItemNumber():number {
  if (ELEMENT_DATA.length == 0) { return 1;}
  else {
    return ELEMENT_DATA.length + 1;
  }
}

setFormData($event: MatAutocompleteSelectedEvent) {
  let factuOptions = $event.option.value;
  if(factuOptions){
    this.groupEmpresa.controls['ruc'].setValue(factuOptions.ruc, {emitEvent: false});
    this.groupEmpresa.controls['racSoc'].setValue(factuOptions.razon, {emitEvent: false});
  }
}

deleteDetail(index: number) {
  ELEMENT_DATA.splice(index-1, 1);
  // this.getTotal();
  this.reOrderItems();
  this.dataSource = new MatTableDataSource(ELEMENT_DATA);
}

reOrderItems(){
  for(let i=0; i< ELEMENT_DATA.length; i++){
    ELEMENT_DATA[i].item = i+1;
  }
}

getTotal(){
  for (let i = 0; i < this.detalle.length; i++) {
    this.totalFactu += this.detalle[i].total;
  }
}

}

export interface EmpresaElement{
  ruc: string;
  razon: string;
}
  
export interface FacturaElement {
  item: number;
  codigo: string;
  medida: number;
  descripcion: string;
  tipoAfec: number;
  cantidad: number;
  pu: number;
  descu: number;
  icbCop: number;
  IGV: number;
  total: number;
}

export interface Arfafl{
  total: number;
}

const ELEMENT_DATA: FacturaElement[] = [
  //{item: 1, codigo: "", medida:0, descripcion: "", ta: 0,cantidad: 0, pu: 0, descu: 0, icbCop: 0, IGV: 0, total: 0}
];
