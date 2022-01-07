import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChainService } from 'src/app/services/chain.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
    pieData :any = [];
    pieColumnNames: any = [];
    pieOptions: any = [];
    // pieOptions = {     
    //   is3D: true  
    // };
    
    BarData = [
      ["2012", 900, 390],
      ["2013", 1000, 400],
      ["2014", 1170, 440],
      ["2015", 1250, 480],
      ["2016", 1530, 540]
    ];
    BarColumnNames = ['Year', "Asia","Europe"];
    BarOptions = {     
      hAxis: {
        title: 'Year'
      },
      vAxis:{
        minValue:0
      }, 
      isStacked: true  
    };

  constructor(private service: ChainService) { }

  ngOnInit() {
    this.getFinances()
  }

  getFinances() {
    let UserData = JSON.parse(localStorage.getItem('userInfo'))
    this.service.getData('salesReport', UserData.clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        var result = res.result;
        this.pieData = [
          ['Overall Revenue', parseFloat(result.overall)],
          ['Out People Revenue', parseFloat(result.out_people)],
          ['Out People Discounts', parseFloat(result.out_disc)],
          ['Converted Revenue', parseFloat(result.converted)],
          ['Converted Discounts', parseFloat(result.converted_disc)]
        ]
        this.pieColumnNames = ['Revenue', 'Name']
        this.pieOptions = {
          is3D: true,
          legend: true,
          
        }
        console.log(this.pieData)
      }
    })
  }

  drawChart() {

  }

}
