import { PedidoDTO } from './../DTO/PedidoDTO';
import { HttpClient } from '@angular/common/http';
import { OtherService } from './other.service';
import { Arpfoe } from './../models/Arpfoe';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  pedidoCreado = new Subject<Arpfoe[]>();
  mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient, private url: OtherService) { }

  registraPedido(pedido: PedidoDTO){
    return this.http.post(this.url.getUrl()+`/pedidos`,pedido);
  }

}
