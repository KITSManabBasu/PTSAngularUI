	import { Component } from '@angular/core';
  

	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css']
	})

	


	export class AppComponent {
	  title = 'app works!';

private menuItemsArray: any[] = [ 

       {"title":"User","link":"/user",
       "subItems":[
                   {"title":"View User","link":"/user"},
                   {"title":"Add User","link":"/updateUser"},                   
                  ]
       },

       {"title":"Details","link":"/won",
       "subItems":[
                   {"title":"View WON","link":"/won"},
                   {"title":"Add WON","link":"/updateWon"},  
                   {"title":"View Project","link":"/project"},
                   {"title":"Add Project","link":"/updateProject"},                   
                  ]
       },
       
       {"title":"Timesheets","link":"/won",
       "subItems":[
                   {"title":"View FP Billing","link":"/fpbilling"},
                   {"title":"Add FP Billing","link":"/updateFpbilling"},  
                   {"title":"View Resource Allocation","link":"/resourceallocation"},
                   {"title":"Add Resource Allocation","link":"/updateResourceallocation"},
                   {"title":"View Billing Description","link":"/billingdescription"},
                   {"title":"Add Billing Description","link":"/updateBillingdescription"},   
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
  private onItemSelect(item:any){
    //console.log(item);
    window.location.href = item.link;
  }


		}

	//}
