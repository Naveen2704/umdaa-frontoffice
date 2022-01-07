import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ChainService } from 'src/app/services/chain.service';
import { DrugsList } from '../interfaces/drugs-list';
import { InventoryList } from '../interfaces/inventory-list';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  inventoryList: InventoryList[] = [];
  shortageList: DrugsList[] = [];
  expiringSoonList: DrugsList[] = [];
  expiredList: DrugsList[] = [];

  inventoryCols: string[] = ['id','drugInfo','batchInfo','expiryDate','quantity','mrp','purchaseCost','drugCost','max_disc','rl','actions'];
  drugsCols: string[] = ['id','drugInfo','batchInfo','expiryDate','quantity','actions'];

  inventoryValue: any = '0.00';
  userData: any = JSON.parse(localStorage.getItem('userInfo'))

  invSource = new MatTableDataSource(this.inventoryList);
  shortSource = new MatTableDataSource(this.shortageList);
  expSoonSource = new MatTableDataSource(this.expiringSoonList);
  expSource = new MatTableDataSource(this.expiredList);

  constructor(private service: ChainService, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {   
    // this.router.changes
    this.router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationStart)).subscribe(() => {
      this.inventory();
    })
    this.inventory();
  }

  tabClick(tab) {
    console.log(tab)
    if(tab.index == 0) {
      this.inventory();
    }
    else if(tab.index == 1) {
      this.shortage()
    }
    else if(tab.index == 2) {
      this.expiringSoon()
    }
    else if(tab.index == 3) {
      this.expired()
    }
  }

  applyInventoryFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    this.invSource.filter = filterValue.trim().toLowerCase();
  }

  applyShortageFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    this.shortSource.filter = filterValue.trim().toLowerCase();
  }

  applyExpSoonFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    this.expSoonSource.filter = filterValue.trim().toLowerCase();
  }

  applyExpFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    this.expSource.filter = filterValue.trim().toLowerCase();
  }

  delete(drug_id) {
    Swal.fire({
      title: 'Are you sure?',
      html: 'Click yes to delete the drug from inventory',
      icon: 'warning',
      iconColor: '#f00',
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      showCancelButton: true
    }).then((res)=>{
      if(res.isConfirmed == true) {
        this.service.getData('deleteDrug', drug_id).subscribe((res: any) => {
          if(res.code === '200') {
            this.service.showAlert('Success', 'Drug Deleted Successfully', 'success','#0f0')
            this.inventory()
          }
          else {
            this.service.showAlert('Error', 'Something went wrong.', 'warning','#f00')
          }
        })
      }
    })
  }
  
  inventory() {
    var method = 'inventory'
    var clinic_id = this.userData.clinic_id;
    this.service.getData(method, clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.inventoryList = res.result.inventory;
        this.inventoryValue = res.result.totalValue;
        this.invSource = new MatTableDataSource(this.inventoryList);
      }
    });
  }
  
  shortage() {
    var method = 'shortage';
    var clinic_id = this.userData.clinic_id;
    this.service.getData(method, clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.shortageList = res.result.inventory;
        console.log(this.shortageList)
        this.shortSource = new MatTableDataSource(this.shortageList);
      }
    });
  }
  
  expiringSoon() {
    var method = 'expiringSoon';
    var clinic_id = this.userData.clinic_id;
    this.service.getData(method, clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.expiringSoonList = res.result.inventory;
        this.expSoonSource = new MatTableDataSource(this.expiringSoonList);
      }
    });
  }
  
  expired() {
    var method = 'expired';
    var clinic_id = this.userData.clinic_id;
    this.service.getData(method, clinic_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.expiredList = res.result.inventory;
        this.expSource = new MatTableDataSource(this.expiredList);
      }
    });
  }

}
