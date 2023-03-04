import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/service/education.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit{
  education: Education[] = [];
  
  constructor(private eduS: EducationService, private tokenService: TokenService) {}

  isLogged = false;
  isAdmin = false;
  
  ngOnInit(): void {
    this.cargarEdu();
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

  cargarEdu(): void {
    this.eduS.list().subscribe(data => {
      this.education = data;
    })
  }

  deleteEdu(id?: number) {
    if(id != undefined) {
      this.eduS.delete(id).subscribe(data => {
        this.cargarEdu();
      }, err => {
        alert("🚫 No se pudo eliminar 🚫");
      })
    }
  }
}
