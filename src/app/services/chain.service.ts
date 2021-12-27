import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { base_url } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChainService {
  
  userData : any;
  constructor(private loading: LoadingController, private http: HttpClient) { 
    // console.log(localStorage.getItem('userInfo'));
  }

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

  getData(method, clinic_id = '', id = ''): Observable<any>{
    var url;
    if(id === '') {
      url = base_url + "/" + method + "/" + clinic_id
    }
    else {
      url = base_url + "/" + method + "/" + clinic_id + "/" + id;
    }     
    var data = this.http.get(url);
    return data;
  }

  async insertData(method, data){
    this.userData = JSON.parse(localStorage.getItem('userInfo'))
    let url = base_url + "/" + method;
    console.log(data)
    const loader = await this.loading.create({
      message: 'Getting Data'
    })
    await loader.present()
    let fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]);
    }
    fd.append('clinic_id', this.userData.clinic_id)
    fd.append('user_id', this.userData.user_id)
    this.http.post(url, fd).subscribe(async (res: any) => {
      if(res.code === '200'){
        this.showAlert('Success', 'Data Saved Successfully', 'success','#0f0')
        this.loading.dismiss();
        return res;
      }
      else if(res.code === '201') {
        this.showAlert('Error', res.message, 'error','#f00')
        this.loading.dismiss();
        return res;
      }      
    },async (error) => {
      this.showAlert('Error', 'Something went wrong', 'error','#f00')
      this.loading.dismiss();
      return false;
    });
  }

}
