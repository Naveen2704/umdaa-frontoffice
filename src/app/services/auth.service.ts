import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { base_url } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || ('false'))

  constructor(private http: HttpClient, private loading: LoadingController, private router: Router) { }

  showAlert(title, message, icon, color){
    Swal.fire({
      title: title,
      html: message,
      icon: icon,
      iconColor: color,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    })
  }

  setLoginStatus(value){
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', value)
  }

  get LoginStatus() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  loginUser(data){
    this.loading.create({
      message: 'Logging In'
    })
    let url = base_url + "/" + "login";
    let fd = new FormData();
    for(var key in data){
      fd.append(key , data[key])
    }
    console.log(fd)
    return this.http.post(url, fd).subscribe((data: any) => {
      if(data.code === '200'){
        localStorage.setItem('userInfo', JSON.stringify(data.result.userInfo))
        this.showAlert('Success', 'Logged in successfully', 'success', '#0f0')
        this.setLoginStatus(true)
        this.router.navigate(['/pharmacy_dashboard'])
      }
      else{
        this.showAlert('Error', data.message, 'error', '#f00')
        this.setLoginStatus(false)
      }
    }, (error) => {
      this.showAlert('Error', 'Something went wrong', 'error', '#f00')
      this.setLoginStatus(false)
    });
  }

}
