import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/service/education.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit{
  edu: Education = null;

  constructor(private eduS: EducationService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.eduS.detail(id).subscribe(data => {
      this.edu = data;
    }, err => {
      alert('No se pudo editar❗');
      this.router.navigate(['']);
    })
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    Swal.fire({
      title: 'Estas seguro de guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eduS.update(id, this.edu).subscribe(data => {
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
