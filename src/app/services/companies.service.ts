import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  url='https://djangoorus.herokuapp.com/company/';
  constructor(private http: HttpClient) {
    console.log('http service')
   }

   getCompanies():any{
     return this.http.get(this.url)
   }
   addCompanies(data:any){
    return this.http.post(this.url,data)
   }
   setCompanies(data:any,putUrl:string){
    return this.http.put(putUrl,data)
   }
   deleteCompanies(putUrl:string){
    return this.http.delete(putUrl)
   }
}
