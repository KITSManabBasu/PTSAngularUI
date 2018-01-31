import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { UtilityService } from '../utility.service';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-update-resourceallocation',
  templateUrl: './update-resourceallocation.component.html',
  styleUrls: ['./update-resourceallocation.component.css']
})
export class UpdateResourceallocationComponent implements OnInit {

    internalid:String='';
    datafindbyid:object={};
    resourceAllocationProp:ResourceAllocationProp;

  	confirmationString:string="Values Saved";
    isAdded: boolean=false;
    existingData:object={};

   
    userid:string;
    PROJECT_CODE:string;
    WON: number;
    BIL_DESC_ID: string;
    START_DATE:String;
    END_DATE:String;
    EXISTING_START_DATE:String;
    EXISTING_END_DATE:String;
    DAILY_RATE:number;
    CREATED_BY: string;
    UPDATED_BY: string;
    enableStartDate=true;
    enableEndDate=true;
    

  constructor(private router:Router, private route:ActivatedRoute, private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }

  

  ngOnInit() {
  
  var usersessionID = sessionStorage.getItem("userID"); 
    this.resourceAllocationProp=new ResourceAllocationProp();
  	
  	this.fetchProjectID();
  	this.fetchUserID();
  	this.fetchWons();
  	this.fetchBillingDesc();
    //this.fetchweeks();
  	this.route.params.subscribe(params=>{
  		this.internalid= params['id'];
  		if(this.internalid!==undefined)
  		{
  		 this.populateAllocationdetails(this.internalid);
  		}
  		
	  });
    this.CREATED_BY=this.UPDATED_BY=UtilityService.getCurrentSessionID();
    //this.setDefaultStartAndEndWeek()
  }
  populateAllocationdetails=function(targetInternalID: String)
  {
  	this.http.get(environment.apiBaseUrl + 'api/allocations/' + targetInternalID +'/'+new Date().getTime()).subscribe(
  		(res: Response)=>{
  			this.existingData=res.json();
        if(this.existingData!==null)
        {
    			this.PROJECT_CODE=this.existingData.PROJECT_CODE;
    			this.userid=this.existingData.userid;
    			this.WON=this.existingData.WON;
    			this.BIL_DESC_ID=this.existingData.BIL_DESC_ID;
    			this.EXISTING_START_DATE=this.START_DATE=UtilityService.convertISOtoStringDate(this.existingData.START_DATE);
    			this.EXISTING_END_DATE=this.END_DATE=UtilityService.convertISOtoStringDate(this.existingData.END_DATE);
    			this.DAILY_RATE=this.existingData.DAILY_RATE;
          this.setStartDateEnableDisabled();
          this.setEndDateEnableDisabled();
        }
        //alert(UtilityService.convertISOtoStringDate(this.existingData.START_DATE));
  			//alert(JSON.stringify(this.existingData));
  						
  		}
  		)
  }
setStartDateEnableDisabled=function() {  
this.http.get(environment.apiBaseUrl + 'api/allocationstimesheetexist/'+ this.internalid +'/'+this.EXISTING_START_DATE).subscribe((res:Response)=>
          {
            this.validatestartweek=res.json();
            if(this.validatestartweek)//start week already in TS
            {
              //alert("The time sheet already exist for the allocation start date.Unable to change.");
              this.enableStartDate=false;
            }
            else
            {
              this.enableStartDate=true;              
            }
          })
}

setEndDateEnableDisabled=function() {  
this.http.get(environment.apiBaseUrl + 'api/allocationstimesheetexist/'+ this.internalid +'/'+this.EXISTING_END_DATE).subscribe((res:Response)=>
            {
              this.validateendweek=res.json();
              //alert(this.validateendweek);
              if(this.validateendweek)//start week already in TS
              {
                //alert("The time sheet already exist for the allocation End date.Unable to change.");
                this.enableEndDate=false;
              }
              else
              {
                this.enableEndDate=true;              
              }
              //alert(this.enableEndDate);
            })
}

