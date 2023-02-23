import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseApiUrl:string  = environment.base_api_url;

  constructor(private http: HttpClient) {}

    // getEvents() {
    //     return this.http.get<any>('app/components/AddEmployeeComponent/calendarevents.json')
    //                 .toPromise()
    //                 .then(res => <any[]> res.json().data)
    //                 .then(data => { return data; });
    // }

    // getEvents() {
    //   return this.http.get<any>('assets/calendarevents.json')
    //     .toPromise()
    //     .then(res => <any[]>res.data)
    //     .then(data => { return data; });
    // }

    getEvents():Observable<any[]> {
      // return this.http.get<any>(this.baseApiUrl+'/api/Employee/GetCalenderData')
      //   .toPromise()
      //   .then(res => <any[]>res.data)
      //   .then(data => { return data; });

      return this.http.get<any>(this.baseApiUrl+'/api/Employee/GetCalenderData');
    }


    // getAll():Observable<Employee[]>{
    //   return this.htttp.get<Employee[]>(this.baseApiUrl+'/api/Employee');
    // }

}
