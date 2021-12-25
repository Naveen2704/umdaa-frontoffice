import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinValidator, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  loginForm: FormGroup;
  constructor(private form: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    if(this.loginForm.invalid){
      this.authService.showAlert('Warning', 'Please enter all fields', 'warning', '#f00')
      return
    }
    else{
      var data = this.authService.loginUser(this.loginForm.value)
    }
  }

}
