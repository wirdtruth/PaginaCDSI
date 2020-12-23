import { Company } from './../../models/company';
import { IdArccvc } from './../../models/IdArccvc';
import { Arccvc } from './../../models/Arccvc';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArccvcService } from './../../services/arccvc.service';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

  company$: Observable<Company[]>;
  vendedor: Arccvc;
  idVende: IdArccvc;
  company: Company;
  form: FormGroup;
  

  constructor(private route: ActivatedRoute,
    private ciaServ: CompanyService,
    private venServ: ArccvcService,
    private router: Router) { }

  ngOnInit() {
    this.listarCias();
    this.company = new Company();
    this.idVende = new IdArccvc();
    this.vendedor = new Arccvc();

    this.form = new FormGroup({
      'cia': new FormControl(''),
      'codigo': new FormControl(''),
      'pass': new FormControl('')
    });
  }
  listarCias() {
    this.company$ = this.ciaServ.getListaCias();
  }
  obtenerVendedor() {
    this.company.cia = this.form.value['cia'];
    this.idVende.codigo = this.form.value['codigo'];
    this.vendedor.pass = this.form.value['pass'];

    this.venServ.getVendedor(this.company, this.idVende, this.vendedor).subscribe(data => {
      Swal.close(); // SE CIERRA EL MENSAJE
      this.router.navigateByUrl('/dashboard/articulo');// NAVEGA HACIA EL HOME
    }, err => {
      if (err.status == 404) {
        //console.error(err);
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
    if (this.company != null && this.idVende != null && this.vendedor != null) {
      sessionStorage.setItem('cia', this.company.cia.toString());
      sessionStorage.setItem('cod', this.idVende.codigo.toString());
    }
  }

}
