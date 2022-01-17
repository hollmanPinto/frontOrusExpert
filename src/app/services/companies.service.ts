import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) {
    console.log('http service')
   }

   getCompanies():any{
     return this.http.get('https://djangoorus.herokuapp.com/company/')
   }
}
