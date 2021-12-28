import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChainService } from 'src/app/services/chain.service';
import { OrdersList } from '../interfaces/orders-list';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {

  ordersData: OrdersList[] = [];
  ordersSource = new MatTableDataSource(this.ordersData);
  displayedColumns: string[] = ['id','invInfo','invDate','customerInfo','mobile','cost','amount_paid','payment_mode','transaction_id','actions'];

  constructor(private service: ChainService) { }

  ngOnInit() {
    this.ordersList()
  }

  ordersList() {
    let userData = JSON.parse(localStorage.getItem('userInfo'))
    this.service.getData('orders', userData.clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.ordersData = res.result.ordersData;
        this.ordersSource = new MatTableDataSource(this.ordersData)
        console.log(this.ordersSource)
      }
    });
  }

}
