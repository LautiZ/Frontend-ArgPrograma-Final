import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projects } from 'src/app/models/projects';
import { ImageService } from 'src/app/service/image.service';
import { ProjectsService } from 'src/app/service/projects.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit{

  project: Projects = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public imageService: ImageService,
    public projectService: ProjectsService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.projectService.detail(id).subscribe(data => {
      this.project = data;
    }, err => {
      alert('No se pudo editar❗');
      this.router.navigate(['']);
    })
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.project.imgProject = this.imageService.url;
    Swal.fire({
      title: 'Estas seguro de guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.projectService.update(id, this.project).subscribe(data => {
          this.router.navigate(['']);
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo editar❗',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['']);
        })
        Swal.fire({
          title: 'Guardando los cambios...',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (result.isDenied) {
        this.router.navigate(['']);
        Swal.fire('Cambios no guardados', '', 'warning')
      }
    })
  }

  uploadImage($event: any) {
    const id = this.activatedRoute.snapshot.params['id'];
    const name = "project_" + id;
    this.imageService.uploadImage($event, name);
  }
}
