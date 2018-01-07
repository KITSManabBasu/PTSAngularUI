	import { Component } from '@angular/core';
  import { AuthguardGuard } from './authguard.guard';
  import { UserService } from './user.service'; 
  import { UtilityService } from './utility.service';
  import { Observable } from 'rxjs/Observable';

	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css']
	})

	


	export class AppComponent {
	  title = 'PTS Reimagined!';


     isLoggedIn$: Observable<boolean>; 
     constructor(private userService: UserService) { }
      ngOnInit() {
       this.isLoggedIn$ = this.userService.isUserLoggedIn;
    }

ngAfterViewInit() {
       // alert(UtilityService.getCurrentSessionID());
    }
   

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
                   {"title":"Timesheet","link":"/timesheet"},
                   {"title":"Billing Description","link":"/billingdescription"},
                   {"title":"Freeze","link":"/freeze"},                
                  ]
       },
       {"title":"Report","link":"/billingextract",
       "subItems":[
                   {"title":"Billing Extract","link":"/billingextract"},
                                  
                  ]
       },
       {"title":"Account","link":"/billingextract",
       "subItems":[
                   {"title":"Log out","link":""},
                                  
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
