import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChainService } from 'src/app/services/chain.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  noFileImg: any = "assets/no-file.png";
  InfoForm: FormGroup;
  printSettingsForm: FormGroup;

  constructor(private form: FormBuilder, private service: ChainService) { }

  ngOnInit() {
    this.InfoForm = this.form.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      max_disc: ['', Validators.required],
      gst: ['', Validators.required],
      address: ['', Validators.required],
      logo: ['', Validators.required],
    })
    this.printSettingsForm = this.form.group({
      paper_type: ['', Validators.required],
      header_invoice: ['', Validators.required],
      footer_invoice:['', Validators.required],      
    })
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.noFileImg = reader.result;

      reader.readAsDataURL(file);
    }
  }

}
