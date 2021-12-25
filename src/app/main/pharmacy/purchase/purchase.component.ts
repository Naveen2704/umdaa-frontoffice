import { Component, OnInit } from '@angular/core';
import { OrdersList } from '../interfaces/orders-list';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {

  ordersData: OrdersList[] = [];
  displayedColumns: string[] = ['id','invInfo','customerInfo','cost','discount','amount_paid','status','actions'];

  constructor() { }

  ngOnInit() {}

}
