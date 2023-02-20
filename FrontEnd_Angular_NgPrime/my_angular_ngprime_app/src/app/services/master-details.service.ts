import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class MasterDetailsService {
  pendingStatusCount = 0;  
  statusChanged = new EventEmitter<number>();  
  baseApiUrl:string  = environment.base_api_url;
  
  result : any;
  constructor(private htttp:HttpClient) { 
    this.GetAllMasterData().subscribe(res=>{
        this.result = res;            
        Object.keys(this.result).forEach(key => {                             
            if(this.result[key].status=='Pending'){
                this.pendingStatusCount = this.pendingStatusCount + 1;
            }
        });   
    });
    // console.log(this.pendingStatusCount);
  }

  getCustomers()
  {
    return this.htttp.get(this.baseApiUrl+'/api/Customer');
  }

  getProducts(){
    return this.htttp.get(this.baseApiUrl+'/api/Product');
  }

  getCustomersByCode(code:any){

    if(typeof(code)=="object"){
      return this.htttp.get(this.baseApiUrl+'/api/Customer/GetByCode/'+code.code);
    }else{
      return this.htttp.get(this.baseApiUrl+'/api/Customer/GetByCode/'+code);
    }
   
    
  }

  getProductByCode(code:any){
    return this.htttp.get(this.baseApiUrl+'/api/Product/GetByCode/'+code);
  }  

  SaveData(invoicedata:any){

    if(typeof(invoicedata.customerId)=="object"){
      invoicedata.customerId = invoicedata.customerId.code;
    }
    
    return this.htttp.post(this.baseApiUrl+'/api/MasterDetails/',invoicedata);
  }

  GetMasterDataByInv(invoiceno:any){
    return this.htttp.get(this.baseApiUrl+'/api/MasterDetails/GetMasterDataByInv/'+invoiceno);
  }
  GetMasterDetailByInv(invoiceno:any){
    return this.htttp.get(this.baseApiUrl+'/api/MasterDetails/GetMasterDetailByInv/'+invoiceno);
  }
  RemoveMasterDataByInv(invoiceno:any){
    this.statusOnChange();
    return this.htttp.delete(this.baseApiUrl+'/api/MasterDetails/'+invoiceno);
  }

  GetAllMasterData(){
    
    return this.htttp.get(this.baseApiUrl+'/api/MasterDetails/');
  }

  AutoGeberatedInvNo(){
    return this.htttp.get(this.baseApiUrl+'/api/MasterDetails/AutoGeberatedInvNo');
  }

  statusOnChange(){   
    this.pendingStatusCount = this.pendingStatusCount - 1;
    this.statusChanged.emit(this.pendingStatusCount);
    // return this.departments;
  }

}
