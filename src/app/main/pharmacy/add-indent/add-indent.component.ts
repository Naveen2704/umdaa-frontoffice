import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ChainService } from 'src/app/services/chain.service';

export interface Indents {
  id: number;
  drugInfo: string;
  batch_no: string;
  remQty: number;
  vendor_id: number;
};

@Component({
  selector: 'app-add-indent',
  templateUrl: './add-indent.component.html',
  styleUrls: ['./add-indent.component.scss'],
})
export class AddIndentComponent implements OnInit {

  indentList: Indents[] = [];
  indentSource = new MatTableDataSource(this.indentList);
  indentCols: any = ['id','drugInfo','batchInfo','qty','expiryInfo','status','required','vendor'];

  userData: any = [];
  suppliersList: any;
  check: any = "";
  indentForm: FormGroup;

  constructor(private service: ChainService, private route: ActivatedRoute, private form: FormBuilder) { 
    this.route.params.subscribe(params => {
      this.getShortage()
      this.getSuppliers()
    })
    this.indentForm = this.form.group({
      indentFields: this.form.array([])
    });
  }

  ngOnInit() {}

  addFields() {
    const indentField = this.indentForm.controls.indentFields as FormArray
    indentField.push(this.form.group({
      drug_id: ['', Validators.required],
      batch_no: ['', Validators.required],
      reqQty: ['', Validators.required],
      supplierInfo: ['', Validators.required]
    }))
  }

  applyFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    this.indentSource.filter = filterValue.trim().toLowerCase();
    if (this.indentSource.paginator) {
      this.indentSource.paginator.firstPage();
    }
  }

  getShortage() {
    var method = 'shortage';
    this.userData = JSON.parse(localStorage.getItem('userInfo'))
    var clinic_id = this.userData.clinic_id;
    this.service.getData(method, clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.indentList = res.result.inventory;
        this.indentSource = new MatTableDataSource(this.indentList);
        this.addFields()
      }
    });
  }

  getSuppliers() {
    this.userData = JSON.parse(localStorage.getItem('userInfo'))
    this.service.getData('suppliers',this.userData.clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.suppliersList = res.result.vendors
      }
    });
  }

  toggleAll(event) {
    if(event.checked === true) {
      this.check = 'checked';
    }
    else {
      this.check = ''
    }
  }

}
