import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
}
