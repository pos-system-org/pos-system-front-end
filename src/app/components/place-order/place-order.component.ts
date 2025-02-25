import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {OrderService} from "../../../services/order-service/order.service";
import {Observable} from "rxjs";
import {CustomerService} from "../../../services/customer-service/customer.service";
import {ProductService} from "../../../services/product-service/product.service";
import {NgForOf} from "@angular/common";
import {response} from "express";

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent implements OnInit {
  customerList: any = [];
  productList: any = [];
  customer:any=[]
  product:any[]=[]
  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService
  ) { }

  form = new FormGroup({
    customerId: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    productId: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    unitPrice: new FormControl("", [Validators.required]),
    qty: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
    order_qty: new FormControl("", [Validators.required]),
  });

  formSubmit() {
    console.log(this.form.value);
    const jsonData={
      date:new Date(this.form.get("date")?.value as string),
      nett: Number.parseFloat(<string>this.form.get("unitPrice")?.value) * Number.parseFloat(<string>this.form.get("order_qty")?.value) ,
      customer:this.customer ,
      products:this.product,
    }
    this.orderService.create(jsonData).subscribe({
      next:response=>{
        console.log(response)
      },error:err => {
        console.log(err)
      }
    })
  }

  getCustomer(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.customerService.getById(id).subscribe({
        next: response => {
          console.log(response.data);
          resolve(response.data);
        },
        error: err => {
          console.log(err);
          reject(err);
        }
      });
    });
  }

  getProduct(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.productService.getById(id).subscribe({
        next: response => {
          console.log(response.data);
          resolve(response.data);
        },
        error: err => {
          console.log(err);
          reject(err);
        }
      });
    });
  }

  ngOnInit(): void {
    this.loadCustomer();
    this.loadProduct();
  }

  customerChange($event: any) {
    if ($event.target.value !== "Select Customer") {
      this.getCustomer($event.target.value).then((result) => {
        this.form.get("name")?.setValue(result.name)
        this.form.get("email")?.setValue(result.email)
        this.form.get("phone")?.setValue(result.phone)
        this.customer=result
        console.log(result);
      });
    }
  }

  productChange($event: any) {
    if ($event.target.value !== "Select Product") {
      this.getProduct($event.target.value).then((result) => {
        this.form.get("description")?.setValue(result.description)
        this.form.get("unitPrice")?.setValue(result.unitPrice)
        this.form.get("qty")?.setValue(result.qty)
        this.product.push(result)
        console.log(result);
      });
    }
  }

  loadCustomer() {
    this.customerService.customGetAll().subscribe({
      next: response => {
        this.customerList = response.data;
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  loadProduct() {
    this.productService.productGetAll().subscribe({
      next: response => {
        this.productList = response.data;
        console.log(response);
      },
      error: err => console.log(err)
    });
  }
}
