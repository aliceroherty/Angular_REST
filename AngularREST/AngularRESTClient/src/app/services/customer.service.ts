import { Injectable } from "@angular/core";
import { Customer } from "../models/customer";

//Add to import the rxjs throwError function
import { Observable, of, throwError } from "rxjs";

//Import HttpClient, HttpHeaders, HttpErrorResponse for Http access REST endpoints
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
//Import catchError function for Error Handling for rxjs and observables
import { catchError } from "rxjs/operators";
import { SharedService, IN_MEMORY, API_URL } from './shared.service';

@Injectable({
  providedIn: "root"
})
export class CustomerService extends SharedService {
  /**
   * Our in memory customer datasource. Migrate to REST Services
   */
  customers: Array<Customer>;

  /**
   * Customer Service Constructor
   * This service is responsible for validating a customer, storing customers in memory and
   * providing access to the customers in memory collection
   * This service also maintains a list of validation errors during customer creation
   *
   * We need to now migrate to a REST API built to store customers in SQL Server
   *
   * Inject HttpClient class with private access modifier
   */
  constructor(private http: HttpClient) {super()}

  /**
   * Create a customer. Returns the primary key.
   * @param customer the customer to create
   * @return observable of the primary key
   */
  public createCustomer(customer: Customer): Observable<Customer> {
    //ensure there are no errors in the service
    super.clearErrors();

    if (IN_MEMORY) {
      if (this.customers == null) this.customers = new Array();
      //Simulate an auto incrementing id. Replace with REST call
      customer.id = this.customers.length + 1;
      this.customers.push(customer);

      return of(customer);
    }

    //Change out to call to REST API

    const API_METHOD = `${API_URL}/api/Customers/Create/`;
    return this.http
      .post<Customer>(API_METHOD, customer, this.httpOptions())
      .pipe(catchError(this.handleError));
  }

  /**
   * Customer update method
   * @param customer the Customer to update
   */
  public updateCustomer(customer: Customer): Observable<boolean> {
    //ensure there are no errors in the service
    this.clearErrors();

    if (IN_MEMORY) {
      //Find the location of the customer in the customer list using the id
      let index = this.customers.findIndex(c => c.id == customer.id);

      if (index == -1) {
        this.errors.push("The customer was not found to update");
        return of(false);
      } else {
        this.customers[index] = customer;
        return of(true);
      }
    }

    //Change out to call to REST API
    const API_METHOD = `${API_URL}/api/Customers/Edit/`;
    return this.http
      .post<boolean>(API_METHOD, customer, this.httpOptions())
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a customer
   * @param id the customer Id to delete
   */
  public deleteCustomer(id: number): Observable<boolean> {
    //ensure there are no errors in the service
    this.clearErrors();

    if (IN_MEMORY) {
      //Find the location of the customer in the customer list using the id
      let index = this.customers.findIndex(c => c.id == id);

      if (index == -1) {
        this.errors.push("The customer was not found to delete");
        return of(false);
      } else {
        this.customers.splice(index, 1);

        if (this.customers.length == 0) this.customers = null;
        return of(true);
      }
    }

    //Change out to call to REST API
    const API_METHOD = `${API_URL}/api/Customers/Delete/${id}`;
    return this.http
      .post<boolean>(API_METHOD, this.httpOptions())
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all customers
   */
  public getCustomers(): Observable<Customer[]> {
    if (IN_MEMORY) {
      return of(this.customers);
    }

    //Change out to call to REST API
    const API_METHOD = `${API_URL}/api/Customers`;
    return this.http
      .get<Customer[]>(API_METHOD)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get a customer by id
   * @param id The Customer Id
   */
  public getCustomer(id: number): Observable<Customer> {
    if (IN_MEMORY) {
      return of(this.customers.find(c => c.id == id));
    }
    const API_METHOD = `${API_URL}/api/Customers/Details/${id}`;
    return this.http
      .get<Customer>(API_METHOD)
      .pipe(catchError(this.handleError));
    //Change out to call to REST API
  }
}
