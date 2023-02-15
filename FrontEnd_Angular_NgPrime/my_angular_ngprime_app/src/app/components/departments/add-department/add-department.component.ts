import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  department:department = {
     id:'',
     name:'' 
     
  }
  //ame,email,phone,salary,department
  constructor(private departmentService:DepartmentsService,
    public ref: DynamicDialogRef,
    private router:Router,
    private messageService : MessageService,
    private active_route:ActivatedRoute){
  }

  ngOnInit(): void{
    

  }
  addDepartmentFunc(){
     //console.log(this.addEmployee);
     // this.employeeService.add(this.addEmployee).subscribe({
     //   next: (employee) =>{
     //     console.log(employee);
     //   }
     // });

     this.departmentService.add(this.department).subscribe({
       next:(department)=>{
          //  console.log(department);
          // console.log('...dkdjkf'+this.router.url);
          if(this.router.url!="/add-employee"){
            this.router.navigate(['departments']);
          }  else{
            this.router.navigate(['add-employee']);
          }      
          
          this.messageService.add({key: 'key',severity: 'success',summary: 'Saved Department Successfully', detail: 'Name :' + department.name});
       }
     });

     this.ref.close();
  }

  onConfirm1() {
    //this.messageService.clear('key');
    //this.router.navigate(['master-data/']);
  }

  onReject1() {
      // console.log(messagetype+","+this.messagetype);
      // this.messageService.clear('key');
      // if(messagetype=="success"){
      //   this.router.navigate(['master-data/']);
      // }
      // this.router.navigate(['master-data/']);
  }
  clear1() {
    this.messageService.clear();
  }
}
