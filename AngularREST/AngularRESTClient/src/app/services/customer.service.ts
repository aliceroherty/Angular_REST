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

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  /**
   * Our in memory customer datasource. Migrate to REST Services
   */
  customers: Array<Customer>;

  /**
   * Our errors array for holding http errors
   */
  errors: string[] = [];

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
  constructor(private http: HttpClient) {}

  /**
   * Set up for our Http options for REST API Comms
   * Content-Type we are sending
   * Accept for content we are receiving
   *
   * Our type will be application/json
   *
   */

  private httpOptions() {
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        "Content-Type": "application/json", //datatype I am sending
        Accept: "application/json" //datatype to accept
      })
    };
    return HTTP_OPTIONS;
  }

  /**
   * Create a customer. Returns the primary key.
   * @param customer the customer to create
   * @return observable of the primary key
   */
  public createCustomer(customer: Customer): Observable<Customer> {
    //ensure there are no errors in the service
    this.clearErrors();

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

  /**
   * Clear any errors
   */
  public clearErrors() {
    this.errors = [];
  }

  /**
   * Add handleError Http error handler code
   */
  /**
   * Http error handler
   * @param error the HttpErrorResponse from the REST API
   */
  private handleError(error: HttpErrorResponse) {
    //We can use instanceof to check different error tyes
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
