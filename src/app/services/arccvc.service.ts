import { OtherService } from './other.service';
import { Arccvc } from './../models/Arccvc';
import { Company } from 'src/app/models/company';
import { Usuario } from './../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArccvcService {

  constructor(private http:HttpClient, private url:OtherService) { }

  getVendedores(cia:string){
    return this.http.get<Arccvc[]>(this.url.getUrl()+`/vendedores/list/${cia}`)
  }
  getVendedor(cia:string,codigo:string,pass:string){
    return this.http.get<Arccvc[]>(this.url.getUrl()+`/vendedores/vendedor/${cia}/${codigo}/${pass}`)
  }
}
