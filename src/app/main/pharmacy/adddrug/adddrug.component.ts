import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { catchError, map, tap, startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';
import { ChainService } from 'src/app/services/chain.service';

@Component({
  selector: 'app-adddrug',
  templateUrl: './adddrug.component.html',
  styleUrls: ['./adddrug.component.scss'],
})
export class AdddrugComponent implements OnInit {

  drugSearchForm: FormGroup;
  addDrugForm: FormGroup;
  userData: any = JSON.parse(localStorage.getItem('userInfo'));
  drugsData: any = [];
  selectedDrugs: any = [];
  years: any = [];
  months: any = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  suppliersData: any = [];

  constructor(private form: FormBuilder, private service: ChainService, private router: Router, private route: ActivatedRoute) { 
    for(var i = new Date().getFullYear(); i < new Date().getFullYear() + 20;i++){
      this.years.push(i)
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getSuppliers();
    })
    
    this.drugSearchForm = this.form.group({
      drugName: ['', [Validators.required, Validators.minLength(3)]]
    })

    this.addDrugForm = this.form.group({
      drug_id: ['', Validators.required],
      hsn_code: ['', Validators.required],
      batch_no: ['', Validators.required],
      qty: [0, Validators.required],
      mrp: [0, Validators.required],
      pp: [0, Validators.required],
      pack_size: [0, Validators.required],
      rl: [0, Validators.required],
      igst: [0, Validators.required],
      cgst: [0, Validators.required],
      sgst: [0, Validators.required],
      max_disc: [0, Validators.required],
      expiry_month: ['', Validators.required],
      expiry_year: ['', Validators.required],
      suppliers: ['', Validators.required]
    });

  }

  addDrugs(){
    if(this.addDrugForm.invalid) {
      this.service.showAlert('Warning', 'Please fill all fields', 'warning', '#f00')
      return;
    }
    var res = this.service.insertData('addDrug', this.addDrugForm.value)
    this.router.navigate(['/inventory'])
  }

  drugsearch(drug) {
    if(this.drugSearchForm.invalid){ 
      return
    }
    this.service.getData('drugsList', drug).subscribe((res: any) => {
      if(res.code === '200') {
        this.drugsData = res.result.drugs;
      }
    });
  }

  drugInfo(info) {
    this.selectedDrugs[0] = info
    console.log(this.selectedDrugs)
  }

  removeSelected(index) {
    this.selectedDrugs.splice(this.selectedDrugs.indexOf(index), 1)
  }

  getSuppliers(){
    this.service.getData('suppliers',this.userData.clinic_id).subscribe((res: any) => {
      if(res.code === '200'){
        this.suppliersData = res.result.vendors;
      }      
    });
  }

}
