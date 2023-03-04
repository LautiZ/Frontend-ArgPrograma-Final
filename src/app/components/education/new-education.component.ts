import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/service/education.service';

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
      alert("Educacion añadida 🔥");
      this.router.navigate(['']);
    }, err => {
      alert("No se pudo crear❗");
      this.router.navigate(['']);
    })
  }
}
