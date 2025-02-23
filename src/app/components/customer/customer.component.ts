import {Component, OnInit} from '@angular/core';
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
export class CustomerComponent implements OnInit{
  customerId:any
  buttonName="Save Customer"
  customerList:any[]=[]
  searchText=""
  page=0
  size=5
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
    if (this.buttonName=="Save Customer"){
      this._customerService.create(jsonData).subscribe({
        next:res=>{
          this.loadTable()
          console.log(res)
        },error:err=>{
          console.log(err)
        }
      })
    }else {
      let data = {
        name:this.form.get("name")?.value,
        email:this.form.get("email")?.value,
        phone:this.form.get("phone")?.value,
        address:this.form.get("address")?.value,
        isActive:true
      }
      this._customerService.update(data,this.customerId).subscribe({
        next:res=>{
          this.loadTable()
          this.buttonName="Save Customer"
          console.log(res)
        },error:err => {
          console.log(err)
        }
      })
    }
  }

  ngOnInit(): void {
    this.loadTable()
  }

  customerDelete(propertyId: any) {
    this._customerService.getById(propertyId).subscribe({
      next:res=>{
        this.customerId=propertyId
        console.log(res)
      },error:err => {
        console.log(err)
      }
    })
  }

  customerUpdate(propertyId: any) {
    this.buttonName="Update Customer"
    this._customerService.getById(propertyId).subscribe({
      next:response=>{
        this.customerId=response.data.propertyId
        this.form.get("name")?.setValue(response.data.name)
        this.form.get("email")?.setValue(response.data.email)
        this.form.get("phone")?.setValue(response.data.phone)
        this.form.get("address")?.setValue(response.data.address)
      },error:err => {
        console.log(err)
      }
    })
  }

  private loadTable() {
    this._customerService.getAll(this.searchText,this.page,this.size).subscribe({
      next:response=>{
        this.customerList=response.data.dataList
      },error:err => {
        console.log(err)
      }
    })
  }
}
