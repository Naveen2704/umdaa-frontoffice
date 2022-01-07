import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  FileToUpload: File;
  settingsInfo: any = [];

  constructor(private form: FormBuilder, private service: ChainService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.settingsView()
    })
    this.InfoForm = this.form.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      max_disc: ['', Validators.required],
      gst: [''],
      address: ['', Validators.required],
    })
    this.printSettingsForm = this.form.group({
      paper_type: ['', Validators.required],
      header_invoice: ['', Validators.required],
      footer_invoice:['', Validators.required],      
    })
  }

  settingsView() {
    let UserData = JSON.parse(localStorage.getItem('userInfo'))
    this.service.getData('settings', UserData.clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        // alert('hi')
        this.settingsInfo = res.result.settings;
        this.noFileImg = res.result.settings.logo;
      }
    })
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0] as File;
      this.FileToUpload = file;

      const reader = new FileReader();
      reader.onload = e => this.noFileImg = reader.result;

      reader.readAsDataURL(file);
    }
  }

  saveSettings() {
    if(this.InfoForm.invalid) {
      this.service.showAlert('Warning','Please enter all required fields','warning','#f00')
      return;
    }
    else {
      this.service.insertData('saveSettingsInfo', this.InfoForm.value, this.FileToUpload).then(() => {
        this.settingsView()
      })
      // console.log(res)
    }
  }


}
