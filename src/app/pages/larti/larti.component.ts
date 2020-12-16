import { Usuario } from './../../models/usuario';
import { ArticuloService } from './../../services/articulo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-larti',
  templateUrl: './larti.component.html',
  styleUrls:['./larti.component.css']
})
export class LartiComponent implements OnInit {

  displayedColumns=['idArti','descripcion','medida','marca','catalogo','clase',
  'categoria','familia','precio','compromiso','disponible','fecha'];
  dataSource: MatTableDataSource<any>;
  paginador: any;
  /*length: number;
  pageSize:number=8;*/
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private serviArti: ArticuloService, private actiRouter: ActivatedRoute) { 
  }
  pageEvent: PageEvent;
  ngOnInit() {
    this.actiRouter.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) { // SI NO EXISTE
        page = 0;
      }
      let usu = new Usuario();
      usu.cia = '01';
      usu.username = 'RSL';

     this.serviArti.getPagArti(usu, page).subscribe( data => {
         console.log(data.content);
         this.dataSource = new MatTableDataSource(data.content);
         this.dataSource.sort = this.sort;
         this.paginador=data;
         /*this.dataSource.paginator = this.paginator;
         this.length=data.totalPages;*/
        });
      }
    );
  }
  filtrar(valor: any){
    this.dataSource.filter = valor.trim().toLowerCase();
  }
}
