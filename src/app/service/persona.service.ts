import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  URL = environment.URL + 'personas/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<persona[]> {
    return this.httpClient.get<persona[]>(this.URL + 'list');
  } 

  public detail(id: number): Observable<persona> {
    return this.httpClient.get<persona>(this.URL + `detail/${id}`)
  }

  // public save(per: persona): Observable<any> {
  //   return this.httpClient.post<any>(this.URL + 'create', per);
  // }

  public update(id: number, per: persona): Observable<any> {
    return this.httpClient.put<any>(this.URL + `update/${id}`, per);
  }

  // public delete(id: number): Observable<any> {
  //   return this.httpClient.delete<any>(this.URL + `detail/${id}`);
  // }
}
