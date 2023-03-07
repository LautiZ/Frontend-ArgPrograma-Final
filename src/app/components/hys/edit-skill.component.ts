import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit{
  skill: Skill = null;

  constructor(private skillS: SkillService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.skillS.detail(id).subscribe(data => {
      this.skill = data;
    }, err => {
      alert('Error al modificar 🚫');
      this.router.navigate(['']);
    })
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    // this.skillS.update(id, this.skill).subscribe(data => {
    //   this.router.navigate(['']);
    // }, err => {
    //   alert('No se pudo actualizar 🚫');
    //   this.router.navigate(['']);
    // })

    Swal.fire({
      title: 'Estas seguro de guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.skillS.update(id, this.skill).subscribe(data => {
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
