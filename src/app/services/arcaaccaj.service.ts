import { DatosCajaDTO } from './../DTO/DatosCajaDTO';
import { Arcaaccaj } from './../models/Arcaaccaj';
import { HttpClient } from '@angular/common/http';
import { OtherService } from './other.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArcaaccajService {

  constructor(private http:HttpClient, private url:OtherService) { }

  aperturaCaja(caja: Arcaaccaj){
    return this.http.post<Arcaaccaj>(this.url.getUrl()+`/cajas`,caja);
  }
  traerCaja(datos: DatosCajaDTO){
    return this.http.post<Arcaaccaj>(this.url.getUrl()+`/cajas/caja`,datos);
  }
}
