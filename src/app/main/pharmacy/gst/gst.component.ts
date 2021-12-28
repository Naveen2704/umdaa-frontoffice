import { Component, OnInit } from '@angular/core';
import { ChainService } from 'src/app/services/chain.service';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.scss'],
})
export class GstComponent implements OnInit {

  toPaid: any = "0.00";
  paid: any = "0.00";
  profit: any = "0.00";

  constructor(private service: ChainService) { }

  ngOnInit() {
    this.gstInfo();
  }

  gstInfo() {
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    this.service.getData('gstNotPaid', userData.clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.toPaid = res.result.gstTobePaid;
        this.profit = res.result.profit;
      }
    });
  }

}
