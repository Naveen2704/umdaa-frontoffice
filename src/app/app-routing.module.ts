import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { MainComponent } from './main/main.component';
import { AddIndentComponent } from './main/pharmacy/add-indent/add-indent.component';
import { AddSupplierComponent } from './main/pharmacy/add-supplier/add-supplier.component';
import { AdddrugComponent } from './main/pharmacy/adddrug/adddrug.component';
import { BillingsComponent } from './main/pharmacy/billings/billings.component';
import { CustomersComponent } from './main/pharmacy/customers/customers.component';
import { DashboardComponent } from './main/pharmacy/dashboard/dashboard.component';
import { GstComponent } from './main/pharmacy/gst/gst.component';
import { IndentComponent } from './main/pharmacy/indent/indent.component';
import { InventoryComponent } from './main/pharmacy/inventory/inventory.component';
import { NewOrderComponent } from './main/pharmacy/new-order/new-order.component';
import { PurchaseComponent } from './main/pharmacy/purchase/purchase.component';
import { ReportsComponent } from './main/pharmacy/reports/reports.component';
import { SettingsComponent } from './main/pharmacy/settings/settings.component';
import { SuppliersComponent } from './main/pharmacy/suppliers/suppliers.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainModule)
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'pharmacy_dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'inventory',
        component: InventoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'orders',
        component: PurchaseComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'addSupplier',
        component: AddSupplierComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'pharmacy_customers',
        component: CustomersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'indent',
        component: IndentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'pharmacy_billings',
        component: BillingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'pharmacy_settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'pharmacy_reports',
        component: ReportsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'newDrug',
        component: AdddrugComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'newOrder',
        component: NewOrderComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'addIndent',
        component: AddIndentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'gst',
        component: GstComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
