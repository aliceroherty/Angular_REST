import { throwError, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";

/**
 * Add a reference our environment
 */
export const API_URL = environment.apiUrl;
export const IN_MEMORY = environment.inMemory;

export class SharedService {
  /**
   * Our errors array for holding http errors
   */
  errors: string[] = [];

  /**
   * Set up for our Http options for REST API Comms
   * Content-Type we are sending
   * Accept for content we are receiving
   *
   * Our type will be application/json
   *
   */
  protected httpOptions() {
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        "Content-Type": "application/json", //datatype I am sending
        Accept: "application/json" //datatype to accept
      })
    };
    return HTTP_OPTIONS;
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
  protected handleError(error: HttpErrorResponse) {
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
