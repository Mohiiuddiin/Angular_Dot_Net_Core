import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import { MenubarModule } from 'primeng/menubar';// import {MenuItem} from 'primeng/api';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    
    BrowserModule,BrowserAnimationsModule,
    AppRoutingModule,
    AccordionModule,MenubarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
