import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

/**
 * Add a reference our environment
 */
const API_URL = environment.apiUrl;
const IN_MEMORY = environment.inMemory;

export class Shared {

}
