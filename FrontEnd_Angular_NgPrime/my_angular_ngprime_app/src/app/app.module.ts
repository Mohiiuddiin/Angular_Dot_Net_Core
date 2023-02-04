import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule,FormControl } from '@angular/forms';
import {MenubarModule} from 'primeng/menubar';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/employees/edit-employee/edit-employee.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { DepartmentsListComponent } from './components/departments/departments-list/departments-list.component';
import { AddDepartmentComponent } from './components/departments/add-department/add-department.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';



import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { CreateInvComponent } from './components/master-details-example/create-inv/create-inv.component';
import {ToastModule} from 'primeng/toast';
import { ListingComponent } from './components/master-details-example/listing/listing.component';
import {ToolbarModule} from 'primeng/toolbar';
import {FieldsetModule} from 'primeng/fieldset';
import {BadgeModule} from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SliderModule} from 'primeng/slider';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MultiSelectModule} from 'primeng/multiselect';



@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeesListComponent,
    DepartmentsListComponent,
    AddDepartmentComponent,
    CreateInvComponent,
    // ListingComponent,
    CreateInvComponent,
    ListingComponent,

  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,HttpClientModule,
    AppRoutingModule,
    MenubarModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    ToolbarModule,
    FieldsetModule,
    BadgeModule,
    TagModule,
    RadioButtonModule,
    AutoCompleteModule,
    CheckboxModule,
    SelectButtonModule,
    InputTextareaModule,
    SliderModule,
    CalendarModule
    ,ConfirmDialogModule,
    MultiSelectModule

    // ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
