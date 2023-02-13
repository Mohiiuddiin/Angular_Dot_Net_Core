import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators,FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterDetailsService } from 'src/app/services/master-details.service';
import {FilterService, MessageService, PrimeNGConfig} from 'primeng/api';


@Component({
  selector: 'app-create-inv',
  templateUrl: './create-inv.component.html',
  styleUrls: ['./create-inv.component.css'],
  providers: [MessageService]

})
export class CreateInvComponent implements OnInit {

  pagetitle = "Create Master Detail Info";
  invoiceDetail!: FormArray<any>;
  masterCustomer : any;
  masterProduct : any;
  paymentTypes : any;
  invoiceProduct !: FormGroup<any>;
  isedit = false;
  editinvoiceno: any;
  masterDataInfoToEdit:any;
  masterDetailsDataInfoToEdit:any;
  messagetype:any;
  /**
   *
   */
  constructor(private builder:FormBuilder,private router:Router,private master_service: MasterDetailsService, private messageService: MessageService,
    private active_route:ActivatedRoute, private primengConfig: PrimeNGConfig, private filterService: FilterService) {  
  }

  
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getCustomers();
    this.getProducts();
    this.paymentTypes=["Cash","Card","Bkash","Nagad"]
    this.AutoGeberatedInvNo();

    this.editinvoiceno = this.active_route.snapshot.paramMap.get('invNo');
    
