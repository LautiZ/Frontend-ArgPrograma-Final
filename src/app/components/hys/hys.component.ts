import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit{

  skill: Skill[] = [];

  constructor(private skillS: SkillService, private tokenService: TokenService) {}

  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.cargarSkills();
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

  cargarSkills(): void {
    this.skillS.list().subscribe(data => {
      this.skill = data;
    })
  }

  deletes(id: number): void {
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
          this.skillS.deletes(id).subscribe(data => {
            this.cargarSkills();
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
            'Se elimino la skill',
            'success'
          )
        }
      })
    }
  }
}
