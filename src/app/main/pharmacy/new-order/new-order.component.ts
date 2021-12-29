import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChainService } from 'src/app/services/chain.service';
import { PurchaseComponent } from '../purchase/purchase.component';

export interface Drugs {
  id: number,
  drugInfo: string,
  drugId: number,
  batchInfo: string,
  cost: number,
  amount: number,
  disc: number,
  max_disc: number,
  igst: number,
  cgst: number,
  sgst: number,
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
  @ViewChild(MatFormField) transaction_id: MatFormField;

  DrugSearchForm: FormGroup;
  drugsList: any = [];
  userData: any;
  totalPrice: any = "0.00";
  openDisc: boolean = false;
  newBillForm: FormGroup;
  transactionShow: boolean = false;
  selectedAgeUnit: any = 'years';

  constructor(private form: FormBuilder, private service: ChainService, private router: Router) {
    this.DrugSearchForm = this.form.group({
      search: ['', Validators.required]
    });
    this.newBillForm = this.form.group({
      customer_name: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: [''],
      age: [''],
      age_unit: [''],
      payment_mode: ['', Validators.required],
      transactionID: [''],
      drugFields: this.form.array([])
    });
  }

  ngOnInit() {   
  }

  addDrugFields() {
    const drugField = this.newBillForm.controls.drugFields as FormArray
    drugField.push(this.form.group({
      drug_id: ['', Validators. required],
      batch_no: ['', Validators.required],
      qty: ['', Validators.required],
      discount: ['', Validators.required],
      amount: ['', Validators.required],
      unit_price: ['', Validators.required],
      disc_amount: ['', Validators.required],
      sgst: [''],
      cgst: [''],
      igst: ['']
    }))
  }

  discount(disc) {
    if(disc.checked == true) {
      this.openDisc = true
      this.calculateTotal(1)
    }
    else {
      this.openDisc = false
      this.calculateTotal(0)
    }    
  }

  paymentMode(val) {
    if(val == 'card' || val == "upi") {
      this.transactionShow = true
    }
    else {
      this.transactionShow = false
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
    if(this.openDisc == true) {
      this.calculateTotal(1)
    }
    else {
      this.calculateTotal(0)
    }
  }

  createBill(){
    var res = this.service.insertData("createOrder", this.newBillForm.value)
    this.router.navigate(['/orders'])
  }

  addDrug(drug){
    var i = this.DrugsData.length;
    var newDrugAr = {"id": i+1, "drugInfo": drug.drug_name, "drugId": drug.drug_id, "batchInfo": drug.batch_no, "cost": drug.cost,"amount": 0, "disc": 0, "max_disc": drug.max_disc, "cgst": drug.cgst, "igst": drug.igst, "sgst": drug.sgst, "toPay": 0, "actions": '<button mat-raised-button color="warn">Delete</button>'};
    this.DrugsData.push(newDrugAr)
    this.addDrugFields()
    this.drugsInp.value = '';
  }

  calculate(qty, i) {
    var amount = (this.DrugsData[i].cost * qty);
    this.DrugsData[i].amount = amount
    this.DrugsData[i].toPay = amount
    if(this.openDisc == true) {
      this.calculateTotal(1)
    }
    else {
      this.calculateTotal(0)
    }
  }

  calculateTotal(disc) {
    var total = 0;
    var i = 0;
    this.DrugsData.forEach((value) => {
      if(disc == 1) {
        var toPay = value.amount - ((value.amount*value.max_disc)/100)
      }
      else {
        var toPay = value.amount
      }
      this.DrugsData[i].toPay = toPay 
      total += toPay
      i++
    })
    this.totalPrice = total.toFixed(2)
  }

}

