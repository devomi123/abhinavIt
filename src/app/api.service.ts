import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http:HttpClient) { }

  baseurl = "http://localhost:8081/product/"

  saveProduct(api:any, data:any){
    return this.http.post(this.baseurl+api, data)
  }

  protectList(api:any){
    return this.http.post(this.baseurl+api,{});
  }

   post(api:String, data:any){
    const headers = {'Content-type': 'application/json'};
    const body = JSON.stringify(data);
    return this.http.post(this.baseurl + api, body, {'headers': headers});
  
  }

  // getProduct(api:String, data:any){
  //   return this.http.get(this.baseurl+api, data);
  // }
}
