import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ChainService } from 'src/app/services/chain.service';
import { Suppliers } from '../interfaces/suppliers';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
})
export class SuppliersComponent implements OnInit {
  userData = JSON.parse(localStorage.getItem('userInfo'));

  @ViewChild(MatTable) table: MatTable<Suppliers>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  suppliersData: Suppliers[] = [];
  suppliersCols: string[] = ['id','storeName','contactPerson','mobile','email','address','location','actions'];
  suppliersSource = new MatTableDataSource(this.suppliersData);

  constructor(private service: ChainService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params => {
      this.getSuppliers();
    }))
  }

  applyFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    this.suppliersSource.filter = filterValue.trim().toLowerCase();
    if (this.suppliersSource.paginator) {
      this.suppliersSource.paginator.firstPage();
    }
  }

  getSuppliers(){
    this.service.getData('suppliers',this.userData.clinic_id).subscribe((res: any) => {
      if(res.code === '200'){
        this.suppliersData = res.result.vendors;
        console.log(this.suppliersData)
        this.suppliersSource = new MatTableDataSource(this.suppliersData);
        console.log(this.suppliersSource)
        this.suppliersSource.paginator = this.paginator;
        this.suppliersSource.sort = this.sort;
        this.table.renderRows();
      }      
    });
  }

}
