import { Component } from '@angular/core';
import { department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent {
  departments : department[] = [
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
  constructor(private deptService: DepartmentsService){}

  ngOnInit(): void{
    this.deptService.getAll().subscribe({
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

  displayedColumns: string[] = ['id','name'];
}
