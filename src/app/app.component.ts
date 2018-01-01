	import { Component } from '@angular/core';
  

	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css']
	})

	


	export class AppComponent {
	  title = 'app works!';

public menuItemsArray: any[] = [ 

       {"title":"User","link":"/user",
       "subItems":[
                   {"title":"Add/Modify User","link":"/user"},                                      
                  ]
       },

       {"title":"Details","link":"/won",
       "subItems":[
                   {"title":"WON Details","link":"/won"},
                   //{"title":"Add WON","link":"/updateWon"},  
                   {"title":"Project Detail","link":"/project"},
                   //{"title":"Add Project","link":"/updateProject"},                   
                  ]
       },
       
       {"title":"Timesheets","link":"/won",
       "subItems":[
                   {"title":"FP Billing","link":"/fpbilling"},
                   //{"title":"Add FP Billing","link":"/updateFpbilling"},  
                   {"title":"Resource Allocation","link":"/resourceallocation"},
                   //{"title":"Add Resource Allocation","link":"/updateResourceallocation"},
                   {"title":"Billing Description","link":"/billingdescription"},
                   //{"title":"Add Billing Description","link":"/updateBillingdescription"},   
                   {"title":"Freeze","link":"/freeze"},                
                  ]
       },
       {"title":"Report","link":"/billingextract",
       "subItems":[
                   {"title":"Billing Extract","link":"/billingextract"},
                                  
                  ]
       },
       
 ];

  public onMenuClose(){
    console.log("menu closed");
  }
  public onMenuOpen(){
    console.log("menu Opened");
  }
  public onItemSelect(item:any){
    //console.log(item);
    window.location.href = item.link;
  }


		}

	//}
