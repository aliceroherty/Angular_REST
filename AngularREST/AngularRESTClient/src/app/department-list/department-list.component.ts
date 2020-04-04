import { Component, OnInit } from '@angular/core';
import { Department } from '../models/department';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  public departments : Department[];
  public loadingDepartments : boolean;
  public departmentDeleting : boolean;
  public message : string;

  constructor(private departmentService : DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
  }

  //Void Keyword is optional
  public getDepartments() : void {
    //Turning on loading spinner using boolean flag
    this.loadingDepartments = true;

    //Gettingdepartments from api using observable
    //.add() method is similar to .then when using promises
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    }, error => {
      this.message = error;
    }).add(() => {
      //turning off loading indicator
      this.loadingDepartments = false;
    });
  }

  public deleteDepartment(id : number) : void {
    this.departmentDeleting = true;

    this.departmentService.deleteDepartment(id).subscribe(isSuccessful => {
      if (isSuccessful) {
        //Refreshing department data
        this.getDepartments();
      } else {
        this.message = "Delete Failed";
      }
    }).add(() => {
      this.departmentDeleting = false;
    });
  }
}
