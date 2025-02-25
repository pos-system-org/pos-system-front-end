import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
}
