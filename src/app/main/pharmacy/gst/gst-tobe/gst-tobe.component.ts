import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ChainService } from 'src/app/services/chain.service';

@Component({
  selector: 'app-gst-tobe',
  templateUrl: './gst-tobe.component.html',
  styleUrls: ['./gst-tobe.component.scss'],
})
export class GstTOBeComponent implements OnInit {

  value: any;
  date: any;
  constructor(private modalCtrl: ModalController, private navParams: NavParams, private service: ChainService) { 
    this.value = this.navParams.get('value');
    this.date = this.navParams.get('date');
  }

  ngOnInit() {}

  cleargst() {
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    this.service.getData('clearGst', userData.clinic_id).subscribe((res: any) => {
      if(res.code === "200") {
        this.service.showAlert('Success','GST Cleared','success','#0f0');
        this.modalCtrl.dismiss();
      }
    })
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }


}
