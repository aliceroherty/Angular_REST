import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  /**
   * Customers list
   */
  customers: Array<Customer>;

  /**
   * Loading flag
   */
  loadingCustomers: boolean;

  /**
   * Deleting flag
   */
  customerDeleting: boolean;

  /**
   * Error message
   */
  message: string;

  /**
   * Default Constructor
   * @param customerService 
   */
  constructor(private customerService: CustomerService) {

  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.getCustomers();
  }

  /**
   * Get the customers from our services
   */
  getCustomers() {
    this.loadingCustomers = true;
    this.customerService.getCustomers().subscribe(customers => {      
      this.customers = customers;
    }, err => {
      this.message = err;
    }).add(() => {
      this.loadingCustomers = false;
    });
  }

  /**
   * Delete a customer
   * @param id the Customer Id
   */
  deleteCustomer(id: number) {
    this.customerDeleting = true;
    this.customerService.deleteCustomer(id).subscribe(result => {
      if (result) {
        this.getCustomers();
      } else {
        this.message = `Deletion failed`;
      }
    }, err => {
      this.message = err;
    }).add(() => {
      this.customerDeleting = false;
    });
  }
}
