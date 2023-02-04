import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MessageService, PrimeNGConfig} from 'primeng/api';
import { MasterDetailsService } from 'src/app/services/master-details.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  providers: [ConfirmationService,MessageService]

})
export class ListingComponent implements OnInit {
  
  master_data_list : any;
  invno:any;
  position: string = '';
  loading: boolean = true;
  masterCustomer : any;


  
  /**
   *
   */
  constructor(private service : MasterDetailsService,private alert:MessageService,private router:Router,private primengConfig: PrimeNGConfig
    ,private confirmationService: ConfirmationService) {
    
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    //throw new Error('Method not implemented.');
    this.GetAllMasterData();
    this.getCustomers();
    
  }

  getCustomers(){
    this.service.getCustomers().subscribe(res=>{
      this.masterCustomer = res;
    })
  }
  askToDelete(inv : any) {
    this.invno = inv;
    this.alert.add({key: 'key',severity: 'error',summary: 'Are you sure to delete this?', detail: 'Confirmation'});
  }

  confirmPosition(position: string,invNo:any) {
    this.position = position;


    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          // console.log(invNo);
          // console.log(position);
          this.service.RemoveMasterDataByInv(invNo).subscribe(res=>{
            
            let response : any;
            response = res;

            console.log(response);
            if(response.result=='pass'){
              //this.alert.success('Removed Successfully.', 'Remove Invoice')
              this.GetAllMasterData();
              this.alert.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
              // this.alert.clear('key'); 
              // msg = "success";  
              // summary = "Deleted Successfully";  
    
            } else {
              // msg = "error";
              // summary = "Deletion Failed"; 
            } 
          });
            
        },
        reject: (type:any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.alert.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.alert.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        },
        key: "positionDialog"
    });
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
      this.loading = false;
 
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

  clearTbl(table: any) {
    table.clear();
   }
  
}
