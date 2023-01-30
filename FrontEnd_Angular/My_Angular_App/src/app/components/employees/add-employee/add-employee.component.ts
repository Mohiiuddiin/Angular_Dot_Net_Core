import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
   employee:Employee = {
      id:'',
      name:'',      
      email:'',
      phone:'',
      salary:'',
      departmentId:'',
      departmentName:''
   }

   department:department = {
    id:'',
    name:''     
  }
  departments : department[] = [];
   //ame,email,phone,salary,department
   constructor(private employeeService:EmployeesService,private departmentService:DepartmentsService,private router:Router){

   }

   ngOnInit(): void{
    
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
   }
   addEmployeeFunc(){
      //console.log(this.addEmployee);
      // this.employeeService.add(this.addEmployee).subscribe({
      //   next: (employee) =>{
      //     console.log(employee);
      //   }
      // });

      this.employeeService.add(this.employee).subscribe({
        next:(employee)=>{
          console.log(employee);
          this.router.navigate(['employees']);
        }
      });
   }
}
