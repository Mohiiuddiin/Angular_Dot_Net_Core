import { Component,OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})


export class EmployeesListComponent implements OnInit {
  employees : Employee[] = [
    // {
    //   id:'1',
    //   name:'A',
    //   email:'a@gmail.com',
    //   department:'a dept',
    //   phone:123456,
    //   salary:10  
    // },
    // {
    //   id:'2',
    //   name:'B',
    //   email:'b@gmail.com',
    //   department:'b dept',
    //   phone:123456,
    //   salary:10  
    // },
    // {
    //   id:'3',
    //   name:'C',
    //   email:'c@gmail.com',
    //   department:'c dept',
    //   phone:123456,
    //   salary:10  
    // }
  ];

  //ELEMENT_DATA: Employee[] = [];
  constructor(private employeeService: EmployeesService){}

  ngOnInit(): void{
    this.employeeService.getAll().subscribe({
      next:(employees) => 
      {
        //console.log(employees);
        this.employees = employees;
        //this.ELEMENT_DATA = employees;
      },
      error:(response) => 
      {
        console.log(response);
        //this.employees = employees;
      }
    });
  }

  
  displayedColumns: string[] = ['id','name', 'email','phone','salary', 'departmentName','Action'];
  
}


  
