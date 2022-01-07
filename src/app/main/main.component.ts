import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ToDoListsComponent } from './pharmacy/to-do-lists/to-do-lists.component';
import { TodoComponent } from './pharmacy/todo/todo.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  selectedUrl: any = 'pharmacy_dashboard';
  public appPages = [
    { title: 'Dashboard', url: '/pharmacy_dashboard', icon: 'fa-tachometer-alt' },
    { title: 'Inventory', url: '/inventory', icon: 'fa-dolly-flatbed' },
    { title: 'Orders', url: '/orders', icon: 'fa-shopping-cart' },
    { title: 'Suppliers', url: '/suppliers', icon: 'fa-ambulance' },
    { title: 'Customers', url: '/pharmacy_customers', icon: 'fa-users' },
    { title: 'Indent', url: '/indent', icon: 'fa-indent' },
    { title: 'GST Filing', url: '/gst', icon: 'fa-file-contract' },
    { title: 'Settings', url: '/pharmacy_settings', icon: 'fa-cogs' },
    { title: 'Reports', url: '/pharmacy_reports', icon: 'fa-chart-line' },
  ];

  constructor(private route: ActivatedRoute, private router: Router, private modal: ModalController, private loader: LoadingController) { 
    this.selectedUrl = router.url
  }

  ngOnInit() {}

  changeUrl(url){
    // console.log(i)
    console.log(url)
    this.selectedUrl = url
  }

  async logout() {
    const load = await this.loader.create({
      message: 'Logging Out'
    })
    load.present()
    localStorage.clear()
    load.dismiss()
    this.router.navigate(['/auth'])
  }

  async createNewAction() {
    const modal = await this.modal.create({
      component: TodoComponent,
      animated: true,
      cssClass: 'modal-sm-ion'
    })
    return await modal.present()
  }

  async todolist() {
    const modal = await this.modal.create({
      component: ToDoListsComponent,
      cssClass: 'modal-sm-ion',
      animated: true
    })
    return await modal.present()
  }


}
