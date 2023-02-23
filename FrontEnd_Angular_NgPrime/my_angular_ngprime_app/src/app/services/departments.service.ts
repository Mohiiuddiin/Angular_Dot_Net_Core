import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService implements OnInit {

  departments:department[] = [];
  departmentsChanged = new EventEmitter<department[]>();  
  baseApiUrl:string  = environment.base_api_url;
  constructor(private htttp:HttpClient) {
      this.getAll().subscribe({
        next:(departments) => 
        {        
          this.departments = departments;
          this.departmentsChanged.emit(this.departments.slice());
          // console.log(this.departments);
        },
        error:(response) => 
        {
          console.log(response);  
        }
      });
  }

  ngOnInit(): void {
    
  }

  getAll():Observable<department[]>{
    return this.htttp.get<department[]>(this.baseApiUrl+'/api/Department');
  }

  getById(id:string):Observable<department>{
    return this.htttp.get<department>(this.baseApiUrl+'/api/Department/'+id);
  }

  add(adddepartmentRequest:department):Observable<department>{
    adddepartmentRequest.id='00000000-0000-0000-0000-000000000000';
    this.departmentsOnChange(adddepartmentRequest);   
    return this.htttp.post<department>(this.baseApiUrl+'/api/Department',adddepartmentRequest);    
  }

  departmentsOnChange(department:department){   
    this.departments.push(department);
    this.departmentsChanged.emit(this.departments.slice());
    // return this.departments;
  }
}
