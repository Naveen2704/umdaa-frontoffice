import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChainService } from 'src/app/services/chain.service';
import { GstTOBeComponent } from './gst-tobe/gst-tobe.component';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.scss'],
})
export class GstComponent implements OnInit {

  gstList: any = [];

  constructor(private service: ChainService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.gstInfo();
  }

  async gstToBe(amount, date) {
    const modal = await this.modalCtrl.create({
      component: GstTOBeComponent,
      componentProps: { value: amount, date: date }
    })
    await modal.present();
    await modal.onDidDismiss().then(() => {
      this.gstInfo()
    })
  }

  gstInfo() {
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    this.service.getData('gstNotPaid', userData.clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.gstList = res.result;
      }
    });
  }

  cleargst() {
    let userData = JSON.parse(localStorage.getItem('userInfo'))
    // this.service.getData('')
  }

}
