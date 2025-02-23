import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
}
