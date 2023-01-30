import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './components/departments/add-department/add-department.component';
import { DepartmentsListComponent } from './components/departments/departments-list/departments-list.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/employees/edit-employee/edit-employee.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { CreateInvComponent } from './components/master-details-example/create-inv/create-inv.component';
import { ListingComponent } from './components/master-details-example/listing/listing.component';
import { MasterDetailsService } from './services/master-details.service';

const routes: Routes = [
  {
    path:'',
    component : EmployeesListComponent 
  },
  {
    path:'employees',
    component : EmployeesListComponent 
  },
  {
    path:'add-employee',
    component : AddEmployeeComponent
  },
  {
    path:'employees/edit/:id',
    component : EditEmployeeComponent
  },{
    path:'add-department',
    component : AddDepartmentComponent
  },{
    path:'departments',
    component : DepartmentsListComponent
  },{
    path:'master-data',
    component : ListingComponent
  },
  {
    path:'master-data/create-inv',
    component : CreateInvComponent
  },{
    path:'master-data/edit-inv/:invNo',
    component : CreateInvComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
