import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
apiurl='https://localhost:44308/Customer';
  constructor(private http:HttpClient) {

   }

   LoadCustomer(){
     return this.http.get(this.apiurl);
   }
   SaveCustomer(customedata:any){
    return this.http.post(this.apiurl,customedata);
   }
   LoadCustomerbycode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  RemoveCustomer(id:any){
    return this.http.delete(this.apiurl+'/'+id);
  }

}
