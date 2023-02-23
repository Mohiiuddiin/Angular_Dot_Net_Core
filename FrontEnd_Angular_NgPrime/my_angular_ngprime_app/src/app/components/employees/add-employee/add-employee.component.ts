import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NG_VALIDATORS,RequiredValidator,MinLengthValidator,MaxLengthValidator,EmailValidator, Validators, FormBuilder } from '@angular/forms';
import { FilterService, MessageService, SelectItemGroup } from 'primeng/api';
import { department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddDepartmentComponent } from '../../departments/add-department/add-department.component';
import { EventService } from 'src/app/services/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import * as moment from 'moment';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
  ,providers: [MessageService,DialogService]
})

export class AddEmployeeComponent implements OnInit { 
  submitted = false;
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
    id:"",
    name:""     
  }
  departments : department[] = [];
  selectedDept: department = {id:"",name:""};
  messagetype:any;
  ref:any;
  events: any[] = [];
  options: any;
  currentEvents: EventApi[] = [];
  eventGuid = 0;

   //ame,email,phone,salary,department
   constructor( public dialogService: DialogService,
                private builder: FormBuilder,
                private messageService: MessageService,
                private employeeService:EmployeesService,
                private departmentService:DepartmentsService,
                private router:Router,
                private filterService: FilterService,private eventService: EventService,private changeDetector: ChangeDetectorRef){           
   }

  //  ngOnChanges(changes: any) {
  //   console.log('ngOnChanges called!');
  //   console.log(changes);
  // }
  

  // ngAfterContentInit() {
  //   console.log('ngAfterContentInit called!');
  // }

  // ngAfterContentChecked() {
  //   console.log('ngAfterContentChecked called!');    
  // }

  // ngAfterViewInit() {
  //   console.log('ngAfterViewInit called!');
  // } 
  
  // ngOnDestroy() {
  //   console.log('ngOnDestroy called!');
  // }

   ngOnInit(): void{ 

    // this.eventService.getEvents().then(events => {this.events = events;});
    //     console.log(this.events);
    // this.options = {
    //     plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    //     defaultDate: '2023-02-01',
    //     header: {
    //         left: 'prev,next',
    //         center: 'title',
    //         right: 'dayGridMonth,timeGridWeek,timeGridDay'
    //     },
    //     editable: true
    // };
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.options = {...this.options, ...{events: events}};
  });

  this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: '2023-02-01',
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      dayRender: function (dayRenderInfo:any) {      
        console.log(dayRenderInfo);  
        let dateMoment = moment(dayRenderInfo.date);
        if (dateMoment.day() === 6 || dateMoment.day() === 0) {
          dayRenderInfo.el.style.backgroundColor = '#d6e7e1';
        }
        else {
          dayRenderInfo.el.style.backgroundColor = 'white';
        }
        return dayRenderInfo;
      },
      eventRender:function(){
        console.log("ddd"); 
      }
      
      // editable: true,
      // selectable: true,
      // selectMirror: true,
      // dayMaxEvents: true
  };


    if(this.departments.length==0){
      this.get_departments();
    }
    this.departmentService.departmentsChanged
      .subscribe(
        (department: department[]) => {
          this.departments = department;
          // console.log(this.departments);
        }
      );
    
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
       

  
   }
  //  ngAfterViewChecked() {
  //   console.log('ngAfterViewChecked called!');
  //   //this.get_departments();
  // }
  // ngDoCheck() {
  //   console.log('ngDoCheck called!');     
  //   this.get_departments();
  // }
   empForm = this.builder.group({
    // id:'',
      name:this.builder.control({value:'',disabled:false},Validators.required),      
      email:this.builder.control({value:'',disabled:false},Validators.required),
      phone:this.builder.control({value:'',disabled:false},Validators.required),
      salary:this.builder.control({value:'',disabled:false},Validators.required),
      departmentId:this.builder.control({value:'',disabled:false},Validators.required),
      departmentName:this.builder.control({value:'',disabled:false}),
      city: this.builder.control({value:'',disabled:false},Validators.required),
      age: this.builder.control({value:0,disabled:false},Validators.required),
      gender: this.builder.control({value:'',disabled:false},Validators.required),
      employeeStatus: this.builder.control({value:'',disabled:false},Validators.required),
      address: this.builder.control({value:'',disabled:false},Validators.required),
      dateOfBirth:this.builder.control({value:'',disabled:false},Validators.required),    
  });
  
  get_departments(){
    this.departmentService.getAll().subscribe({
      next:(departments) => 
      {
        //console.log(employees);
        this.departments = departments;

        // this.departments = this.departments.map(x => ({
        //   id: x.id,
        //   name: x.name
        // }));
        // console.log(departments);
        //this.ELEMENT_DATA = employees;
      },
      error:(response) => 
      {
        console.log(response);
        //this.employees = employees;
      }
    }); 
  }
  get f()
  {
    return this.empForm.controls; 
  }

  //https://jasonwatmore.com/post/2022/11/18/angular-14-reactive-forms-validation-example
   addEmployeeFunc(){
      //console.log(this.addEmployee);
      // this.employeeService.add(this.addEmployee).subscribe({
      //   next: (employee) =>{
      //     console.log(employee);
      //   }
      // });   
      this.submitted = true;
      console.log(this.empForm.getRawValue());
      if (this.empForm.valid) {
        this.employee.departmentId = this.department.id.toString();
        this.empForm.get("departmentId")?.setValue(this.department.id.toString());
        console.log(this.empForm.getRawValue());
        // this.employeeService.add(this.employee).subscribe({
          
        //   next:(employee)=>{
        //     console.log(employee);
        //     // this.router.navigate(['employees']);

        //     this.messageService.add({key: 'key',severity: 'success',summary: 'Saved Employee Successfully', detail: 'Name :' + employee.name});
        //     this.messagetype = "success";
        //   }
        // });
        this.employeeService.add(this.empForm.getRawValue()).subscribe({          
          next:(employee)=>{
            console.log(employee);
            // this.router.navigate(['employees']);
            this.messageService.add({key: 'key',severity: 'success',summary: 'Saved Employee Successfully', detail: 'Name :' + employee.name});
            this.messagetype = "success";
          }
        });
      }  
      else
      {
        return;
        this.messageService.add({key: 'key',severity: 'error',summary: 'Please enter values in all mandatory filed', detail: 'Validation'});
      }      
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
  onConfirm() {
    this.messageService.clear('key');
    this.router.navigate(['employees/']);
  }

  onReject(messagetype:string) {
      // console.log(messagetype+","+this.messagetype);
      this.messageService.clear('key');
      if(messagetype=="success"){
        this.router.navigate(['employees/']);
      }
      // this.router.navigate(['master-data/']);
  }

  clear() {
    this.messageService.clear();
  }

  showAddDeptForm(){
    this.ref = this.dialogService.open(AddDepartmentComponent, {
        header: 'Add Department',
        width: '50%',
        contentStyle: {"overflow": "auto"},
        baseZIndex: 10000,
        maximizable: true
      });
      //console.log('success');
      //this.get_departments();
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log("from handleEventClick:");
    console.log(clickInfo);

    console.log("from handleEventClick");
    console.log(clickInfo.event);

    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();      
    }
  }

  handleEvents(events: EventApi[]) {
    console.log("from handleEvents"+events);

    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  handleDateSelect(selectInfo: DateSelectArg) {

    console.log("from selectInfo"+selectInfo);
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }
  createEventId() {  
    return String(this.eventGuid++);
  }
}


