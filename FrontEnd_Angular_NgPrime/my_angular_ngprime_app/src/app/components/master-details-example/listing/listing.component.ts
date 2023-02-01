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

  GetAllMasterData(){
    this.service.GetAllMasterData().subscribe(res=>{
      this.master_data_list = res;      
    })
  }

  removeMasterData(invoiceNo:any){
    if(confirm('are you sure?')){
      this.service.RemoveMasterDataByInv(invoiceNo).subscribe(res=>{
        let response : any;
        response = res;
        
        if(response.result=='pass'){
          //this.alert.success('Removed Successfully.', 'Remove Invoice')
          this.GetAllMasterData();
        } else {
          //this.alert.error('Failed to Remove.', 'Invoice');
        }
  
      });
    }
    
  }

  // Editinvoice(invoiceno: any) {
  //   this.router.navigateByUrl('/editinvoice/' + invoiceno);
  // }
  displayedColumns: string[] = ['invoiceNo','customerName', 'remarks','total','tax', 'netTotal','action'];
}
