import { TapUsuPven } from './../../models/TapUsuPven';
import { TapusupvenService } from './../../services/tapusupven.service';
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
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

  id: number;
  titulo:string;
  companys: Company[] = [];
  companySeleccionada: Company;
  vendedor: Arccvc;
  idVende: IdArccvc;
  usuario: TapUsuPven[]=[];
  form: FormGroup;
  codEmpleado: string;

  constructor(
    private route: ActivatedRoute,
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

    this.route.params.subscribe((data:Params) =>{
      this.id=data['id'];
      if(this.id==1){
        this.titulo="ARTICULOS";
      }else{
        this.titulo="VENTAS";
      }
    })

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

    let vende = new VendedorDTO(this.companySeleccionada.cia, this.form.value['codigo'], this.form.value['pass'])
    this.venServ.getVendedor(vende).subscribe(data => {
      this.vendedor = data; // SE
      this.venServ.vendeCaja(vende).subscribe(x => {
        this.codEmpleado = x.codEmp;
        Swal.close();
        this.guardarCampos();
        if(this.id==1){
          this.router.navigateByUrl('/dashboard/articulo');
        }else{
          this.router.navigateByUrl('/dashboard/caja');
        }

      }, err => {
        if (err.status == 404) {
          Swal.close();
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Vendedor no registrado'
          });
        }
      })
    }, err => {
      if (err.status == 404) {
        Swal.close();
        Swal.fire({
          allowOutsideClick: false,
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
      sessionStorage.setItem('nombre', this.vendedor.descripcion);
      sessionStorage.setItem('codEmp', this.codEmpleado);
      //console.log(sessionStorage.getItem('codEmp'));
    }
  }
}
