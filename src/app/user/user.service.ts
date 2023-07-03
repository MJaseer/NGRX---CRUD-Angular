import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from './store/books';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  get():Observable<Books[]>{
    return this.http.get<Books[]>('http://localhost:3000/superHeroes')
  }

  create(payload:Books) {
    return this.http.post<Books>('http://localhost:3000/superHeroes',payload)
  }

  update(payload:Books){
    return this.http.put<Books>(`http://localhost:3000/superHeroes/${payload.id}`,payload)
  }

  delete(id:number) {
    return this.http.delete(`http://localhost:3000/superHeroes/${id}`)
  }
}
