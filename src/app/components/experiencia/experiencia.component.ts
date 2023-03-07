import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit{
  exp: Experiencia[] = [];

  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService) {}

  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.cargarExp();
    this.isAdminTest();
    
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  isAdminTest(): void {
    const admin = this.tokenService.getAuthorities().find(r => r == 'ROLE_ADMIN');
    
    if(admin != undefined) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  cargarExp(): void {
    this.sExperiencia.list().subscribe(
      data => {this.exp = data}
    )
  }

  deleteExp(id?: number): void {
    if(id != undefined) {
      Swal.fire({
        title: 'Estas seguro de eliminar?',
        text: "No vas a poder revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sExperiencia.delete(id).subscribe(data => {
            this.cargarExp();
          }, err => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'No se pudo eliminar',
              showConfirmButton: false,
              timer: 1500
            })
          })
          Swal.fire(
            'Eliminada!',
            'Se elimino la experiencia',
            'success'
          )
        }
      })
    }
  }
}

