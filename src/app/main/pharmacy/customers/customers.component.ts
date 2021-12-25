import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Customers {
  id: number;
  customer_id: number;
  customer_name: string;
  mobile: number;
  email: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {

  customersData: Customers[] = [];
  custCols: string[] = ['select','id','name','mobile','email','actions'];
  custSource = new MatTableDataSource(this.customersData);

  constructor() { }

  ngOnInit() {}

  applyFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    this.custSource.filter = filterValue.trim().toLowerCase();
  }

}
