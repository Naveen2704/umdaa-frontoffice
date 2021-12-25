import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChainService } from 'src/app/services/chain.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent implements OnInit {

  saveSupplierForm: FormGroup;

  constructor(private form: FormBuilder, private service: ChainService, private router: Router) { 
    this.saveSupplierForm = this.form.group({
      store_name: ['', Validators.required],
      location: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      contact_person: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {}

  saveSupplier(){
    if(this.saveSupplierForm.invalid){
      this.service.showAlert('Warning', 'Please fill all fields', 'warning', '#f00');
      return;
    }
    this.service.insertData('addSupplier', this.saveSupplierForm.value);
    this.router.navigate(['/suppliers'])
  }

}
