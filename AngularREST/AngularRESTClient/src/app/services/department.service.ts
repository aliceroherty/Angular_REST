import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';

//THIS MAY AUTOIMPORT A SELENIUM WEBDRIVER
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/department';

const API_URL = environment.apiUrl;
const IN_MEMORY = environment.inMemory;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends SharedService {

  constructor(private http: HttpClient) { super() }

  public getDepartments() : Observable<Department[]> {
    const apiMethod = `${API_URL}/api/Departments`;

    //The .pipe() method returns an observable similar to the of() method
    return this.http.get<Department[]>(apiMethod).pipe(catchError(super.handleError));
  }

  public getDepartment(id : number) : Observable<Department> {
    const apiMethod = `${API_URL}/api/Departments/Details/${id}`;
    return this.http.get<Department>(apiMethod).pipe(catchError(super.handleError));
  }

  public createDepartment(department : Department) : Observable<Department> {
    const apiMethod = `${API_URL}/api/Departments/Create`;

    //Second argument is body of the post request
    //Third argument is the http request header
    return this.http.post<Department>(apiMethod, department, super.httpOptions()).pipe(catchError(super.handleError));
  }

  public updateDepartment(department : Department) : Observable<number> {
    const apiMethod = `${API_URL}/api/Departments/Edit`;
    return this.http.post<number>(apiMethod, department, super.httpOptions()).pipe(catchError(super.handleError));
  }

  public deleteDepartment(id : number) : Observable<boolean> {
    const apiMethod = `${API_URL}/api/Departments/Delete/${id}`;
    return this.http.post<boolean>(apiMethod, id, super.httpOptions()).pipe(catchError(this.handleError));
  }
}
