import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/models/projects';
import { ProjectsService } from 'src/app/service/projects.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  projects: Projects[] = [];
  
  constructor(private tokenService: TokenService, private sProjects: ProjectsService) {}

  isLogged = false;
  isAdmin = false;
  
  ngOnInit(): void {
    this.cargarProjects();
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

  cargarProjects(): void {
    this.sProjects.lista().subscribe(
      data => {this.projects = data}
    )
  }

  deleteProject(id?: number): void {
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
          this.sProjects.delete(id).subscribe(data => {
            this.cargarProjects();
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
