import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-exp',
  templateUrl: './new-exp.component.html',
  styleUrls: ['./new-exp.component.css']
})
export class NewExpComponent implements OnInit{
  titleE: string = '';
  descriptionE: string = '';

  constructor(private sExperiencia: SExperienciaService, private router: Router) {}

  ngOnInit(): void {

  }

  onCreate(): void {
    const exp = new Experiencia(this.titleE, this.descriptionE);
    this.sExperiencia.save(exp).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Experiencia añadida',
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
