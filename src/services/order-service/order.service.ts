import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url=environment.baseUrl
  constructor(private _http:HttpClient) { }
  public create(data:any):Observable<any>{
    return this._http.post(`${this.url}/api/v1/orders`,data)
  }

  public getAll(searchText: any, page: any, size: any):Observable<any> {
    const params=new HttpParams()
      .set("searchText",searchText)
      .set("page",page)
      .set("size",size)
    return this._http.get(`${this.url}/api/v1/orders`, {params})
  }
}
