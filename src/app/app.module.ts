import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { MaterialModule } from './material/material.module';
import { InventoryComponent } from './main/pharmacy/inventory/inventory.component';
import { DashboardComponent } from './main/pharmacy/dashboard/dashboard.component';
import { PurchaseComponent } from './main/pharmacy/purchase/purchase.component';
import { SuppliersComponent } from './main/pharmacy/suppliers/suppliers.component';
import { CustomersComponent } from './main/pharmacy/customers/customers.component';
import { IndentComponent } from './main/pharmacy/indent/indent.component';
import { BillingsComponent } from './main/pharmacy/billings/billings.component';
import { SettingsComponent } from './main/pharmacy/settings/settings.component';
import { ReportsComponent } from './main/pharmacy/reports/reports.component';
import { AdddrugComponent } from './main/pharmacy/adddrug/adddrug.component';
import { NewOrderComponent } from './main/pharmacy/new-order/new-order.component';
import { AddSupplierComponent } from './main/pharmacy/add-supplier/add-supplier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddIndentComponent } from './main/pharmacy/add-indent/add-indent.component';
import { GstComponent } from './main/pharmacy/gst/gst.component';
import { TodoComponent } from './main/pharmacy/todo/todo.component';
import { ToDoListsComponent } from './main/pharmacy/to-do-lists/to-do-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    InventoryComponent,
    PurchaseComponent,
    SuppliersComponent,
    CustomersComponent,
    IndentComponent,
    BillingsComponent,
    SettingsComponent,
    ReportsComponent,
    AdddrugComponent,
    NewOrderComponent,
    AddSupplierComponent,
    AddIndentComponent,
    GstComponent,
    TodoComponent,
    ToDoListsComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
