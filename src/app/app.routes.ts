import { Routes } from '@angular/router';
import {CustomerComponent} from "./components/customer/customer.component";
import {ProductComponent} from "./components/product/product.component";
import {PlaceOrderComponent} from "./components/place-order/place-order.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AllOrderHistoryComponent} from "./components/all-order-history/all-order-history.component";
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";

export const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'sign-up', component:SignUpComponent},
  {path:'dashboard', component:DashboardComponent,children:[
      {path:'',redirectTo:'customer',pathMatch:'full'},
      {path:'customer', component:CustomerComponent},
      {path:'product', component:ProductComponent},
      {path:'place-order', component:PlaceOrderComponent},
      {path:'all-order-history', component:AllOrderHistoryComponent},
    ]},
  {path:'**', component:NotFoundComponent}
];
