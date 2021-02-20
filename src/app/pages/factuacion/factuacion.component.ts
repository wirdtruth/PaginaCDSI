import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-factuacion',
  templateUrl: './factuacion.component.html',
  styleUrls: ['./factuacion.component.css']
})

export class FactuacionComponent implements OnInit {
  formFactu:FormGroup;
  elemento: EmpresaElement;
  options: EmpresaElement[] = 
  [{ruc: '99999999999', razon: 'Empresa 1'},
  {ruc: '88888888888', razon: 'Empresa 2'},
  {ruc: '77777777777', razon: 'Empresa 3'},
  {ruc: '66666666666', razon: 'Empresa 4'},
  ];

  factuOptions: Observable<EmpresaElement[]>;
  CodigoProd = '';
  DescProd = '';
  CantProd = 0;

  displayedColumns: string[] = ['item', 'codigo', 'medida', 'descripcion', 'tipoAfec', 'cantidad',
'pu', 'descu','icbCop', 'IGV', 'total'];
  dataSource = new MatTableDataSource<FacturaElement>(ELEMENT_DATA);

  constructor() { }


  ngOnInit(): void {
    this.formFactu = new FormGroup({
      ruc: new FormControl(),
      racSoc: new FormControl()
    });
    this.factuOptions = merge(this.formFactu.controls['ruc'].valueChanges, this.formFactu.controls['racSoc'].valueChanges)
    .pipe(
      debounceTime(300),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): EmpresaElement[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.ruc.includes(filterValue));
  }
  
addElement() {
  ELEMENT_DATA.push({item: this.getItemNumber(), codigo: this.CodigoProd, medida:0, descripcion: this.DescProd,
   tipoAfec: 0,cantidad: this.CantProd, pu: 0, descu: 0, icbCop: 0, IGV: 0, total: 0})
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
    this.formFactu.controls['ruc'].setValue(factuOptions.ruc, {emitEvent: false});
    this.formFactu.controls['racSoc'].setValue(factuOptions.razon, {emitEvent: false});
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

const ELEMENT_DATA: FacturaElement[] = [
  //{item: 1, codigo: "", medida:0, descripcion: "", ta: 0,cantidad: 0, pu: 0, descu: 0, icbCop: 0, IGV: 0, total: 0}
];