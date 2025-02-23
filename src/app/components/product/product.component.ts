import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product-service/product.service";
@Component({
  selector: 'app-product',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
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
          console.log(response)
        },error:err => {
          console.log(err)
        }
      })
    }
  }
}
