import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class MasterDetailsService {

  baseApiUrl:string  = environment.base_api_url;
  constructor(private htttp:HttpClient) { }

  getCustomers()
  {
    return this.htttp.get(this.baseApiUrl+'/api/Customer');
  }

  getProducts(){
    return this.htttp.get(this.baseApiUrl+'/api/Product');
  }

  getCustomersByCode(code:any){
    return this.htttp.get(this.baseApiUrl+'/api/Customer/GetByCode/'+code);
  }

  getProductByCode(code:any){
    return this.htttp.get(this.baseApiUrl+'/api/Product/GetByCode/'+code);
  }  

  SaveData(invoicedata:any){
    return this.htttp.post(this.baseApiUrl+'/api/MasterDetails/',invoicedata);
  }

  GetMasterDataByInv(invoiceno:any){
    return this.htttp.get(this.baseApiUrl+'/api/MasterDetails/GetMasterDataByInv/'+invoiceno);
  }
  GetMasterDetailByInv(invoiceno:any){
    return this.htttp.get(this.baseApiUrl+'/api/MasterDetails/GetMasterDetailByInv/'+invoiceno);
  }
  RemoveMasterDataByInv(invoiceno:any){
    return this.htttp.delete(this.baseApiUrl+'/api/MasterDetails/'+invoiceno);
  }

  GetAllMasterData(){
    return this.htttp.get(this.baseApiUrl+'/api/MasterDetails/');
  }

  AutoGeberatedInvNo(){
    return this.htttp.get(this.baseApiUrl+'/api/MasterDetails/AutoGeberatedInvNo');
  }

}
