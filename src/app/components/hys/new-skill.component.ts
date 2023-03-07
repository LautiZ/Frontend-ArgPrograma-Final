import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit{
  name: string;
  time: number;

  constructor(private skillS: SkillService, private router: Router) {}

  ngOnInit(): void {
    
  }

  onCreate(): void {
    const skill = new Skill(this.name, this.time);
    this.skillS.save(skill).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Skill añadida',
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
    });
  }
}
