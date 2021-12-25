import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { MatTable } from '@angular/material/table';
import { ChainService } from 'src/app/services/chain.service';

export interface Drugs {
  id: number,
  drugInfo: string,
  drugId: number,
  batchInfo: string,
  cost: number,
  amount: number,
  disc: number,
  max_disc: number,
  toPay: number,
  actions: string
};

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {

  DrugsData: Drugs[] = [];
  displayedColumns: string[] = ['id','drugInfo','batchInfo','quantity','cost','amount','disc','toPay','actions'];

  @ViewChild(MatTable) table: MatTable<Drugs>;
  @ViewChild(MatInput) drugsInp: MatInput;

  DrugSearchForm: FormGroup;
  drugsList: any = [];
  userData: any;
  totalPrice: any = "0.00";
  openDisc: boolean = false;

  constructor(private form: FormBuilder, private service: ChainService) {
  }

  ngOnInit() {   
    this.DrugSearchForm = this.form.group({
      search: ['', Validators.required]
    })
  }

  discount(disc) {
    if(disc.checked == true) {
      this.openDisc = true
    }
    else {
      this.openDisc = false
    }
  }

  drugSearch(drug_name) {
    if(this.DrugSearchForm.invalid) {
      return
    }
    this.userData = JSON.parse(localStorage.getItem('userInfo'))
    this.service.getData('invDrugSearch', this.userData.clinic_id, drug_name).subscribe((res: any) => {
      if(res.code === '200') {
        this.drugsList = res.result.inventory
      }      
    })
  }

  removeDrug(drug){
    this.DrugsData.splice(this.DrugsData.indexOf(drug), 1);
    this.table.renderRows();
  }



  addDrug(drug){
    console.log(drug)

    var i = this.DrugsData.length;
    var actions = ''
    var newDrugAr = {"id": i+1, "drugInfo": drug.drug_name, "drugId": drug.drug_id, "batchInfo": drug.batch_no, "cost": drug.cost,"amount": 0, "disc": 0, "max_disc": drug.max_disc, "toPay": 0, "actions": '<button mat-raised-button color="warn">Delete</button>'};
    this.DrugsData.push(newDrugAr)
    this.table.renderRows();
    this.drugsInp.value = '';
  }

  calculate(qty, i) {
    var amount = (this.DrugsData[i].cost * qty);
    console.log(amount)
    this.DrugsData[i].amount = amount
    this.DrugsData[i].toPay = amount
    console.log(this.DrugsData)
    this.totalPrice = this.calculateTotal()
    this.table.renderRows();

  }

  calculateTotal() {
    var total = 0;
    this.DrugsData.forEach((value) => {
      console.log(value)
      total += value.amount
      console.log(total)
    })
    return total.toFixed(2)
  }

}

