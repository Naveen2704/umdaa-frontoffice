import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ChainService } from 'src/app/services/chain.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {

  billing_id: any;
  data: boolean = false;
  billingInfo: any = [];
  lineItems: any = [];
  pharmacyInfo: any = [];

  constructor(private service: ChainService, private modalCtrl: ModalController, private navParams: NavParams) { 
    this.billing_id = this.navParams.get('billing_id');
    this.getBillingInfo(this.billing_id);
  }

  ngOnInit() {}

  getBillingInfo(billing_id) {
    this.service.getData('invoice', billing_id).subscribe((res: any) => {
      if(res.code === "200") {
        console.log(res)
        this.billingInfo =res.result.billingInfo;
        this.pharmacyInfo =res.result.pharmacyInfo;
        this.lineItems =res.result.billingLineItems;
      }
    })
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

}
