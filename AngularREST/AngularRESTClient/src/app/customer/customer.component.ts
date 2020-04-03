import { Component, OnInit } from "@angular/core";
import { Customer } from "../models/customer";
import { CustomerService } from "../services/customer.service";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  public customer: Customer;
  public message: string;
  public saveMessage: string;
  public isValidFormSubmitted: boolean;
  public loadingCustomer: boolean = false;
  public customerSaving: boolean = false;
  public button: string;
  private id: number;

  /**
   *
   * @param customerService
   * @param route
   */
  constructor(
    public customerService: CustomerService,
    private route: ActivatedRoute
  ) {
    this.customer = new Customer();
    this.isValidFormSubmitted = false;
    this.loadingCustomer = false;
    this.customerSaving = false;
    this.id = 0;
  }

  ngOnInit() {
    //Lets ensure no errors are remaining in our view
    this.customerService.clearErrors();

    /**
     * This component handles create, update and delete
     * We may arrive on this component in creation mode.
     * No Id will be provided
     */
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
      this.getCustomer();
    });
  }

  /**
   * Get the customer from the querystring
   */
  private getCustomer() {
    if (!isNaN(this.id)) {
      this.loadingCustomer = true;
      this.customerService.getCustomer(this.id).subscribe(
        c => {
          if (c === undefined) {
            //This will give us a clear form as we are two way bound. Lets hide the form maybe
            this.message = `Customer ${this.id} not found.`;
            this.customer = null;
          } else {
            this.customer = Object.assign(this.customer, c); //Clone, only here for in-memory so that you don't change the properties until you hit save
            //now that we're using rest, Object.assign is not necessary
            this.button = "Save Customer";
          }

          this.loadingCustomer = false; //Hide loader
        },
        err => {
          this.loadingCustomer = false; //Hide loader
          this.customerSaving = false;
          this.message = err;
        }
      );
    } else {
      if (!this.id) {
        this.customer = new Customer();
        this.button = "Create Customer";
      } else {
        //not a number state but not create
        this.message = `Invalid customer number.`;
        this.customer = null;
      }
    }
  }

  /**
   * Form Submission event handler
   */
  public onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }

    this.customerSaving = true;
    this.customer = form.value;
    this.message = "";
    this.saveMessage = "";

    if (this.customer.id === undefined) {
      this.createCustomer(form);
    } else {
      this.saveCustomer(form);
    }
  }

  /**
   *
   * @param form
   */
  private createCustomer(form: NgForm) {
    this.customerService
      .createCustomer(this.customer)
      .subscribe(
        customer => {
          console.warn(customer.id);
          if (customer.id != 0) {
            this.saveMessage = `Customer saved. Id: ${customer.id}`;
            this.customer = new Customer();
            this.isValidFormSubmitted = true;
            form.resetForm();
          } else {
            this.isValidFormSubmitted = false;
            this.message =
              "An error occured creating the customer via REST API";
          }
        },
        err => {
          this.message = err;
        }
      )
      .add(() => {
        this.customerSaving = false;
      });
  }

  /**
   *
   * @param form
   */
  private saveCustomer(form: NgForm) {
    this.customerService
      .updateCustomer(this.customer)
      .subscribe(
        result => {
          if (result) {
            this.saveMessage = `Customer saved. Id: ${this.customer.id}`;
            this.isValidFormSubmitted = true;
          } else {
            this.isValidFormSubmitted = false;
            this.message = "An error occured saving the customer via REST API";
          }
        },
        err => {
          this.message = err;
        }
      )
      .add(() => {
        this.customerSaving = false;
      });
  }
}
