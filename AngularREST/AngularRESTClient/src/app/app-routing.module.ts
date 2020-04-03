import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerComponent } from "./customer/customer.component";

const routes: Routes = [
  { path: "", redirectTo: "/customers", pathMatch: "full" },
  { path: "detail/:id", component: CustomerComponent },
  { path: "create", component: CustomerComponent },
  { path: "customers", component: CustomerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
