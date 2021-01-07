import { VendedorDTO } from './../../DTO/VendedorDTO';
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

  companys: Company[] = [];
  companySeleccionada: Company;
  vendedor: Arccvc;
  idVende: IdArccvc;
  form: FormGroup;
  codEmpleado: string;

  constructor(private route: ActivatedRoute,
    private ciaServ: CompanyService,
    private venServ: ArccvcService,
    private router: Router) { }

  ngOnInit() {
    this.listarCias();
    this.idVende = new IdArccvc();
    this.vendedor = new Arccvc();

    this.form = new FormGroup({
      'cia': new FormControl(''),
      'codigo': new FormControl(''),
      'pass': new FormControl('')
    });
  }
  listarCias() {
    this.ciaServ.getListaCias().subscribe(data => {
      this.companys = data;
    });
  }
  obtenerVendedor() {

    this.companySeleccionada = this.form.value['cia'];
    this.idVende.codigo = this.form.value['codigo'];
    this.vendedor.pass = this.form.value['pass'];

    let vende = new VendedorDTO(this.companySeleccionada.cia,this.form.value['codigo'],this.form.value['pass'])

    this.venServ.getVendedor(vende).subscribe(data => {
      this.vendedor=data; // SE
      this.venServ.vendeCaja(vende).subscribe(x => {
        //console.log(x);
        this.codEmpleado = x.codEmp;
        Swal.close();
        this.guardarCampos();
        this.router.navigateByUrl('/dashboard/articulo');
      },err =>{
        if (err.status == 404) {
          Swal.close(); // SE CIERRA EL MENSAJE
          Swal.fire({
            allowOutsideClick: false, // CLICK FUERA
            icon: 'info',
            title: 'Vendedor no registrado'
          });
        }
      })
      // NAVEGA HACIA EL HOME
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

  }
  guardarCampos() {
    if (this.companySeleccionada != null && this.idVende != null && this.vendedor != null) {
      sessionStorage.setItem('cia', this.companySeleccionada.cia);
      sessionStorage.setItem('nomCia', this.companySeleccionada.nombre);
      sessionStorage.setItem('cod', this.idVende.codigo);
      sessionStorage.setItem('nombre',this.vendedor.descripcion);
      sessionStorage.setItem('codEmp',this.codEmpleado);
      console.log(sessionStorage.getItem('codEmp'));
    }
  }

}
