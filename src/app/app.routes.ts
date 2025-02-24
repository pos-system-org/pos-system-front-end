import { Routes } from '@angular/router';
import {CustomerComponent} from "./components/customer/customer.component";
import {ProductComponent} from "./components/product/product.component";
import {PlaceOrderComponent} from "./components/place-order/place-order.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

export const routes: Routes = [
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'dashboard', component:DashboardComponent},
  {path:'customer', component:CustomerComponent},
  {path:'product', component:ProductComponent},
  {path:'place-order', component:PlaceOrderComponent},
  {path:'**', component:NotFoundComponent}
];
