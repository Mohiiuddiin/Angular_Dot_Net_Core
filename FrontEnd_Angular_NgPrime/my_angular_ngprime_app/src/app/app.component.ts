import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem, SelectItemGroup } from 'primeng/api';
import { MasterDetailsService } from './services/master-details.service';
import { UserLoginService } from './services/user-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

    pendingStatusCount = 0;


    //////
    title = 'my_angular_ngprime_app';
    items: MenuItem[] = [];
    isMenuVisible = true;
    isadmin = false;
/**
 *
 */
    constructor(private route: Router, private service: UserLoginService,private master_service : MasterDetailsService) {        
    }

    ngOnInit() {
        this.GetAllMasterData();
        // this.pendingStatusCount = this.master_service.pendingStatusCount;
        this.master_service.statusChanged
        .subscribe(
            (stat: number) => {                
                this.pendingStatusCount = stat;
                // console.log(this.departments);
            }
        );
        this.items = [
            {
                label:'File',
                icon:'pi pi-fw pi-file',
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-plus',
                        items:[
                        {
                            label:'Bookmark',
                            icon:'pi pi-fw pi-bookmark'
                        },
                        {
                            label:'Video',
                            icon:'pi pi-fw pi-video'
                        },

                        ]
                    },
                    {
                        label:'Delete',
                        icon:'pi pi-fw pi-trash'
                    },
                    {
                        separator:true
                    },
                    {
                        label:'Export',
                        icon:'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label:'Departments',
                icon:'pi pi-fw pi-pencil',
                items:[
                    {
                        label:'List',
                        icon:'pi pi-fw pi-align-left',
                        routerLink: ["departments"]
                    },
                    {
                        label:'Add',
                        icon:'pi pi-fw pi-align-left',
                        routerLink: ["add-department"]
                    },
                    {
                        label:'Center',
                        icon:'pi pi-fw pi-align-center'
                    },
                    {
                        label:'Justify',
                        icon:'pi pi-fw pi-align-justify'
                    },

                ]
            },
            {
                label:'Employee',
                icon:'pi pi-fw pi-pencil',
                items:[
                    {
                        label:'List',
                        icon:'pi pi-fw pi-align-left',
                        routerLink: ["employees"]
                    },
                    {
                        label:'Add',
                        icon:'pi pi-fw pi-align-left',
                        routerLink: ["add-employee"]
                    },
                    {
                        label:'Center',
                        icon:'pi pi-fw pi-align-center'
                    },
                    {
                        label:'Justify',
                        icon:'pi pi-fw pi-align-justify'
                    },

                ]
            },
            {
                label:'Master-Data',
                icon:'pi pi-fw pi-user',
                items:[
                    {
                        label:'List',
                        icon:'pi pi-fw pi-user-plus',
                        routerLink: ["master-data"]

                    },
                    {
                        label:'Add',
                        icon:'pi pi-fw pi-user-minus',
                        routerLink: ["master-data/create-inv"]

                    },
                    {
                        label:'Search',
                        icon:'pi pi-fw pi-users',
                        items:[
                        {
                            label:'Filter',
                            icon:'pi pi-fw pi-filter',
                            items:[
                                {
                                    label:'Print',
                                    icon:'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon:'pi pi-fw pi-bars',
                            label:'List'
                        }
                        ]
                    }
                ]
            },
            {
                label:'Events',
                icon:'pi pi-fw pi-calendar',
                items:[
                    {
                        label:'Edit',
                        icon:'pi pi-fw pi-pencil',
                        items:[
                        {
                            label:'Save',
                            icon:'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label:'Delete',
                            icon:'pi pi-fw pi-calendar-minus'
                        },

                        ]
                    },
                    {
                        label:'Archieve',
                        icon:'pi pi-fw pi-calendar-times',
                        items:[
                        {
                            label:'Remove',
                            icon:'pi pi-fw pi-calendar-minus'
                        }
                        ]
                    }
                ]
            },
            {
                label:'Quit',
                icon:'pi pi-fw pi-power-off'
            }
        ];
    }

    result : any;
    stat : any;
    GetAllMasterData(){
        this.master_service.GetAllMasterData().subscribe(res=>{
            this.result = res;            
            Object.keys(this.result).forEach(key => {
                this.stat = this.result[key].status.toString();                
                if(this.stat=='Pending'){
                    this.pendingStatusCount++;
                }
            });
        })
      }
    
    ngDoCheck(): void {
        const currentroute = this.route.url;
        // console.log(currentroute);
        if (currentroute == '/login' || currentroute == '/register') {
          this.isMenuVisible = false
        } else {
          this.isMenuVisible = true
        }
    
        if (this.service.GetRole() == 'admin') {
          this.isadmin = true;
        }else{
          this.isadmin = false;
        }
      }
}
