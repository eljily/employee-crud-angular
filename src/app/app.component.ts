import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import {EmployeeService} from "./services/employee.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CoreService} from "./core/core.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  displayedColumns: string[] = ['id',
    'firstname', 'lastname', 'email','dob','gender','education',
    'company','experience','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;

  title = 'crud-employer-app';

  constructor(private _dialog : MatDialog,private _empService:EmployeeService,
              private _coreService:CoreService){}

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      },
    });
  }
  openEditForm(data:any){
    const dialogRef = this._dialog.open(EmpAddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      },
    })
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource<any>(res)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:err=>console.log(err)
    })
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
  deleteEmployee(id:number){
    confirm("Etes vous sure ??")
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
        this._coreService.openSnackBar('employee deleted!','done');
        this.getEmployeeList();
      },
      error:console.log
    })
  }
}
