import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService, SelectItemGroup } from 'primeng/api';
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

   groupedCities: SelectItemGroup[] = [];
   filteredGroups: any[]= [];
   stateOptions: any[] = [];
   genders : any[] = [];  
    

   employee:Employee = {
      id:'',
      name:'',      
      email:'',
      phone:'',
      salary:'',
      departmentId:'',
      departmentName:'',
      city: '',
      age: 50,
      gender: '',
      employeeStatus: '',
      address: '',
      dateOfBirth:'',

   }

   department:department = {
    id:'',
    name:''     
  }
  departments : department[] = [];
  selectedDept: department = {id:'',name:''};

   //ame,email,phone,salary,department
   constructor(private employeeService:EmployeesService,private departmentService:DepartmentsService,private router:Router,private filterService: FilterService){
      
      
   }

   ngOnInit(): void{
    this.stateOptions = [{label: 'Active', value: 'Active'}, {label: 'In Active', value: 'In Active'}];
    this.genders=["Male","Female","Others"]
    this.groupedCities = [
      {
          label: 'Germany', value: 'de',
          items: [
              {label: 'Berlin', value: 'Berlin'},
              {label: 'Frankfurt', value: 'Frankfurt'},
              {label: 'Hamburg', value: 'Hamburg'},
              {label: 'Munich', value: 'Munich'}
          ]
      },
      {
          label: 'USA', value: 'us',
          items: [
              {label: 'Chicago', value: 'Chicago'},
              {label: 'Los Angeles', value: 'Los Angeles'},
              {label: 'New York', value: 'New York'},
              {label: 'San Francisco', value: 'San Francisco'}
          ]
      },
      {
          label: 'Japan', value: 'jp',
          items: [
              {label: 'Kyoto', value: 'Kyoto'},
              {label: 'Osaka', value: 'Osaka'},
              {label: 'Tokyo', value: 'Tokyo'},
              {label: 'Yokohama', value: 'Yokohama'}
          ]
      }
  ];
    this.departmentService.getAll().subscribe({
      next:(departments) => 
      {
        //console.log(employees);
        this.departments = departments;

        // this.departments = this.departments.map(x => ({
        //   id: x.id,
        //   name: x.name
        // }));
        console.log(departments);
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

   filterGroupedCity(event:any) {
    let query = event.query;
    let filteredGroups = [];

    for (let optgroup of this.groupedCities) {
        let filteredSubOptions = this.filterService.filter(optgroup.items, ['label'], query, "contains");
        if (filteredSubOptions && filteredSubOptions.length) {
            filteredGroups.push({
                label: optgroup.label,
                value: optgroup.value,
                items: filteredSubOptions
            });
        }
    }

    this.filteredGroups = filteredGroups;
  }
}
