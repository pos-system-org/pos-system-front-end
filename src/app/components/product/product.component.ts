import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product-service/product.service";
import {CommonModule} from "@angular/common";
import {response} from "express";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-product',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  id:any
  searchText=""
  page=0
  size=5
  productList:any[]=[]

  constructor(private _productService:ProductService) {
  }
  buttonName='Save Product';
  form=new FormGroup({
    description:new FormControl('',[Validators.required]),
    unitPrice:new FormControl('',[Validators.required]),
    qty:new FormControl('',[Validators.required])
  })
  formSubmit() {
    const jsonData={
      description:this.form.get("description")?.value,
      unitPrice:this.form.get("unitPrice")?.value,
      qty:this.form.get("qty")?.value,
    }
    if (this.buttonName=="Save Product"){
      this._productService.create(jsonData).subscribe({
        next:response=>{
          this.loadData()
          this.clear()
          console.log(response)
        },error:err => {
          console.log(err)
        }
      })
    }else {
      let data = {
        description:this.form.get("description")?.value,
        unitPrice:this.form.get("unitPrice")?.value,
        qty:this.form.get("qty")?.value,
      }
      this._productService.update(data,this.id).subscribe({
        next:res=>{
          this.loadData()
          this.clear()
          this.buttonName="Save Customer"
          console.log(res)
        },error:err => {
          console.log(err)
        }
      })
    }
  }
  private loadData(){
    this._productService.getAll(this.searchText,this.page,this.size).subscribe({
      next:response=>{
        this.productList=response.data.dataList
      },error:err => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.loadData()
  }
  productDelete(productId: any) {
    this._productService.delete(productId).subscribe({
      next:response=>{
        this.id=productId
        this.loadData()
        console.log(response)
      },error:err => {
        console.log(err)
      }
    })

  }

  productUpdate(productId: any) {
    this.buttonName = "Update Product"
    this._productService.getById(productId).subscribe({
      next:response=>{
        this.id=response.data.productId
        this.form.get("description")?.setValue(response.data.description)
        this.form.get("unitPrice")?.setValue(response.data.unitPrice)
        this.form.get("qty")?.setValue(response.data.qty)
      },error:err => {
        console.log(err)
      }
    })
  }
  public clear(){
    this.form.get("description")?.setValue("")
    this.form.get("unitPrice")?.setValue("")
    this.form.get("qty")?.setValue("")
  }
}
