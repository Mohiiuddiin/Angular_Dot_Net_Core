import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  department:department = {
     id:'',
     name:'' 
     
  }
  //ame,email,phone,salary,department
  constructor(private departmentService:DepartmentsService,private router:Router){

  }

  ngOnInit(): void{
   

  }
  addDepartmentFunc(){
     //console.log(this.addEmployee);
     // this.employeeService.add(this.addEmployee).subscribe({
     //   next: (employee) =>{
     //     console.log(employee);
     //   }
     // });

     this.departmentService.add(this.department).subscribe({
       next:(department)=>{
         console.log(department);
         this.router.navigate(['departments']);
       }
     });
  }
}
