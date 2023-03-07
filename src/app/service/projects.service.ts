import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Projects } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  URL = environment.URL + 'projects/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Projects[]> {
    return this.httpClient.get<Projects[]>(this.URL + 'list');
  }

  public detail(id: number): Observable<Projects> {
    return this.httpClient.get<Projects>(this.URL + `detail/${id}`)
  }

  public save(project: Projects): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'create', project);
  }

  public update(id: number, project: Projects): Observable<any> {
    return this.httpClient.put<any>(this.URL + `update/${id}`, project);
  }
  
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
}
