import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-update-won',
  templateUrl: './update-won.component.html',
  styleUrls: ['./update-won.component.css']
})
export class UpdateWonComponent implements OnInit {
  internalid:String='';
  datafindbyid:object={};
  wonProp:WonProp;
  wonType: Array<DropdownValue>;
  offOn: Array<DropdownValue>;
  isActive: Array<DropdownValue>;
  confirmationString:string="Values Saved";
  isAdded: boolean=false;
  existingData:object={};

  WON: string;
  WON_DESC: string;
  START_DATE: string;
  END_DATE: string;
  WON_TYPE:number;
  OFF_ON:number;
  GEO_ID:number;
  IS_ACTIVE:number;


  constructor(private router:Router, private route:ActivatedRoute, private http:Http) { }

  ngOnInit() {
   this.route.params.subscribe(params=>{
  		this.internalid= params['id'];
  		if(this.internalid!==undefined)
  		  this.populateWon(this.internalid);
  		
	  });
	  this.wonProp = new WonProp();
	  this.getWonType();
	  this.getOffon();
	  this.fetchgeos();
	  this.getIsActive();
  }

   populateWon=function(targetInternalID: String)
	{
		this.http.get(environment.apiBaseUrl + 'api/wons/' + targetInternalID +'/'+new Date().getTime()).subscribe(
  		(res: Response)=>{
  			this.existingData=res.json();

  			this.WON=this.existingData[0].WON;
  			this.WON_DESC=this.existingData[0].WON_DESC;
  			this.WON_TYPE=this.existingData[0].WON_TYPE;
  			this.OFF_ON=this.existingData[0].OFF_ON;
  			this.IS_ACTIVE=this.existingData[0].IS_ACTIVE;
  			this.START_DATE=this.existingData[0].START_DATE;
  			this.END_DATE=this.existingData[0].END_DATE;
  			this.GEO_ID=this.existingData[0].GEO_ID;
  		}
  		)
	}  
	getWonType=function(){
		this.WON_TYPE = Array<DropdownValue>();
		this.WON_TYPE.push(new DropdownValue(1, 'FP'));
		this.WON_TYPE.push(new DropdownValue(2, 'T&M'));
		this.WON_TYPE.push(new DropdownValue(3, 'SLR'));
		this.wonProp.WON_TYPE = this.WON_TYPE; 
	  }
	getOffon=function(){
		this.offOn = Array<DropdownValue>();
		this.offOn.push(new DropdownValue(1, 'Onsite'));
		this.offOn.push(new DropdownValue(2, 'Offshore'));		
		this.wonProp.OFF_ON = this.offOn; 
	  }

	fetchgeos= function(){
      this.http.get(environment.apiBaseUrl + 'api/geos').subscribe(
  		(res: Response)=>{
  			this.wonProp.GEO_ID=res.json();
  		}
  		)
     }
	getIsActive=function(){
		this.isActive = Array<DropdownValue>();
		this.isActive.push(new DropdownValue(1, 'Yes'));
		this.isActive.push(new DropdownValue(2, 'No'));		
		this.wonProp.IS_ACTIVE = this.isActive; 
	  }
	selectedWon: string='';
	selectWonHandler(event:any){
	  this.selectedWon=event.target.value;
	  }  

	selectedOffon: string='';
	selectOffOnHandler(event:any){
	  this.selectedOffon=event.target.value;
	  } 

	selectedGeo: string='';
	  selectedGeoText: string='';
	  selectGeoHandler(event:any){
	  	this.selectedGeo=event.target.value;
	  	this.selectedGeoText=event.target.options[event.target.selectedIndex].text;
	  }

	selectedIsActive: string='';
	selectIsActiveHandler(event:any){
	  this.selectedIsActive=event.target.value;
	  } 

	addRecords=function(data){
	this.dataObj={
		"WON":(data.WON===undefined)? this.WON :data.WON,
		"WON_DESC":data.WON_DESC,		
		"WON_TYPE":(this.selectedWon==='')?this.WON_TYPE:this.selectedWon,
		"OFF_ON":(this.selectedOffon==='')?this.OFF_ON:this.selectedOffon,
		"IS_ACTIVE":(this.selectedIsActive==='')?this.IS_ACTIVE:this.selectedIsActive,
		"START_DATE":data.START_DATE,	
		"END_DATE":data.END_DATE,	
		"GEO_ID":(this.selectedGeo==='')?this.GEO_ID:this.selectedGeo,
		"OWNER_NUMBER":0,
		"CREATED_BY" : "0",
		"CREATED_ON" : "12-12-2017",
		"UPDATED_BY" : "0",
		"UPDATED_ON" :"12-12-2020"
		}
		//alert(JSON.stringify(this.dataObj));
		
		if(this.internalid!==undefined)
  		{
  		
  			console.log('Update Called');
  			this.http.post(environment.apiBaseUrl + 'api/wons/'+ this.internalid,this.dataObj).subscribe((res:Response)=>
			{
				console.log(res);				
				this.isAdded=true;	
				//this.clearFields();			
			})
  		}	
		else
		{
			console.log('Add New Called');
			this.http.post(environment.apiBaseUrl + 'api/wons',this.dataObj).subscribe((res:Response)=>
			{
				console.log(res);
				this.isAdded=true;
				this.clearFields();				
			})
		}

	}
	isExist=function()
	{
		this.http.get(environment.apiBaseUrl + 'api/wons/' + this.WON).subscribe(
  		(res: Response)=>{
  			this.datafindbyid=res.json();  			
  			if(this.datafindbyid.length>0)
  				{ 
  					alert('WON Already exist');
  					this.WON='';
  					return true;
  				}
  			else
  				return false;  						
  		}
  		)
  		//alert(this.struser);
	}
	clearFields()
	{
		  this.WON='';
		  this.WON_DESC='';
		  this.START_DATE='';
		  this.END_DATE='';
		  this.WON_TYPE=0;
		  this.OFF_ON=0;
		  this.GEO_ID=0;
		  this.IS_ACTIVE=0;	    
	}
}
export class WonProp  
{
		WON_TYPE:DropdownValue;	
		OFF_ON:DropdownValue;	
		GEO_ID: Object[];	
		IS_ACTIVE:DropdownValue;	
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