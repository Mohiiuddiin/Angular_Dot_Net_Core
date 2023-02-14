import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
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
  constructor(private departmentService:DepartmentsService,public ref: DynamicDialogRef,private router:Router,private active_route:ActivatedRoute){
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
          //  console.log(department);
          // console.log('...dkdjkf'+this.router.url);
          if(this.router.url!="/add-employee"){
            this.router.navigate(['departments']);
          }  else{
            this.router.navigate(['add-employee']);
          }       
       }
     });

     this.ref.close();
  }
}
