import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment.development';
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

  add(addEmployeeRequest:any):Observable<Employee>{
    addEmployeeRequest.city = addEmployeeRequest.city.label;
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

  getCountries() {
    // return this.htttp.get('showcase/resources/data/countries.json')
    //             .toPromise()
    //             .then(res => {
    //               return <any[]>res?.json().data;
    //             })
    //             .then(data => { return data; });
  }

}
