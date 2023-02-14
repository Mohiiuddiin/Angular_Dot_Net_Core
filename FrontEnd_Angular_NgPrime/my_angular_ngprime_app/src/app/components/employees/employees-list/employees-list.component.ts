import { Component,OnChanges,OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})


export class EmployeesListComponent implements OnInit {
  employees : Employee[] = [
    
  ];
  // statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  //ELEMENT_DATA: Employee[] = [];
  constructor(private employeeService: EmployeesService){}

  
  ngOnInit(): void{
    this.employeeService.getAll().subscribe({
      next:(employees) => 
      {
        //console.log(employees);
        this.employees = employees;
        this.loading = false;

        //this.ELEMENT_DATA = employees;
      },
      error:(response) => 
      {
        console.log(response);
        //this.employees = employees;
      }
    });
  }
  clear(table: Table) {
    table.clear();
}
  

  displayedColumns: string[] = ['id','name', 'email','phone','salary', 'departmentName','Action'];
  
}


  
