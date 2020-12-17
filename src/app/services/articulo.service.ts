import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OtherService } from './other.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http: HttpClient, private other: OtherService) { }
  // SUBIR IMAGEN
  public subirFoto(archivo: File, cia, cod){
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("cia", cia);
    formData.append("cod", cod);
    return this.http.post(this.other.getUrl() + `/arti/upload`, formData).pipe(
     /* map( response => {
       return response;
      } ), */
      catchError(e => {
        if (e.status == 400 || e.status == 500) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );

  }
  // METODO QUE NOS PERMITE TRAER TODOS LOS ARTICULOS CON SUS PRECIOS
  public getShowArti(cia: string, cod: string){
    return this.http.get<any>(this.other.getUrl() + `/arti/show/${cia}/${cod}`).pipe(
      map(rest => {
         return rest;
      })
    );
  }

  // METODO QUE NOS PERMITE TRAER TODOS LOS ARTICULOS CON SUS PRECIOS
  public getPageAll(usuario: Usuario, catalogo:string, linea:string,subLinea:string,
    familia:string,almacen:string,tipo:string,page: number) {
    return this.http.get<any>(this.other.getUrl() + `/arti/list/page/${usuario.cia}/${catalogo}/${linea}/${subLinea}/${familia}/${almacen}/${tipo}/${page}`).pipe(
      map(rest => {
         //console.log(rest);
         return rest;
      })
    );
  }
  public getPageAllLinea(usuario: Usuario, catalogo:string, linea:string,almacen:string,tipo:string,page: number) {
    return this.http.get<any>(this.other.getUrl() + `/arti/list/page/${usuario.cia}/${catalogo}/${linea}/${almacen}/${tipo}/${page}`).pipe(
      map(rest => {
         //console.log(rest);
         return rest;
      })
    );
  }
  public getPageAllSubLinea(usuario: Usuario, catalogo:string, linea:string,subLinea:string,
    almacen:string,tipo:string,page: number) {
    return this.http.get<any>(this.other.getUrl() + `/arti/list/page/${usuario.cia}/${catalogo}/${linea}/${subLinea}/${almacen}/${tipo}/${page}`).pipe(
      map(rest => {
         //console.log(rest);
         return rest;
      })
    );
  }

  // METODO QUE NOS PERMITE TRAER TODOS LOS ARTICULOS CON SUS PRECIOS Y DESCRIPCION
  public getPagArtiAndDesc(usuario: Usuario, desc: string, page: number) {
    return this.http.get<any>(this.other.getUrl() + `/arti/listd/page/${usuario.cia}/${desc}/${page}`).pipe(
      map(rest => {
         // console.log(rest.content);
         return rest;
      })
    );
  }

  // METODO QUE NOS PERMITE TRAER TODOS LOS ARTICULOS CON SUS PRECIOS Y DESCRIPCION
  public getPagArtiAndCodigo(usuario: Usuario, cod: string, page: number) {
    return this.http.get<any>(this.other.getUrl() + `/arti/listc/page/${usuario.cia}/${cod}/${page}`).pipe(
      map(rest => {
         // console.log(rest.content);
         return rest;
      })
    );
  }

  // LISTA DE ARTICULOS POR DESCRIPCION LIKE
  public listaArtiDesc( cia: string, desc: string){
    return this.http.get<any>(this.other.getUrl() + `/arti/list/desc/${cia}/${desc}`).pipe(
      map(rest => {
         // console.log(rest);
         return rest;
      })
    );
  }
}
