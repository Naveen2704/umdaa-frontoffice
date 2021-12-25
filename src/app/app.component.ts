import { Component } from '@angular/core';
import { ChainService } from './services/chain.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(public service: ChainService) {
  }


  getInformation(){
    var data = this.service.getData('singleDrugInfo','2')
    console.log(data)
  }

  postInfo(){
    var data = [];
    this.service.insertData('sample', data)
  }

}
