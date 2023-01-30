import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

    employee:Employee = {
      id:'',
      name:'',      
      email:'',
      phone:'',
      salary:'',
      departmentId:'',
      departmentName:'',
  }
  department:department = {
    id:'',
    name:''     
  }
  departments : department[] = [];
   //ame,email,phone,salary,department
   constructor(private route:ActivatedRoute,private departmentService:DepartmentsService,private employeeService:EmployeesService,private router:Router){

   }

    // constructor(private route:ActivatedRoute,private employeeService:EmployeesService,private router:Router){
      
    // }
    ngOnInit(): void {     
      this.departmentService.getAll().subscribe({
        next:(departments) => 
        {
          //console.log(employees);
          this.departments = departments;
          //this.ELEMENT_DATA = employees;
        },
        error:(response) => 
        {
          console.log(response);
          //this.employees = employees;
        }
      });
      

      this.route.paramMap.subscribe({
        next:(params) => {
          const id = params.get('id');

          if(id){
            this.employeeService.getById(id).subscribe({
              next:(response) => 
              {
                //console.log(employees);
                this.employee = response;
                
              }
            });
          }
        }
      });
    }


    updateData(){
      this.employeeService.update(this.employee.id,this.employee).subscribe({
        next:(response) => 
        {
          //console.log(employees);
          //this.employee = response;
          this.router.navigate(['employees']);
        }
      });
    }

    deleteData(id:string){
      this.employeeService.delete(this.employee.id).subscribe({
        next:(response) => 
        {
          //console.log(employees);
          //this.employee = response;
          this.router.navigate(['employees']);
        }
      });
    }
}
