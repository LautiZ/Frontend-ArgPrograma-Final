import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/service/education.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-neweducation',
  templateUrl: './new-education.component.html',
  styleUrls: ['./new-education.component.css']
})
export class NewEducationComponent implements OnInit{
  titleEd: string;
  descriptionEd: string;

  constructor(private eduS: EducationService, private router: Router) {}

  ngOnInit(): void {
    
  }

  onCreate(): void {
    const edu = new Education(this.titleEd, this.descriptionEd);
    this.eduS.save(edu).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Educacion añadida',
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
