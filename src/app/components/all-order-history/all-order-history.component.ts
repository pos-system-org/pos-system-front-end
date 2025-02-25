import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {OrderService} from "../../../services/order-service/order.service";

@Component({
  selector: 'app-all-order-history',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './all-order-history.component.html',
  styleUrl: './all-order-history.component.scss'
})
export class AllOrderHistoryComponent implements OnInit{
  orderList:any[]=[]
  searchText="";
  page=0;
  size=5;
constructor(private orderService:OrderService) {
}
  ngOnInit(): void {
    this.loadOrder();

  }

  private loadOrder() {
    this.orderService.getAll(this.searchText, this.page, this.size).subscribe({
      next:response=>{
        console.log(response)
        this.orderList=response.data.dataList
      },error:err => {
        console.log(err)
      }
    })
  }
}
