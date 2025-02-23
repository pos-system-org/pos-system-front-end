import { Routes } from '@angular/router';
import {CustomerComponent} from "./components/customer/customer.component";
import {ProductComponent} from "./components/product/product.component";
import {PlaceOrderComponent} from "./components/place-order/place-order.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

export const routes: Routes = [
  {path:'',redirectTo:'/customer',pathMatch:'full'},
  {path:'customer', component:CustomerComponent},
  {path:'product', component:ProductComponent},
  {path:'place-order', component:PlaceOrderComponent},
  {path:'**', component:NotFoundComponent}
];
