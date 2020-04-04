import { Component, OnInit } from '@angular/core';
import { Department } from '../models/department';
import { DepartmentService } from '../services/department.service';
import { ActivatedRoute } from '@angular/router';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  public department : Department;
  public message: string;
  public saveMessage : string;
  public isValidFormSubmitted : boolean;
  public loadingDepartment : boolean;
  public departmentSaving : boolean;
  public button : string;
  public id : number = null;

  constructor (
    public departmentService : DepartmentService,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //Ternary Operator 
      // [Condition] ? [Value if true] : [Value if false]
      this.id = params.get("id") != undefined ? parseInt(params.get("id")) : null;

      //getting department
      this.getDepartment();
    });
  }

  getDepartment() : void {
    if (this.id != null && !isNaN(this.id)) {
      this.loadingDepartment = true;
      this.departmentService.getDepartment(this.id).subscribe(department => {
        if (department == null) {
          this.message = `Department ${this.id} not found.`;
          this.department = null;
        } else {
          this.department = department;
          this.button = "Save Department";
        }
      }, error => {
        this.message = error;
      }).add(() => {
        this.loadingDepartment = false;
      });
    } else {
      //Creation mode or alpha character was given
      if (!isNaN(this.id)) {
        this.department = new Department();
        this.button = "Create Department";
      } else {
        this.message = "Invalid Department ID.";
        this.department = null;
      }
    }
  }

  public onFormSubmit(form : NgForm) {
    this.isValidFormSubmitted = false;

    if (form.invalid) return;

    this.departmentSaving = true;

    //form.value is a department instance
    this.department = form.value;

    this.message = "";
    this.saveMessage = "";

    if (this.department.id === undefined) {
      //create
      this.createDepartent(form);
    } else {
      //save existing
      this.saveDepartment(form);
    }
  }

  private createDepartent(form : NgForm) {
    this.departmentService.createDepartment(this.department).subscribe(department => {
      if (department.id != 0) {
        this.saveMessage = `Department Saved. ID:\t${department.id}`;
        this.department = new Department();
        this.isValidFormSubmitted = true;
        form.resetForm();
      } else {
        this.isValidFormSubmitted = false;
        this.message = "An error occured creating the department via REST API.";
      }
    }, error => {
      this.message = error;
    }).add(() => {
      this.departmentSaving = false;
    });
  }

  private saveDepartment(form : NgForm) {
    this.departmentService.updateDepartment(this.department).subscribe(rowsAffected => {
      if (rowsAffected > 0) {
        this.saveMessage = `Department Saved. ID:\t${this.department.id}`;
        this.isValidFormSubmitted = true;
      } else {
        this.isValidFormSubmitted = false;
        this.message = "An error occurred saving the department via REST API.";
      }
    }, error => {
      this.message = error;
    }).add(() => {
      this.departmentSaving = false;
    });
  }
}
