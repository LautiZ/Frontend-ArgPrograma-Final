import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-exp',
  templateUrl: './edit-exp.component.html',
  styleUrls: ['./edit-exp.component.css']
})
export class EditExpComponent implements OnInit{
  exp: Experiencia = null;

  constructor(private sExperiencia: SExperienciaService, private activatedRouter: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.detail(id).subscribe(data => {
      this.exp = data;
    }, err => {
      alert("Error al modificar❗");
      console.log("hola")
      this.router.navigate(['']);
    })
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];

    Swal.fire({
      title: 'Estas seguro de guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.sExperiencia.update(id, this.exp).subscribe(data => {
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
}
