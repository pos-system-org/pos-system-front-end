import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _http:HttpClient) { }
  url=environment.baseUrl
  public create(data: {
    description: string | null | undefined;
    unitPrice: string | null | undefined;
    qty: string | null | undefined;
  }):Observable<any>{
    return this._http.post(`${this.url}/api/v1/products`,data)
  }
  public getAll(searchText:any,page:any,size:any):Observable<any>{
    const params = new HttpParams()
      .set("searchText",searchText)
      .set("page",page)
      .set("size",size)
    return this._http.get(`${this.url}/api/v1/products`,{params})
  }
  public delete(id:any):Observable<any>{
    return this._http.delete(`${this.url}/api/v1/products/${id}`)
  }
  public update(data: {
    description: string | null | undefined;
    unitPrice: string | null | undefined;
    qty: string | null | undefined;
  },id:any):Observable<any>{
    return this._http.put(`${this.url}/api/v1/products/${id}`,data)
  }

  public getById(id: any):Observable<any> {
    return this._http.get(`${this.url}/api/v1/products/${id}`)
  }
  public productGetAll():Observable<any>{
    return this._http.get(`${this.url}/api/v1/products/productGet`)
  }
}
