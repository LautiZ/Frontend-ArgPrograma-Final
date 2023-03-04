import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/models/persona.model';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';

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
      private imageService: ImageService
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
    this.personaService.update(id, this.per).subscribe(data => {
      this.router.navigate(['']);
    }, err => {
      alert('No se pudo editar❗');
      this.router.navigate(['']);
    })
  }

  uploadImage($event: any) {
    this.imageService.uploadImage($event);
  }
}