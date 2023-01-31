import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  baseApiUrl:string  = environment.base_api_url;
  constructor(private htttp:HttpClient) { }

  getAll():Observable<department[]>{
    return this.htttp.get<department[]>(this.baseApiUrl+'/api/Department');
  }

  getById(id:string):Observable<department>{
    return this.htttp.get<department>(this.baseApiUrl+'/api/Department/'+id);
  }

  add(adddepartmentRequest:department):Observable<department>{
    adddepartmentRequest.id='00000000-0000-0000-0000-000000000000';
    return this.htttp.post<department>(this.baseApiUrl+'/api/Department',adddepartmentRequest)
  }
}
