import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import { MasterDetailsService } from 'src/app/services/master-details.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  providers: [MessageService]

})
export class ListingComponent implements OnInit {
  
  master_data_list : any;
  invno:any;
  
  /**
   *
   */
  constructor(private service : MasterDetailsService,private alert:MessageService,private router:Router,private primengConfig: PrimeNGConfig) {
    
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    //throw new Error('Method not implemented.');
    this.GetAllMasterData();
  }


  askToDelete(inv : any) {
    this.invno = inv;
    this.alert.add({key: 'key',severity: 'error',summary: 'Are you sure to delete this?', detail: 'Confirmation'});
  }

  onReject() {

    // console.log(messagetype+","+this.messagetype);
      this.alert.clear('key');      
      // this.router.navigate(['master-data/']);
  }
  clear() {
    this.alert.clear();
  }
  GetAllMasterData(){
    this.service.GetAllMasterData().subscribe(res=>{
      this.master_data_list = res;      
    })
  }

  removeMasterData(invoiceNo:any){
    // if(confirm('are you sure?')){
      var msg = "";
      var summary = "";
      this.service.RemoveMasterDataByInv(invoiceNo).subscribe(res=>{
        let response : any;
        response = res;

        if(response.result=='pass'){
          //this.alert.success('Removed Successfully.', 'Remove Invoice')
          this.GetAllMasterData();
          this.alert.clear('key'); 
          msg = "success";  
          summary = "Deleted Successfully";  

        } else {
          msg = "error";
          summary = "Deletion Failed"; 
        } 
      });
    // }
     this.alert.add({key: 'key',severity: msg,summary: summary, detail: 'Invoice No:'+invoiceNo});
  }

  // Editinvoice(invoiceno: any) {
  //   this.router.navigateByUrl('/editinvoice/' + invoiceno);
  // }
  displayedColumns: string[] = ['invoiceNo','customerName', 'remarks','total','tax', 'netTotal','action'];
}
