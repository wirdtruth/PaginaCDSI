import { Arccvc } from './../../models/Arccvc';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArccvcService } from './../../services/arccvc.service';
import { CompanyService } from './../../services/company.service';
import { Company } from 'src/app/models/company';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

  company$: Observable<Company[]>;
  vendedor: Array<Arccvc[]>;
  form: FormGroup;
  cia: string;
  codigo: string;
  pass: string;
  vende:Arccvc;
  compa:Company;
  constructor(private route: ActivatedRoute, private ciaServ: CompanyService, private venServ: ArccvcService, private router: Router) { }

  ngOnInit() {
    this.listarCias();
  }

  listarCias() {
    this.company$ = this.ciaServ.getListaCias();
  }
  obtenerVendedor() {
    this.venServ.getVendedor(this.cia, this.codigo, this.pass).subscribe(data => {
      Swal.close(); // SE CIERRA EL MENSAJE
      this.router.navigateByUrl('/dashboard/articulo');// NAVEGA HACIA EL HOME
    }, err => {
      if (err.status == 404) {
        console.error(err);
        Swal.close(); // SE CIERRA EL MENSAJE
        Swal.fire({
          allowOutsideClick: false, // CLICK FUERA
          icon: 'info',
          title: 'Usuario o Clave incorrecta !!'
        });
      }
    });
    this.guardarCampos();
  }
  guardarCampos() {
    if (this.cia !== null || this.cia !== 'undefined' || this.codigo !== null || this.codigo !== 'undefined' ||
      this.pass !== null || this.pass !== 'undefined') {
      sessionStorage.setItem('cia', this.cia.toString());
      sessionStorage.setItem('cod', this.codigo.toString());
    }
  }

}
