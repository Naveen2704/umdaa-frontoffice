import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChainService } from 'src/app/services/chain.service';
import { OrdersList } from '../interfaces/orders-list';
import { PrescriptionsComponent } from '../prescriptions/prescriptions.component';
import { InvoiceComponent } from './invoice/invoice.component';

export interface ViewOptions {
  sortField: string;
  sortDirection: string;
  page: number;
  pageSize: number;
}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {

  ordersData: OrdersList[] = [];
  ordersSource = new MatTableDataSource(this.ordersData);
  displayedColumns: string[] = ['id','invInfo','invDate','customerInfo','mobile','cost','amount_paid','payment_mode','transaction_id','actions'];
  ordersLength: any = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private service: ChainService, private route: ActivatedRoute, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ordersList()
    })    
  }

  async viewInvoice(billing_id) {
    const modal = await this.modalCtrl.create({
      component: InvoiceComponent,
      componentProps: { billing_id: billing_id },
      cssClass: 'invoice-modal'
    })
    await modal.present()
  }

  async prescriptionsModal() {
    const modal = await this.modalCtrl.create({
      component: PrescriptionsComponent
    })
    await modal.present();
  }

  ordersList() {
    let userData = JSON.parse(localStorage.getItem('userInfo'))
    this.service.getData('orders', userData.clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.ordersData = res.result.ordersData;
        this.ordersSource = new MatTableDataSource(this.ordersData)
        this.ordersLength = this.ordersSource.filteredData.length;
      }
    });
  }

}
