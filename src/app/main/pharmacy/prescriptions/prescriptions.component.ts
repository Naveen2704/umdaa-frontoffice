import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChainService } from 'src/app/services/chain.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss'],
})
export class PrescriptionsComponent implements OnInit {

  prescriptionsList: any = [];
  constructor(private service: ChainService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.prescriptionsList()
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  prescriptions() {
    let UserData = JSON.parse(localStorage.getItem('userInfo'))
    this.service.getData('prescriptions', UserData.clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.prescriptionsList = res.result.prescriptions;
      }
    })
  }


}
