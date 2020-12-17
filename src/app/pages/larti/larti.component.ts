import { Familia } from './../../models/Familia';
import { FamiliaService } from './../../services/familia.service';
import { SublineaService } from './../../services/sublinea.service';
import { SubLinea } from './../../models/SubLinea';
import { LineaService } from './../../services/linea.service';
import { Linea } from './../../models/Linea';
import { Observable } from 'rxjs';
import { CatalogoService } from './../../services/catalogo.service';
import Swal from 'sweetalert2';
import { Usuario } from './../../models/usuario';
import { ArticuloService } from './../../services/articulo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Catalogo } from 'src/app/models/Catalogo';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-larti',
  templateUrl: './larti.component.html',
  styleUrls: ['./larti.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LartiComponent implements OnInit {

  displayedColumns = ['idArti', 'descripcion', 'medida', 'precio', 'compromiso', 'disponible'];
  dataSource: MatTableDataSource<any>;
  paginador: any;
  catalogo: string = '1';
  catalogos$: Observable<Catalogo[]>;
  lineas$: Observable<Linea[]>;
  sublineas$: Observable<SubLinea[]>;
  familias$: Observable<Familia[]>;
  //lineas$: Linea[];
  idCatalogoSeleccionado: string;
  //linea:Linea;
  /*length: number;
  pageSize:number=8;*/
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private serviArti: ArticuloService, private serviCat: CatalogoService,
    private actiRouter: ActivatedRoute, private serviLin: LineaService,
    private serviSub: SublineaService, private serviFam: FamiliaService) {
  }
  pageEvent: PageEvent;



  linea: string;
  sublinea: string;
  familia: string;
  almacen: string = '1A001';
  tipo: string = 'F8';


  ngOnInit() {
    this.listarCatalogos();
    this.listarLineas();
  }
  listarCatalogos() {
    let usu = new Usuario();
    usu.cia = '01';
    usu.username = 'RSL';
    this.catalogos$ = this.serviCat.getCatalogos(usu);
  }
  listarLineas() {
    let usu = new Usuario();
    usu.cia = '01';
    usu.username = 'RSL';
    this.lineas$ = this.serviLin.getLineas(usu, this.catalogo);
    
  }
  listarSubLineas() {
    let usu = new Usuario();
    usu.cia = '01';
    usu.username = 'RSL';
    
    this.sublineas$ = this.serviSub.getSubLineas(usu, this.catalogo,this.linea);
  }
  listarFamilias() {
    let usu = new Usuario();
    usu.cia = '01';
    usu.username = 'RSL';
    this.familias$ = this.serviFam.getFamilias(usu, this.catalogo,this.linea,this.sublinea);
  }
  filtrar(valor: any) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  filtrarData() {
    this.actiRouter.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) { // SI NO EXISTE
        page = 0;
      }
      let usu = new Usuario();
      usu.cia = '01';
      usu.username = 'RSL';
      // ALERTA
      Swal.fire({
        allowOutsideClick: false, // CLICK FUERA
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.serviArti.getPageAll(usu, this.catalogo, this.linea, this.sublinea, this.familia,
        this.almacen, this.tipo, page).subscribe(data => {
          console.log(data.content);
          this.dataSource = new MatTableDataSource(data.content);
          this.dataSource.sort = this.sort;
          this.paginador = data;
          /*this.dataSource.paginator = this.paginator;
          this.length=data.totalPages;*/
          Swal.close();
        });
    }

    );
  }
}