    console.log(this.editinvoiceno);
    if(this.editinvoiceno!=null){
      this.isedit = true;
      this.pagetitle = "Edit Invoice";
      this.InfoForMasterDetEdit(this.editinvoiceno);
    }    
  }
  
  invoiceForm = this.builder.group({
    invoiceNo:this.builder.control({value:'',disabled:true},Validators.required),
    //invoiceNo:this.builder.control('',Validators.required),
    customerId:this.builder.control('',Validators.required),
    customerName:this.builder.control(''),
    deliveryAddress:this.builder.control(''),
    remarks:this.builder.control(''),
    total:this.builder.control({value:0,disabled:true}),
    tax:this.builder.control({value:0,disabled:true}),
    netTotal:this.builder.control({value:0,disabled:true}),
    paymentType:this.builder.control(''),
    details:this.builder.array([])    
  });

  AutoGeberatedInvNo(){
    this.master_service.AutoGeberatedInvNo().subscribe(res => {
      let result :  any;
      result = res;
      console.log(result);
      this.invoiceForm.get("invoiceNo")?.setValue(result.invNo);
    });
  }
  saveData(){
    //console.log(this.invoiceForm.value);
    if (this.invoiceForm.valid) {
      console.log(this.invoiceForm.getRawValue());
      this.master_service.SaveData(this.invoiceForm.getRawValue()).subscribe(res => {
        let result: any;
        result = res;
        console.log(result);
        if (result.result == 'pass') {
           
          if(this.isedit){
            // this.alert.success('Updated Successfully.', 'Invoice :' + result.keyVal);
            this.messageService.add({key: 'key',severity: 'success',summary: 'updated successfully', detail: 'Invoice :' + result.keyVal});
            
            this.messagetype = "success";
          }else{
          // this.alert.success('Created Successfully.', 'Invoice :' + result.keyVal);
          // this.alert.add({severity:'success', summary: 'Success', detail: 'Invoice :' + result.keyVal});
          this.messageService.add({key: 'key',severity: 'success',summary: 'Saved Successfully', detail: 'Invoice :' + result.keyVal});
          this.messagetype = "success";

          }
          // this.router.navigate(['master-data/']);
        } else {
          // this.alert.error('Failed to save.', 'Invoice');
          this.messageService.add({key: 'key',severity: 'error',summary: 'Failed to save', detail: 'Invoice :' + result.keyVal});
          this.messagetype = "error";

        }
      });
    } else {
      // this.alert.warning('Please enter values in all mandatory filed', 'Validation');
      this.messageService.add({key: 'key',severity: 'error',summary: 'Please enter values in all mandatory filed', detail: 'Validation'});
      this.messagetype = "error";

    }
  }
  onConfirm() {
    this.messageService.clear('key');
    this.router.navigate(['master-data/']);
  }

  onReject(messagetype:string) {

    // console.log(messagetype+","+this.messagetype);
      this.messageService.clear('key');
      if(messagetype=="success"){
        this.router.navigate(['master-data/']);
      }
      // this.router.navigate(['master-data/']);
  }
  clear() {
    this.messageService.clear();
  }
  InfoForMasterDetEdit(invNo: any){
    //console.log('master: '+invNo)
    this.master_service.GetMasterDetailByInv(invNo).subscribe(res=>{
      
      this.masterDetailsDataInfoToEdit = res;
      //console.log(this.masterDetailsDataInfoToEdit);
      //console.log(this.masterDetailsDataInfoToEdit);
      for(let i = 0; i < this.masterDetailsDataInfoToEdit.length; i++){
          this.addNewEntry();
      }
    });


    this.master_service.GetMasterDataByInv(invNo).subscribe(res=>{
      this.masterDataInfoToEdit = res;

      // if(typeof(this.masterDataInfoToEdit.customerId)=="object"){
      //   this.master_service.getCustomersByCode(this.masterDataInfoToEdit.customerId).subscribe(res=>{    
        
      //     this.masterDetailsDataInfoToEdit.customerId = res;
      //     // console.log(this.masterDetailsDataInfoToEdit.customerId);
         
      //   });
      // }    
      
      if (this.masterDataInfoToEdit != null) {
        this.invoiceForm.setValue({
          invoiceNo: this.masterDataInfoToEdit.invoiceNo, customerId: this.masterDataInfoToEdit.customerId,
          customerName: this.masterDataInfoToEdit.customerName, deliveryAddress: this.masterDataInfoToEdit.deliveryAddress, remarks: this.masterDataInfoToEdit.remarks,
          total: this.masterDataInfoToEdit.total, tax: this.masterDataInfoToEdit.tax, netTotal: this.masterDataInfoToEdit.netTotal,paymentType:this.masterDataInfoToEdit.paymentType, details: this.masterDetailsDataInfoToEdit
        });       
      };
    });
    console.log(this.invoiceForm.get('paymentType'));
  }

  addNewEntry(){
    this.invoiceDetail = this.invoiceForm.get("details") as FormArray;    

    let customerId = this.invoiceForm.get("customerId")?.value;
    if ((customerId != null && customerId != '')  || this.isedit) {
      this.invoiceDetail.push(this.generateRow());
    } else {
      // this.alert.warning('Please select the customer', 'Validation');
    }
    
  }

  get invProducts(){
    return this.invoiceForm.get("details") as FormArray;
  }
    filterCountry(event:any) {
      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
      let filtered : any[] = [];
      let query = event.query;
      console.log(query);
      console.log(event);

      for(let i = 0; i < this.masterCustomer.length; i++) {
          let cust = this.masterCustomer[i];
          if (cust.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(cust);
          }
      }

      this.masterCustomer = filtered;
  }
  generateRow(){
    return this.builder.group({
        id:this.builder.control(0),
        invoiceNo:this.builder.control(''),
        pCode:this.builder.control('',Validators.required),
        productName:this.builder.control(''),
        qty:this.builder.control(''),
        salesPrice:this.builder.control(0),
        total:this.builder.control({value:0,disabled:true}),
    });
  }

  getCustomers(){
    this.master_service.getCustomers().subscribe(res=>{
      this.masterCustomer = res;
    })
  }

  getProducts(){
    this.master_service.getProducts().subscribe(res=>{
      this.masterProduct = res;
    })
  }

  onProductChange(index:any){

    console.log(index);
    this.invoiceDetail = this.invoiceForm.get("details") as FormArray;

    this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;
    let pcode = this.invoiceProduct.get("pCode")?.value;
    console.log(this.invoiceProduct);
    this.master_service.getProductByCode(pcode).subscribe(
      
      res=>{
        let proddata:any;
        proddata = res;
        console.log(proddata);
        if(proddata!=null){
          this.invoiceProduct.get("productName")?.setValue(proddata.name);
          this.invoiceProduct.get("salesPrice")?.setValue(proddata.price);
        }
      }
    )
  }

  onQtyChange(index:any){
    this.invoiceDetail = this.invoiceForm.get("details") as FormArray;
    this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;

    let qty = this.invoiceProduct.get("qty")?.value;
    let salesPrice = this.invoiceProduct.get("salesPrice")?.value;
    console.log(qty);
    console.log(salesPrice);
    if(qty>0){
      this.invoiceProduct.get("total")?.setValue(qty*salesPrice);
      //this.invoiceProduct.get("salesPrice")?.setValue(proddata.price);      
    }

    this.invSummaryCalc();

  }

  invSummaryCalc(){
    let data = this.invoiceForm.getRawValue().details;
    let sum = 0;

    data.forEach((x:any)=>{
      sum+=x.total;
    });

    let tax = (7 / 100) * sum;
    let net = sum + tax;

    this.invoiceForm.get("total")?.setValue(sum);
    this.invoiceForm.get("tax")?.setValue(tax);
    this.invoiceForm.get("netTotal")?.setValue(net);
  }

  onCustomerChange(){
    console.log("hello");
    var customercode = this.invoiceForm.get("customerId")?.value;
    
    console.log(typeof(customercode));
    
    this.master_service.getCustomersByCode(customercode).subscribe(res => {
      let custdata: any;
      custdata = res;
      if (custdata != null) {
        this.invoiceForm.get("deliveryAddress")?.setValue(custdata.address + ',' + custdata.phoneno + ',' + custdata.email);
        this.invoiceForm.get("customerName")?.setValue(custdata.name);
        
      }
    });
  }

  remove_this_prod(index:any){
    if(confirm('are you sure to remove this row?')){
      this.invProducts.removeAt(index);
      this.invSummaryCalc();
    }
  }
}
