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

   
    WON:string;
    bill_amount:number;
    billing_date: Date;
    bil_desc_id: string;
    po_number:number;
    sow_number:number;
    CREATED_BY: string;
    UPDATED_BY: string;

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
    this.CREATED_BY=this.UPDATED_BY=UtilityService.getCurrentSessionID();
  }
  populateFpdetails=function(targetInternalID: String)
  {
  	this.http.get(environment.apiBaseUrl + 'api/fpbillings/' + targetInternalID +'/'+new Date().getTime()).subscribe(
  		(res: Response)=>{
  			this.existingData=res.json();
        //alert(this.existingData[0].WON);
        if(this.existingData!==null)
        {
  			this.WON=this.existingData.WON;
  			this.bill_amount=this.existingData.bill_amount;
  			//this.billing_date=this.existingData.billing_date;
        this.billing_date=UtilityService.convertISOtoStringDate(this.existingData.billing_date);
  			this.bil_desc_id=this.existingData.bil_desc_id;
        this.po_number=this.existingData.po_number;
        this.sow_number=this.existingData.sow_number;
  			
        }			
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
    "po_number":data.po_number,
    "sow_number":data.sow_number,
		"CREATED_BY" : this.CREATED_BY,
    "UPDATED_BY" : this.UPDATED_BY,
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
		  this.WON='';
		  this.bill_amount=0;
		  this.billing_date=null;
		  this.bil_desc_id='';	
      this.po_number=0;
      this.sow_number=0;  			  
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
