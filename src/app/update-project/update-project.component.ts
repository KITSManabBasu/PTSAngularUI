import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router'; 
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
	internalid:String='';
    datafindbyid:object={};
    projectProp:ProjectProp;

    isActive: Array<DropdownValue>;
  	confirmationString:string="Values Saved";
    isAdded: boolean=false;
    existingData:object={};

    PROJECT_CODE: string;
    PROJECT_NAME: string;
    BUSINESS_AREA_ID:number;
    PROJECT_TYPE_ID:number;
    ACTIVE:number;

    BUDGET_CATEGORY_ID:string;
    PROJECT_CATEGORY_ID:string;
    BS_NON_BS:string;
    BUDGET_TYPE:string;
    CREATED_BY: string;
  	UPDATED_BY: string;


  constructor(private router:Router, private route:ActivatedRoute, private http:Http) { }

  ngOnInit() {
  this.route.params.subscribe(params=>{
  		this.internalid= params['id'];
  		if(this.internalid!==undefined)
  		  this.populateProjectdetails(this.internalid);
  		
	  });
	  this.projectProp = new ProjectProp();
	  this.fetchbusinessareas();
	  this.fetchprojecttypes();
	  this.getIsActive();
	  this.CREATED_BY=this.UPDATED_BY=UtilityService.getCurrentSessionID();
	  this.BUDGET_CATEGORY_ID='5a50a714f36d287cf86bece1';
	  this.PROJECT_CATEGORY_ID='5a50a5d7f36d287cf86becdb';
  }

  populateProjectdetails=function(targetInternalID: String)
	{
		this.http.get(environment.apiBaseUrl + 'api/projectdetails/' + targetInternalID +'/'+new Date().getTime()).subscribe(
  		(res: Response)=>{
  			this.existingData=res.json();
  			if(this.existingData!==null)
  			{
  				this.PROJECT_CODE=this.existingData.PROJECT_CODE;
  				this.PROJECT_NAME=this.existingData.PROJECT_NAME;
  				this.BUSINESS_AREA_ID=this.existingData.BUSINESS_AREA_ID;
  				this.PROJECT_TYPE_ID=this.existingData.PROJECT_TYPE_ID;
  				this.ACTIVE=this.existingData.ACTIVE;  				
  				this.BS_NON_BS=this.existingData.BS_NON_BS;
  				this.BUDGET_TYPE=this.existingData.BUDGET_TYPE;  				
  			//alert(JSON.stringify(this.existingData));
  			}
  			
  		}
  		)
	}
	getIsActive=function(){
		this.isActive = Array<DropdownValue>();
		this.isActive.push(new DropdownValue(1, 'Yes'));
		this.isActive.push(new DropdownValue(2, 'No'));		
		this.projectProp.ACTIVE = this.isActive; 
	}
	fetchbusinessareas= function(){
      this.http.get(environment.apiBaseUrl + 'api/businessareas').subscribe(
  		(res: Response)=>{
  			this.projectProp.BUSINESS_AREA_ID=res.json();
  		}
  		)
    }  
    fetchprojecttypes= function(){
      this.http.get(environment.apiBaseUrl + 'api/projecttypes').subscribe(
  		(res: Response)=>{
  			this.projectProp.PROJECT_TYPE_ID=res.json();
  		}
  		)
    }

    isExist=function()
	{
		this.http.get(environment.apiBaseUrl + 'api/projectdetails/' + this.PROJECT_CODE).subscribe(
  		(res: Response)=>{
  			this.datafindbyid=res.json();  			
  			if(this.datafindbyid!==null)
  				{ 
  					alert('Project Code Already exist');
  					this.PROJECT_CODE='';
  					return true;
  				}
  			else
  				return false;  						
  		}
  		)  		
	}
	selectedBusinessArea: string='';
	selectBusinessAreaHandler(event:any){
	  this.selectedBusinessArea=event.target.value;
	  //alert(this.selectedBusinessArea);
	} 
	selectedProjectType: string='';
	selectProjectTypeHandler(event:any){
	  this.selectedProjectType=event.target.value;
	  //alert(this.selectedProjectType);
	}  
	selectedActive: string='';
	selectActiveHandler(event:any){
	  this.selectedActive=event.target.value;
	  //alert(this.selectedActive);
	}
	addRecords=function(data){
	
	this.dataObj={
		"PROJECT_CODE":(data.PROJECT_CODE===undefined)? this.PROJECT_CODE :data.PROJECT_CODE,
		"PROJECT_NAME":data.PROJECT_NAME,		
		"BUSINESS_AREA_ID":(this.selectedBusinessArea==='')?this.BUSINESS_AREA_ID:this.selectedBusinessArea,
		"PROJECT_TYPE_ID":(this.selectedProjectType==='')?this.PROJECT_TYPE_ID:this.selectedProjectType,
		"ACTIVE":(this.selectedActive==='')?this.ACTIVE:this.selectedActive,
		"BUDGET_CATEGORY_ID":this.BUDGET_CATEGORY_ID ,	
		"PROJECT_CATEGORY_ID":this.PROJECT_CATEGORY_ID,
		"BS_NON_BS":"BS",
		"BUDGET_TYPE":"Cap",
		"CREATED_BY" : this.CREATED_BY,
		"UPDATED_BY" : this.UPDATED_BY
		}
		//alert(JSON.stringify(this.dataObj));
		
		if(this.internalid!==undefined)
  		{
  		
  			console.log('Update Called');
  			this.http.post(environment.apiBaseUrl + 'api/projectdetails/'+ this.internalid,this.dataObj).subscribe((res:Response)=>
			{
				console.log(res);				
				this.isAdded=true;	
				//this.clearFields();			
			})
  		}	
		else
		{
			console.log('Add New Called');
			this.http.post(environment.apiBaseUrl + 'api/projectdetails',this.dataObj).subscribe((res:Response)=>
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
		  this.PROJECT_NAME='';
		  this.BUSINESS_AREA_ID=0;
		  this.PROJECT_TYPE_ID=0;
		  this.ACTIVE=0;		   
		  this.BS_NON_BS='';
		  this.BUDGET_TYPE='';		   			  
	}
}
export class ProjectProp  
{
		BUSINESS_AREA_ID: Object[];
		PROJECT_TYPE_ID:Object[];				
		ACTIVE:DropdownValue;	
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
