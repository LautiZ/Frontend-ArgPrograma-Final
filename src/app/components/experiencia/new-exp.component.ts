import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';

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
      alert("Experiencia Creada 🔥");
      this.router.navigate(['']);
    }, err => {
      alert("Error al crear experiencia❗");
      this.router.navigate(['']);
    })
  }
}
