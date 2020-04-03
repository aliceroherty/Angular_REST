import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
const IN_MEMORY = environment.inMemory;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }
}
