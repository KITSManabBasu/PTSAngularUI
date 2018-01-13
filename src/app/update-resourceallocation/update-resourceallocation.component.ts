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
    START_DATE:Date;
    END_DATE:Date;
    DAILY_RATE:number;
    CREATED_BY: string;
    UPDATED_BY: string;
    

  constructor(private router:Router, private route:ActivatedRoute, private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  var usersessionID = sessionStorage.getItem("userID"); 
    this.resourceAllocationProp=new ResourceAllocationProp();
  	
  	this.fetchProjectID();
  	this.fetchUserID();
  	this.fetchWons();
  	this.fetchBillingDesc();
  	this.route.params.subscribe(params=>{
  		this.internalid= params['id'];
  		if(this.internalid!==undefined)
  		{
  		 this.populateAllocationdetails(this.internalid);
  		}
  		else
  		{
  			//this.CREATED_BY=usersessionID;  			
  		}
  		//this.UPDATED_BY=usersessionID;
	  });
    this.CREATED_BY=this.UPDATED_BY=UtilityService.getCurrentSessionID();
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
    			this.START_DATE=UtilityService.convertISOtoStringDate(this.existingData.START_DATE);
    			this.END_DATE=UtilityService.convertISOtoStringDate(this.existingData.END_DATE);
    			this.DAILY_RATE=this.existingData.DAILY_RATE;
        }
  			//alert(JSON.stringify(this.existingData));
  						
  		}
  		)
  }
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

    addRecords=function(data){
    	this.dataObj={
		"PROJECT_CODE":(this.selectedProjectid==='')? this.PROJECT_CODE :this.selectedProjectid,
		"userid":(this.selectedUserid==='')? this.userid :this.selectedUserid,
		"WON":(this.selectedWon==='')? this.WON :this.selectedWon,
		"BIL_DESC_ID":(this.selectedBillingDesc==='')? this.selectedBillingDesc :this.selectedBillingDesc,
		"START_DATE":data.START_DATE,
		"END_DATE":data.END_DATE,
		"DAILY_RATE":data.DAILY_RATE,	
    "CREATED_BY" : this.CREATED_BY,
    "UPDATED_BY" : this.UPDATED_BY,	
		
		}
		//alert(JSON.stringify(this.dataObj));
		
		if(this.internalid!==undefined)
  		{
  		
  			console.log('Update Called');
  			this.http.post(environment.apiBaseUrl + 'api/allocations/'+ this.internalid,this.dataObj).subscribe((res:Response)=>
			{
				console.log(res);				
				this.isAdded=true;	
				//this.clearFields();			
			})
  		}	
		else
		{
			console.log('Add New Called');
			this.http.post(environment.apiBaseUrl + 'api/allocations',this.dataObj).subscribe((res:Response)=>
			{
				console.log(res);
				this.isAdded=true;
				this.clearFields();				
			})
		}
  }
  clearFields()
	{
		  this.PROJECT_CODE='';
		  this.userid='';
		  this.WON=0; 
		  this.BIL_DESC_ID=''; 	
		  this.START_DATE=null; 
		  this.END_DATE=null;
		  this.DAILY_RATE=0; 		  
	} 
}
export class ResourceAllocationProp  
{
		PROJECT_CODE: Object[];
		userid: Object[];
		WON:Object[];
		BIL_DESC_ID:Object[];
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