  /*setDefaultStartAndEndWeek=function () {
   var now = new Date();
   var next_week_start = new Date(now.getFullYear(), now.getMonth(), now.getDate()+(7 - now.getDay())).toISOString();
   var next_week_end = new Date(now.getFullYear(), now.getMonth(), now.getDate()+(13 - now.getDay())).toISOString();
   
   this.START_DATE=next_week_start;
   this.END_DATE=next_week_end;
   //return next_week_end;
   //return new Date().toISOString();
  }*/

  fetchProjectID= function(){
  	//this.ng4LoadingSpinnerService.show();
      this.http.get(environment.apiBaseUrl + 'api/projectdetails').subscribe(
  		(res: Response)=>{
  			this.resourceAllocationProp.PROJECT_CODE=res.json();
  			//this.ng4LoadingSpinnerService.hide();
  		}
  		)
    }

  fetchUserID= function(){
  	this.ng4LoadingSpinnerService.show();
      this.http.get(environment.apiBaseUrl + 'api/users').subscribe(
  		(res: Response)=>{
  			this.resourceAllocationProp.userid=res.json();
  			this.ng4LoadingSpinnerService.hide();
  		}
  		)
    }

    fetchWons= function(){
  	//this.ng4LoadingSpinnerService.show();
      this.http.get(environment.apiBaseUrl + 'api/wons').subscribe(
  		(res: Response)=>{
  			this.resourceAllocationProp.WON=res.json();
  			//this.ng4LoadingSpinnerService.hide();
  		}
  		)
    }

    fetchBillingDesc= function(){
  	//this.ng4LoadingSpinnerService.show();
      this.http.get(environment.apiBaseUrl + 'api/billdescrips').subscribe(
  		(res: Response)=>{
  			this.resourceAllocationProp.BIL_DESC_ID=res.json();
  			//this.ng4LoadingSpinnerService.hide();
  		}
  		)
    }

  fetchweeks= function(){
  //this.ng4LoadingSpinnerService.show();
      this.http.get(environment.apiBaseUrl + 'api/weeks').subscribe(
      (res: Response)=>{
        this.resourceAllocationProp.Weeks=res.json();
        //this.ng4LoadingSpinnerService.hide();
      }
      )
     }
    
  selectedProjectid: string='';
	selectProjectHandler(event:any){
	  this.selectedProjectid=event.target.value;
	}

    selectedUserid: string='';
	selectUseridHandler(event:any){
	  this.selectedUserid=event.target.value;
	}

	selectedWon: string='';
	selectWonHandler(event:any){
	  this.selectedWon=event.target.value;
	}

	selectedBillingDesc: string='';
	selectBillingDescHandler(event:any){
	  this.selectedBillingDesc=event.target.value;
   // alert(this.selectedBillingDesc);
	}

  selectedStartWeek: String='';   
    selectStartDatetHandler(event:any){
      this.selectedStartWeek=event.target.value;  
      this.START_DATE=this.selectedStartWeek;
  }

  selectedEndWeek: String='';   
    selectEndDatetHandler(event:any){
      this.selectedEndWeek=event.target.value;
      this.END_DATE=this.selectedEndWeek;      
  } 




convertISODatetoString= function(str1:string){return UtilityService.convertISOtoStringDate(str1);}
  
