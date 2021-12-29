import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ChainService } from 'src/app/services/chain.service';

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

  constructor(private service: ChainService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.customersList()
    })
  }

  applyFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    this.custSource.filter = filterValue.trim().toLowerCase();
  }

  customersList() {
    let userData = JSON.parse(localStorage.getItem('userInfo'))
    this.service.getData('customers', userData.clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.customersData = res.result.customers;
        console.log(this.customersData)
        this.custSource = new MatTableDataSource(this.customersData)
      }
    });
  }

}
