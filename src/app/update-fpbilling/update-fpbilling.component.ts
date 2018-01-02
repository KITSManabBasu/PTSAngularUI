import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-update-fpbilling',
  templateUrl: './update-fpbilling.component.html',
  styleUrls: ['./update-fpbilling.component.css']
})
export class UpdateFpbillingComponent implements OnInit {
    internalid:String='';
    datafindbyid:object={};
    fpbillingProp:FpbillingProp;

  	confirmationString:string="Values Saved";
    isAdded: boolean=false;
    existingData:object={};

   
    WON:number;
    bill_amount:number;
    billing_date: string;
    bil_desc_id: string;
    CREATED_BY:string;
    CREATED_ON:string;
    UPDATED_BY:string;
    UPDATED_ON:string;

  constructor(private router:Router, private route:ActivatedRoute, private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
   var usersessionID = sessionStorage.getItem("userID"); 

  	this.route.params.subscribe(params=>{
  		this.internalid= params['id'];
  		if(this.internalid!==undefined)
  		{
  		  this.populateFpdetails(this.internalid);
  		}
  		else
  		{
  			this.CREATED_BY=usersessionID;  			
  		}
  		this.UPDATED_BY=usersessionID;
	  });
	  this.fpbillingProp = new FpbillingProp();
	  this.fetchWons();
  }
  populateFpdetails=function(targetInternalID: String)
  {
  	this.http.get(environment.apiBaseUrl + 'api/fpbillings/' + targetInternalID +'/'+new Date().getTime()).subscribe(
  		(res: Response)=>{
  			this.existingData=res.json();

  			this.WON=this.existingData[0].WON;
  			this.bill_amount=this.existingData[0].bill_amount;
  			this.billing_date=this.existingData[0].billing_date;
  			this.bil_desc_id=this.existingData[0].bil_desc_id;
  			this.CREATED_BY=this.existingData[0].CREATED_BY;
  			this.CREATED_ON=this.existingData[0].CREATED_ON;
  			this.UPDATED_BY=this.existingData[0].UPDATED_BY;
  			this.UPDATED_ON=this.existingData[0].UPDATED_ON;  			
  		}
  		)
  }
  fetchWons= function(){
  	this.ng4LoadingSpinnerService.show();
      this.http.get(environment.apiBaseUrl + 'api/wons').subscribe(
  		(res: Response)=>{
  			this.fpbillingProp.WON=res.json();
  			this.ng4LoadingSpinnerService.hide();
  		}
  		)
    }
  selectedWON: string='';
	selectWONHandler(event:any){
	  this.selectedWON=event.target.value;
	  //alert(this.selectedBusinessArea);
	}
 addRecords=function(data){
	
	this.dataObj={
		"WON":(this.selectedWON==='')? this.WON :this.selectedWON,
		"bill_amount":data.bill_amount,
		"billing_date":data.billing_date,
		"bil_desc_id":data.bil_desc_id,
		"CREATED_BY":data.CREATED_BY,
		"CREATED_ON":data.CREATED_ON,
		"UPDATED_BY":data.UPDATED_BY,		
		"UPDATED_ON":data.UPDATED_ON,
		}
		//alert(JSON.stringify(this.dataObj));
		
		if(this.internalid!==undefined)
  		{
  		
  			console.log('Update Called');
  			this.http.post(environment.apiBaseUrl + 'api/fpbillings/'+ this.internalid,this.dataObj).subscribe((res:Response)=>
			{
				console.log(res);				
				this.isAdded=true;	
				//this.clearFields();			
			})
  		}	
		else
		{
			console.log('Add New Called');
			this.http.post(environment.apiBaseUrl + 'api/fpbillings',this.dataObj).subscribe((res:Response)=>
			{
				console.log(res);
				this.isAdded=true;
				this.clearFields();				
			})
		}

	}
 clearFields()
	{
		  this.WON=0;
		  this.bill_amount=0;
		  this.billing_date='';
		  this.bil_desc_id='';	  			  
	} 

}
export class FpbillingProp  
{
		WON: Object[];
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
