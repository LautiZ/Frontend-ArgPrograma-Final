import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/service/education.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit{
  education: Education[] = [];
  
  constructor(private eduS: EducationService, private tokenService: TokenService) {}

  isLogged = false;
  isAdmin = false;
  
  ngOnInit(): void {
    this.cargarEdu();
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

  cargarEdu(): void {
    this.eduS.list().subscribe(data => {
      this.education = data;
    })
  }

  deleteEdu(id?: number) {
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
          this.eduS.delete(id).subscribe(data => {
            this.cargarEdu();
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
            'Se elimino la educacion',
            'success'
          )
        }
      })
    }
  }
}