  addRecords=function(data){

  if(this.END_DATE>this.START_DATE)
  {
    	this.dataObj={
		"PROJECT_CODE":(this.selectedProjectid==='')? this.PROJECT_CODE :this.selectedProjectid,
		"userid":(this.selectedUserid==='')? this.userid :this.selectedUserid,
		"WON":(this.selectedWon==='')? this.WON :this.selectedWon,
		"BIL_DESC_ID":(this.selectedBillingDesc==='')? this.BIL_DESC_ID :this.selectedBillingDesc,
		"START_DATE":this.START_DATE,
		"END_DATE":this.END_DATE,
		"DAILY_RATE":data.DAILY_RATE,	
    "CREATED_BY" : this.CREATED_BY,
    "UPDATED_BY" : this.UPDATED_BY,	
		
		}
		//alert(JSON.stringify(this.dataObj));
		
		if(this.internalid!==undefined)
  		{
  		
  			console.log('Update Called');
        this.http.get(environment.apiBaseUrl + 'api/allocationsallow/'+ this.internalid +'/'+this.dataObj.userid+'/'+this.dataObj.START_DATE+'/'+this.dataObj.END_DATE).subscribe((res:Response)=>
          {
          this.validaionresult=res.json();
            if(this.validaionresult)//further validation to check if already allocatated during this period
              {
               //alert("disabled Save");
                
                this.http.post(environment.apiBaseUrl + 'api/allocations/'+ this.internalid,this.dataObj).subscribe((res:Response)=>
                {
                  console.log(res);       
                  this.isAdded=true;  
                  //this.clearFields();     
                })
              }
            else
              alert("User already allocated during this period, Please change the allocation date");
                   
          })
        //Check if TS already Logged for the changed period
       /* this.allowsave=true;
        if(this.EXISTING_START_DATE!=this.dataObj.START_DATE)
        {
          this.http.get(environment.apiBaseUrl + 'api/allocationstimesheetexist/'+ this.internalid +'/'+this.EXISTING_START_DATE).subscribe((res:Response)=>
          {
            this.validatestartweek=res.json();
            if(this.validatestartweek)//start week already in TS
            {
              alert("The time sheet already exist for the allocation start date.Unable to change.");
              this.allowsave=false;
              //return;
            }
            else
            {
              this.allowsave=true;              
            }
          })
        }
        else if(this.EXISTING_END_DATE!=this.dataObj.END_DATE)
        {
            this.http.get(environment.apiBaseUrl + 'api/allocationstimesheetexist/'+ this.internalid +'/'+this.EXISTING_END_DATE).subscribe((res:Response)=>
            {
              this.validatestartweek=res.json();
              if(this.validatestartweek)//start week already in TS
              {
                alert("The time sheet already exist for the allocation End date.Unable to change.");
                this.allowsave=false;
              }
              else
              {
                this.allowsave=true;              
              }
            })
        }
        else{
        alert(this.allowsave);
        if(this.allowsave)
        {
         this.http.get(environment.apiBaseUrl + 'api/allocationsallow/'+ this.internalid +'/'+this.dataObj.userid+'/'+this.dataObj.START_DATE+'/'+this.dataObj.END_DATE).subscribe((res:Response)=>
          {
          this.validaionresult=res.json();
            if(this.validaionresult)//further validation to check if already allocatated during this period
              {
               //alert("disabled Save");
                
                this.http.post(environment.apiBaseUrl + 'api/allocations/'+ this.internalid,this.dataObj).subscribe((res:Response)=>
                {
                  console.log(res);       
                  this.isAdded=true;  
                  //this.clearFields();     
                })
              }
            else
              alert("User already allocated during this period, Please change the allocation date");
                   
          })
        }
        }//
*/
  		}	
		else
		  {
  			console.log('Add New Called');

        this.http.get(environment.apiBaseUrl + 'api/allocationsallow/0/'+this.dataObj.userid+'/'+this.dataObj.START_DATE+'/'+this.dataObj.END_DATE).subscribe((res:Response)=>
        {
        this.validaionresult=res.json();
          if(this.validaionresult)
            {
              this.http.post(environment.apiBaseUrl + 'api/allocations',this.dataObj).subscribe((res:Response)=>
              {
                console.log(res);
                this.isAdded=true;
                this.clearFields();       
              })
            }
          else
            alert("User already allocated during this period, Please change the allocation date");
                 
          })
		    }
      }
      else
      {
        alert("End date should be always greater than start date");
      }
  }
  clearFields()
	{
		  this.PROJECT_CODE='';
		  this.userid='';
		  this.WON=0; 
		  this.BIL_DESC_ID=''; 	
		  this.START_DATE=''; 
		  this.END_DATE='';
		  this.DAILY_RATE=0; 		
      //this.setDefaultStartAndEndWeek();  
	} 
}
export class ResourceAllocationProp  
{
		PROJECT_CODE: Object[];
		userid: Object[];
		WON:Object[];
		BIL_DESC_ID:Object[];
    Weeks:Object[];
}
export class DropdownValue
{
	constructor(id:number, name:string) {
		this.id=id;
		this.name=name;
	}
	id:number;
	name:string;
}