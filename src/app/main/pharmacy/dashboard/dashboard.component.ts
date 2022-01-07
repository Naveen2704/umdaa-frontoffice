import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ChainService } from 'src/app/services/chain.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  drugs: any = [];
  sales: any = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(private service: ChainService) { 
  }

  ngOnInit() {
    this.getFinances()
    this.getDrugs()
  }  

  getFinances() {
    let UserData = JSON.parse(localStorage.getItem('userInfo'))
    this.service.getData('salesReport', UserData.clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.sales = res.result;
      }
    })
  }

  getDrugs() {
    let UserData = JSON.parse(localStorage.getItem('userInfo'))
    this.service.getData('latestDrugs', UserData.clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.drugs = res.result.drugs;
        console.log(this.drugs)
      }
    })
  }
  

}
