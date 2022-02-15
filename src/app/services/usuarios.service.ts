import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url='http://localhost:8080/user';
  constructor(private http: HttpClient) {
    console.log('http service')
   }

   getUsers():any{
     return this.http.get(this.url)
   }
   addUsers(data:any){
    return this.http.post(this.url,data)
   }
   setUsers(data:any){
    return this.http.post(this.url,data)
   }
   deleteUsers(id:string){
    return this.http.delete(`${this.url}/${id}`)
   }
}
