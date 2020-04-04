import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerComponent } from "./customer/customer.component";
import { CustomerService } from "./services/customer.service";

//Import the HttpClientModule needed REST APIs
import { HttpClientModule } from "@angular/common/http";
import { DepartmentComponent } from './department/department.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentService } from './services/department.service';

@NgModule({
  declarations: [AppComponent, CustomerListComponent, CustomerComponent, DepartmentComponent, DepartmentListComponent ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [CustomerService, DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule {}
