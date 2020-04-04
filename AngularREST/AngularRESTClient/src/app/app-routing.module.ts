import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerComponent } from "./customer/customer.component";
import { DepartmentComponent } from './department/department.component';
import { DepartmentListComponent } from './department-list/department-list.component';

const routes: Routes = [
  { path: "", redirectTo: "/customers", pathMatch: "full" },
  { path: "customers/detail/:id", component: CustomerComponent },
  { path: "customers/create", component: CustomerComponent },
  { path: "customers", component: CustomerListComponent },
  { path: "departments/detail/:id", component: DepartmentComponent },
  { path: "departments/create", component: DepartmentComponent },
  { path: "departments", component: DepartmentListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
