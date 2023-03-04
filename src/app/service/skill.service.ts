import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  URLs = environment.URL + 'hys/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(this.URLs + 'list');
  }

  public detail(id:number): Observable<Skill> {
    return this.httpClient.get<Skill>(this.URLs + `detail/${id}`);
  }

  public save(skill: Skill): Observable<any> {
    return this.httpClient.post<any>(this.URLs + 'create', skill);
  }

  public update(id: number, skill: Skill): Observable<any> {
    return this.httpClient.put<any>(this.URLs + `update/${id}`, skill);
  }

  public deletes(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URLs + `delete/${id}`);
  }
}
