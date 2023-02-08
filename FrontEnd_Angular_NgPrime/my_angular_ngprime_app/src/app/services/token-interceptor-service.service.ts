import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginService } from './user-login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService {

  // constructor(private inject:Injector) { }
  // token = localStorage.getItem('token');
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
  //   let jwttoken = req.clone({
  //     setHeaders: {
  //       Authorization: 'bearer ' + this.token
  //     }
  //   });
  //   return next.handle(jwttoken);
  // }

  constructor(private inject:Injector) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authservice=this.inject.get(UserLoginService);
        let jwtToken = req.clone({
            setHeaders: {
              Authorization: 'bearer '+authservice.GetToken()
            }
            
        });
        return next.handle(jwtToken);
    }
}
