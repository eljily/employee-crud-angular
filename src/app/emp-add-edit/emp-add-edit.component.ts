import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../services/employee.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CoreService} from "../core/core.service";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
  empForm : FormGroup
  constructor(private _fb : FormBuilder,private _empService:EmployeeService,
              private _dialogRef:DialogRef<EmpAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,private _coreService:CoreService) {
    this.empForm = this._fb.group({
      firstname:'',
      lastname :'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:''
    })
  }
   education: String[]=[ 'Licence',
     'Master',
     'Phd',
     'Primary','Other']
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value)
          .subscribe({
          next:(val)=>{
            this._dialogRef.close();
            this._coreService.openSnackBar('employee details updated')
          },
          error: err=>console.log(err)
        })
      }else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next:(val)=>{
            this._dialogRef.close();
            this._coreService.openSnackBar('employee added successfully')
          },
          error: err=>console.log(err)
        });
      }
    }
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
}
