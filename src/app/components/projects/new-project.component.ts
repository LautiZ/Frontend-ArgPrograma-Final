import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projects } from 'src/app/models/projects';
import { ImageService } from 'src/app/service/image.service';
import { ProjectsService } from 'src/app/service/projects.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit{

  title: string = '';
  subtitle: string = '';
  description: string = '';
  imgProject: string = "Añadir imagen";
  linkProject: string = "";

  constructor(private router: Router, private sProject: ProjectsService) {}

  ngOnInit(): void {
  }

  onCreate(): void {
    console.log("Hola");
    
    const project = new Projects(this.title, this.subtitle, this.description, this.imgProject, this.linkProject);
    this.sProject.save(project).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Proyecto añadido',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['']);
    }, err => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al añadir',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['']);
    })
  }
}
