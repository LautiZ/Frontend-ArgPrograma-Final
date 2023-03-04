import { Component, OnInit } from '@angular/core';

import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-componente-prueba',
  templateUrl: './componente-prueba.component.html',
  styleUrls: ['./componente-prueba.component.css']
})
export class ComponentePruebaComponent implements OnInit {

  constructor(public personaService: PersonaService) {}

  ngOnInit(): void {
    
  }
}
