import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url=environment.baseUrl;
  constructor(private _http : HttpClient) { }
  public create(data: {
    address: string | null | undefined;
    phone: string | null | undefined;
    name: string | null | undefined;
    isActive: boolean;
    email: string | null | undefined
  }):Observable<any>{
    return this._http.post(`${this.url}/api/v1/customers`,data)
  }

  public getAll(searchText:any,page:any,size:any):Observable<any>{
    const params=new HttpParams()
      .set("searchText",searchText)
      .set("page",page)
      .set("size",size)
    return this._http.get(`${this.url}/api/v1/customers`,{params})
  }
  public getById(id:any):Observable<any>{
    return this._http.get(`${this.url}/api/v1/customers/${id}`)
  }
  public update(data:  {
    address: string | null | undefined;
    phone: string | null | undefined;
    name: string | null | undefined;
    isActive: boolean;
    email: string | null | undefined
  }, id: any):Observable<any>{
    return this._http.put(`${this.url}/api/v1/customers/${id}`,data)
  }
  public delete(id:any):Observable<any>{
    return this._http.delete(`${this.url}/api/v1/customers/${id}`)
  }

  public customGetAll():Observable<any>{
    return this._http.get(`${this.url}/api/v1/customers/customGet`)
  }
}
