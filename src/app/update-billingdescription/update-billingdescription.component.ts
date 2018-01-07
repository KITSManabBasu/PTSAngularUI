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
  selector: 'app-update-billingdescription',
  templateUrl: './update-billingdescription.component.html',
  styleUrls: ['./update-billingdescription.component.css']
})
export class UpdateBillingdescriptionComponent implements OnInit {

    internalid:String='';
    datafindbyid:object={};
    billdescripsProp:BilldescripsProp;

  	confirmationString:string="Values Saved";
    isAdded: boolean=false;
    existingData:object={};

    billingType: Array<DropdownValue>;

    TYPE: string;
    DESCRIPTION: string;
   	CREATED_BY: string;
	UPDATED_BY: string;

  constructor(private router:Router, private route:ActivatedRoute, private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  	var usersessionID = sessionStorage.getItem("userID"); 

  	this.route.params.subscribe(params=>{
  		this.internalid= params['id'];
  		if(this.internalid!==undefined)
  		{
  		  this.populateBilldescrips(this.internalid);
  		}
  		else
  		{
  			this.CREATED_BY=usersessionID;  			
  		}
  		this.UPDATED_BY=usersessionID;
	  });

	  this.billdescripsProp = new BilldescripsProp();
	  this.getBillingType();
	  this.CREATED_BY=this.UPDATED_BY=UtilityService.getCurrentSessionID();
  }

  populateBilldescrips=function(targetInternalID: String)
  {
  	this.http.get(environment.apiBaseUrl + 'api/billdescrips/' + targetInternalID +'/'+new Date().getTime()).subscribe(
  		(res: Response)=>{
  			this.existingData=res.json();

  			if(this.existingData!==null){
  			this.TYPE=this.existingData.TYPE;
  			this.DESCRIPTION=this.existingData.DESCRIPTION;
  			this.CREATED_BY=this.existingData.CREATED_BY;
  			this.CREATED_WHEN=this.existingData.CREATED_WHEN;
  			this.UPDATED_BY=this.existingData.UPDATED_BY;
  			this.UPDATED_WHEN=this.existingData.UPDATED_WHEN;  
  			}						
  		}
  		)
  }

getBillingType=function(){
		this.billingType = Array<DropdownValue>();
		this.billingType.push(new DropdownValue(1, 'T&M'));
		this.billingType.push(new DropdownValue(2, 'FP'));
		
		this.billdescripsProp.BillingType = this.billingType; 
	  }
	  selectedType: string='';
	  selectTYPEHandler(event:any){
	  this.selectedType=event.target.value;
	  //alert(this.selectedBusinessArea);
	}
addRecords=function(data){
	
	this.dataObj={
		"TYPE":(this.selectedType==='')? this.TYPE :this.selectedType,
		"DESCRIPTION":data.DESCRIPTION,
		"CREATED_BY" : this.CREATED_BY,
		"UPDATED_BY" : this.UPDATED_BY,
		}
		//alert(JSON.stringify(this.dataObj));
		
		if(this.internalid!==undefined)
  		{
  		
  			console.log('Update Called');
  			this.http.post(environment.apiBaseUrl + 'api/billdescrips/'+ this.internalid,this.dataObj).subscribe((res:Response)=>
			{
				console.log(res);				
				this.isAdded=true;	
				//this.clearFields();			
			})
  		}	
		else
		{
			console.log('Add New Called');
			this.http.post(environment.apiBaseUrl + 'api/billdescrips',this.dataObj).subscribe((res:Response)=>
			{
				console.log(res);
				this.isAdded=true;
				this.clearFields();				
			})
		}

	}
 clearFields()
	{
		  this.TYPE='';
		  this.DESCRIPTION='';	  			  
	} 

}
export class BilldescripsProp  
{
		BillingType: Object[];
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
