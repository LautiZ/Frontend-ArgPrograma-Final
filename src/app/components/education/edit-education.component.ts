import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/service/education.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit{
  edu: Education = null;

  constructor(private eduS: EducationService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.eduS.detail(id).subscribe(data => {
      this.edu = data;
    }, err => {
      alert('No se pudo editar❗');
      this.router.navigate(['']);
    })
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.eduS.update(id, this.edu).subscribe(data => {
      this.router.navigate(['']);
    }, err => {
      alert('No se pudo editar❗');
      this.router.navigate(['']);
    })
  }
}
