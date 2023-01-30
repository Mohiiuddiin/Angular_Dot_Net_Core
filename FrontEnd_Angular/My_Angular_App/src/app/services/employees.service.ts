import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AddEmployeeComponent } from '../components/employees/add-employee/add-employee.component';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  baseApiUrl:string  = environment.base_api_url;
  constructor(private htttp:HttpClient) { }

  getAll():Observable<Employee[]>{
    return this.htttp.get<Employee[]>(this.baseApiUrl+'/api/Employee');
  }

  getById(id:string):Observable<Employee>{
    return this.htttp.get<Employee>(this.baseApiUrl+'/api/Employee/'+id);
  }

  add(addEmployeeRequest:Employee):Observable<Employee>{
    addEmployeeRequest.id='00000000-0000-0000-0000-000000000000';
    console.log(addEmployeeRequest);
    return this.htttp.post<Employee>(this.baseApiUrl+'/api/Employee',addEmployeeRequest)
  }

  update(id:string,updateEmployee:Employee):Observable<Employee>{
    return this.htttp.put<Employee>(this.baseApiUrl+'/api/Employee/'+id,updateEmployee);
  }

  delete(id:string):Observable<Employee>{
    return this.htttp.delete<Employee>(this.baseApiUrl+'/api/Employee/'+id);
  }

}
