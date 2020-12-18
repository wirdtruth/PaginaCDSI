import { ArfatpService } from './../../services/arfatp.service';
import { Arinbo1Service } from './../../services/arinbo1.service';
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
import { Arinbo1 } from 'src/app/models/Arinbo1';
import { Arfatp } from 'src/app/models/Arfatp';
import { Articulo } from 'src/app/models/Articulo';

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
  dataSource: MatTableDataSource<Articulo>;
  paginador: any;
  catalogo: string = '1';
  almacenes$: Observable<Arinbo1[]>;
  tipos$: Observable<Arfatp[]>;
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

  constructor(public serviArti: ArticuloService, public serviCat: CatalogoService,
    public actiRouter: ActivatedRoute, public serviLin: LineaService,
    public serviSub: SublineaService, public serviFam: FamiliaService,
    public serviAlma: Arinbo1Service, public serviPre: ArfatpService) {
  }
  pageEvent: PageEvent;


  linea: string;
  sublinea: string;
  familia: string;
  almacen: string;
  tipo: string;

  ngOnInit() {
    this.almacen='1A001';
    this.tipo= 'F8';
    this.listarCatalogos();
    this.filtrarCatalogo();
    this.listarAlmacenes();
    this.listarPrecios();
    this.listarLineas();
    
  }
  listarAlmacenes() {
    let usu = new Usuario();
    usu.cia = '01';
    this.almacenes$ = this.serviAlma.getAlmacenes(usu);
  }
  listarPrecios() {
    let usu = new Usuario();
    usu.cia = '01';
    this.tipos$ = this.serviPre.getPrecios(usu);
  }
  listarCatalogos() {
    let usu = new Usuario();
    usu.cia = '01';
    this.catalogos$ = this.serviCat.getCatalogos(usu);
  }
  listarLineas() {
    let usu = new Usuario();
    usu.cia = '01';
    this.lineas$ = this.serviLin.getLineas(usu, this.catalogo);
    
  }
  listarSubLineas() {
    let usu = new Usuario();
    usu.cia = '01';
    this.sublineas$ = this.serviSub.getSubLineas(usu, this.catalogo,this.linea);
  }
  listarFamilias() {
    let usu = new Usuario();
    usu.cia = '01';
    this.familias$ = this.serviFam.getFamilias(usu, this.catalogo,this.linea,this.sublinea);
  }
  filtrar(valor: any) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  filtrarData() {
    
    if(typeof this.linea ==='undefined' && typeof this.sublinea ==='undefined' && typeof this.familia ==='undefined' ||
    this.linea ==='' &&  this.sublinea ==='' &&  this.familia ===''){
      //console.log("entra solo catalogo");
      this.filtrarCatalogo();
    } 

    if(typeof this.linea !== 'undefined' && typeof this.sublinea ==='undefined' && typeof this.familia ==='undefined' || 
    typeof this.linea !== 'undefined' &&  this.sublinea ==='' &&  this.familia ===''){
      //console.log("entra solo linea");
      this.filtrarLinea();
    } 
      if(typeof this.linea !== 'undefined' && typeof this.sublinea !== 'undefined' && typeof this.familia ==='undefined' ||
      typeof this.linea === 'undefined' &&  typeof this.sublinea ==='undefined' &&  this.familia ===''){
        //console.log("entra solo sublinea");
        this.filtrarSubLinea();
      } 
        if(typeof this.linea !== 'undefined' && typeof this.sublinea !== 'undefined' && typeof this.familia !== 'undefined'){
          //console.log("entra solo familia");
          this.filtrarCompleto()
        } 
        //console.log(this.linea,this.sublinea, this.familia);
      }
    
  borrarFiltros(){
    this.linea= '';
    this.sublinea='';
    this.familia='';
    this.filtrarCatalogo();
  }
  filtrarCatalogo(){
   /* this.actiRouter.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) { // SI NO EXISTE
        page = 0;
      }*/
      let usu = new Usuario();
      usu.cia = '01';
      // ALERTA
      Swal.fire({
        allowOutsideClick: false, // CLICK FUERA
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
      this.serviArti.getPageCata(usu, this.catalogo, this.almacen, this.tipo).subscribe(data => {
          console.log("filtrarCatalogo");
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          //this.paginador = data;
          Swal.close();
        });
      }
    //);
  //}
  filtrarLinea(){
   /* this.actiRouter.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) { // SI NO EXISTE
        page = 0;
      }*/
      let usu = new Usuario();
      usu.cia = '01';
      // ALERTA
      Swal.fire({
        allowOutsideClick: false, // CLICK FUERA
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
      this.serviArti.getPageAllLinea(usu, this.catalogo,this.linea, this.almacen, this.tipo).subscribe(data => {
        console.log("filtrarLinea");
        console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          //this.paginador = data;
          this.dataSource.paginator = this.paginator;
          Swal.close();
        });
      }
   // );
 // }
  filtrarSubLinea(){
   /* this.actiRouter.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) { // SI NO EXISTE
        page = 0;
      }*/
      let usu = new Usuario();
      usu.cia = '01';
      // ALERTA
      Swal.fire({
        allowOutsideClick: false, // CLICK FUERA
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
      this.serviArti.getPageAllSubLinea(usu, this.catalogo, this.linea,this.sublinea,this.almacen, this.tipo).subscribe(data => {
        console.log("filtrarsub");
        console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          //this.paginador = data;
          this.dataSource.paginator = this.paginator;
          Swal.close();
        });
      }
   /* );
  }*/
  filtrarCompleto(){
   /* this.actiRouter.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) { // SI NO EXISTE
        page = 0;
      }*/
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
        this.almacen, this.tipo).subscribe(data => {
          console.log("filtrarTodo");
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          //this.paginador = data;
          Swal.close();
        });
    }

   /* );
    }*/
}
