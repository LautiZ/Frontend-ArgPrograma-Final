import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  persona: persona = new persona("", "", "", "");

  isLogged = false;
  isAdmin = false;

  constructor(public personaService: PersonaService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.cargarPersona();
    this.isAdminTest();
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  isAdminTest(): void {
    const admin = this.tokenService.getAuthorities().find(r => r == 'ROLE_ADMIN');
    
    if(admin != undefined) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  cargarPersona() {
    this.personaService.detail(1).subscribe(data => {
      this.persona = data
    })
  }
}
