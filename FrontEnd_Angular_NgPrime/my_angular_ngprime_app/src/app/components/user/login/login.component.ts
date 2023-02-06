import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: UserLoginService,private route:Router,private builder: FormBuilder) { }

  ngOnInit(): void {
    localStorage.clear();
  }
  respdata:any;
  loginForm = this.builder.group({
    // id:'',
    username:this.builder.control({value:'',disabled:false},Validators.required),      
    password:this.builder.control({value:'',disabled:false},Validators.required),
       
  });

  Save() {
    
    console.log(this.loginForm.getRawValue());
    if (this.loginForm.valid) {
        this.service.proceedLogin(this.loginForm.getRawValue()).subscribe({          
        next:(logindata:any)=>{
          this.respdata = logindata;
          console.log(logindata);
            if(this.respdata!=null)
            {
              localStorage.setItem('token',this.respdata.jwtToken);
              this.route.navigate(['/']);
            }else
            {
              alert("Login Failed");
            }  
        }
      });
    }




  }

  RedirectRegister(){
    this.route.navigate(['/register']);
  }

}
