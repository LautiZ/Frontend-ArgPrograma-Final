import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/models/persona.model';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css']
})
export class EditAcercaDeComponent implements OnInit{

  per: persona = null;

  constructor(
      private activatedRoute: ActivatedRoute, 
      private personaService: PersonaService, 
      private router: Router,
      public imageService: ImageService
    ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.personaService.detail(id).subscribe(data => {
      this.per = data;
    }, err => {
      alert('No se pudo editar❗');
      this.router.navigate(['']);
    })
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.per.img = this.imageService.url;
    Swal.fire({
      title: 'Estas seguro de guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.personaService.update(id, this.per).subscribe(data => {
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
    const name = "perfil_" + id;
    this.imageService.uploadImage($event, name);
  }

}
