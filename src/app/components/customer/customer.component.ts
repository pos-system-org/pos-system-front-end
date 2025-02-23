import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerService} from "../../../services/customer-service/customer.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  form=new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required])
  })
  constructor(private _customerService: CustomerService) {
  }
  formSubmit(){
    const jsonData = {
      name: this.form.get("name")?.value,
      email: this.form.get("email")?.value,
      phone: this.form.get("phone")?.value,
      address: this.form.get("address")?.value,
      isActive:true
    };
    this._customerService.create(jsonData).subscribe({
      next:res=>{
        console.log(res)
      },error:err=>{
        console.log(err)
      }
    })
  }
}
