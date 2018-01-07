import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router'; 
import {UserService} from '../user.service';
import { UtilityService } from '../utility.service';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

	@Component({
	  selector: 'app-update-user',
	  templateUrl: './update-user.component.html',
	  styleUrls: ['./update-user.component.css']
	})
	export class UpdateUserComponent implements OnInit {
/*	
items: any[] = [{id: 1, value: 'item1'}, {id: 2, value: 'item2'}, {id: 3, value: 'item3'}];
myModel: any = {id: this.items[1].id , value: this.items[1].value};

simpleItems: string[] = ['item1', 'item2', 'item3'];
mySimpleModel: string =this.simpleItems[1]; */

	userInternalid:String='';
	userexistingdata:object={};
	userdatafindbyloginid:object={};
	userprop:UserProp;
	usertitle: Array<UserTitle>;
    isAdded: boolean=false;
    confirmationString:string="User Saved";

    userid: string;
	password:string;
	employeeid: string;
	role:number;
	title:number;
	team:number;
	firstname:string;
	middlename:string;
	lastname:string;
	billingtypes:number;
	teamleads:number;
	locs:number;
	desigs:number;
	isu:string;
	usertypes:number;
	companies:number;
	mobileno:string;
	deskphno:string;
	geos:number;

	CREATED_BY: string;
  	UPDATED_BY: string;


	  constructor(private user: UserService,private router:Router, private route:ActivatedRoute, private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }

	  ngOnInit() {
	  this.route.params.subscribe(params=>{
  		this.userInternalid= params['id'];
  		if(this.userInternalid!==undefined)
  		  this.populateUser(this.userInternalid);
  		
	  });
	    this.userprop = new UserProp();
	    
		this.getTitle();
		this.fetchRoles();
		this.fetchTeams();
		this.fetchbillingtypes();
		this.fetchteamleads();
		this.fetchdesigs();
		this.fetchusertypes();
		this.fetchcompanies();
		this.fetchlocs();
		this.fetchgeos();
		this.CREATED_BY=this.UPDATED_BY=UtilityService.getCurrentSessionID();
		
	  }
	userIsExist=function()
	{
		this.http.get(environment.apiBaseUrl + 'api/users/' + this.userid).subscribe(
  		(res: Response)=>{
  			this.userdatafindbyloginid=res.json();  			
  			if(this.userdatafindbyloginid!==null)
  				{ 
  					alert('User ID Already exist');
  					this.userid='';
  					return true;
  				}
  			else
  				return false;  						
  		}
  		)
  		//alert(this.struser);
	}
	populateUser=function(targetUserID: String)
	{
		this.http.get(environment.apiBaseUrl + 'api/users/' + targetUserID +'/'+new Date().getTime()).subscribe(
  		(res: Response)=>{
  			this.userexistingdata=res.json();
  			
  			//alert(JSON.stringify(this.userexistingdata));
  			if(this.existingData!==null)
  			{
  			this.userid=this.userexistingdata.userid;
  			this.password=this.userexistingdata.password;
  			this.employeeid=this.userexistingdata.employeeid;
  			this.role=this.userexistingdata.roleid;
  			//this.roleText=this.userexistingdata.roleText;
  			this.title=this.userexistingdata.title;
  			this.team=this.userexistingdata.teamid;
  			//this.teamText=this.userexistingdata[0].teamText;
  			this.firstname=this.userexistingdata.firstname;
  			this.middlename=this.userexistingdata.middlename;
  			this.lastname=this.userexistingdata.lastname;
  			this.billingtypes=this.userexistingdata.billingtypeid;
  			//this.billingtypeText=this.userexistingdata[0].billingtypeText;
  			this.teamleads=this.userexistingdata.teamleadid;
  			//this.teamleadText=this.userexistingdata[0].teamleadText;
  			this.locs=this.userexistingdata.locid;
  			//this.locText=this.userexistingdata[0].locText;
  			this.desigs=this.userexistingdata.desigid;
  			//this.desigText=this.userexistingdata[0].desigText;
  			this.isu=this.userexistingdata.isu;
  			this.usertypes=this.userexistingdata.usertypeid;
  			//this.usertypeText=this.userexistingdata[0].usertypeText;
  			this.companies=this.userexistingdata.companyid;
  			//this.companyText=this.userexistingdata[0].companyText;
  			this.mobileno=this.userexistingdata.mobileno;
  			this.deskphno=this.userexistingdata.deskphno;
  			this.geos=this.userexistingdata.geoid;
  			//this.geoText=this.userexistingdata[0].geoText;
  			this.chkProjectUser=this.userexistingdata.isProjectUser;
  			this.chkTimeSheetUser=this.userexistingdata.isTimeSheetUser;
  			this.chkProjectReportUser=this.userexistingdata.isProjectReportUser;
  			this.chkTimeSheetReportUser=this.userexistingdata.isTimeSheetReportUser;
  			this.chkTimeSheetUserAllocation=this.userexistingdata.isTimeSheetUserAllocation;
  			}
  			
  		}
  		)
	}  
	getTitle=function(){
		this.usertitle = Array<UserTitle>();
		this.usertitle.push(new UserTitle(1, 'Mr'));
		this.usertitle.push(new UserTitle(2, 'Mrs'));
		this.usertitle.push(new UserTitle(3, 'Ms'));

		this.userprop.usertitle = this.usertitle; 
	  }
	fetchRoles= function(){
    this.http.get(environment.apiBaseUrl + 'api/roles').subscribe(
  		(res: Response)=>{
  			this.userprop.roles=res.json();
  		}
  		)
    }
    
/*
    public rolesarray: tbl_role[];
    fetchRoles= function() {  
        this.http.get(environment.apiBaseUrl + 'api/roles').subscribe(
  		(res: Response)=>{
  			this.rolesarray=res.json();
  		}
  		) 
    } 
*/
	fetchTeams= function(){
    this.http.get(environment.apiBaseUrl + 'api/teams').subscribe(
  		(res: Response)=>{
  			this.userprop.teams=res.json();
  		}
  		)
    }	 
	fetchbillingtypes= function(){
      this.http.get(environment.apiBaseUrl + 'api/billingtypes').subscribe(
  		(res: Response)=>{
  			this.userprop.billingtypes=res.json();
  		}
  		)
     }
     fetchteamleads= function(){
     this.ng4LoadingSpinnerService.show();
      this.http.get(environment.apiBaseUrl + 'api/users').subscribe(
  		(res: Response)=>{
  			this.userprop.teamleads=res.json();
  			this.ng4LoadingSpinnerService.hide();
  		}
  		)
     }
     fetchdesigs= function(){
      this.http.get(environment.apiBaseUrl + 'api/desigs').subscribe(
  		(res: Response)=>{
  			this.userprop.desigs=res.json();
  		}
  		)
     }
     fetchusertypes= function(){
      this.http.get(environment.apiBaseUrl + 'api/usertypes').subscribe(
  		(res: Response)=>{
  			this.userprop.usertypes=res.json();
  		}
  		)
     }
     fetchcompanies= function(){
      this.http.get(environment.apiBaseUrl + 'api/companies').subscribe(
  		(res: Response)=>{
  			this.userprop.companies=res.json();
  		}
  		)
     }
     fetchlocs= function(){
      this.http.get(environment.apiBaseUrl + 'api/locs').subscribe(
  		(res: Response)=>{
  			this.userprop.locs=res.json();
  		}
  		)
     }
     fetchgeos= function(){
      this.http.get(environment.apiBaseUrl + 'api/geos').subscribe(
  		(res: Response)=>{
  			this.userprop.geos=res.json();
  		}
  		)
     }
     checkboxValue:boolean;
     chkProjectUser:boolean=false;
     chkTimeSheetUser:boolean=false;
     chkProjectReportUser:boolean=false;
     chkTimeSheetReportUser:boolean=false;
     chkTimeSheetUserAllocation:boolean=false;
     newFunction()
	    {
	    }
	  clearFields()
	    {
	    this.userid='';
	    this.password='';
	    this.employeeid='';
	    this.role=0;
	    this.title=0;
  		this.team=0;
  		this.firstname='';
  	    this.middlename='';
  		this.lastname='';
  		this.billingtypes=0;
  		this.teamleads=0;
  		this.locs=0;
  		this.desigs=0;
  		this.isu='';
  		this.usertypes=0;
  		this.companies=0;
  		this.mobileno='';
  		this.deskphno='';
  		this.geos=0;
  		this.chkProjectUser=false;
  		this.chkTimeSheetUser=false;
  		this.chkProjectReportUser=false;
  		this.chkTimeSheetReportUser=false;
  		this.chkTimeSheetUserAllocation=false;
	    }  
	    
	  addNewUser=function(user){

		this.userObj={
		"userid":(user.userid===undefined)? this.userid :user.userid,
		"password":user.password,
		"employeeid":user.employeeid,
		"selectedTitle":(this.selectedTitle==='')?this.title:this.selectedTitle,
		"selectedRole":(this.selectedRole==='')?this.role:this.selectedRole,
		"selectedTeam":(this.selectedTeam==='')?this.team:this.selectedTeam,
		"firstname":user.firstname,
		"middlename":user.middlename,
		"lastname":user.lastname,
		"selectedBillingType":(this.selectedBillingType==='')? this.billingtypes: this.selectedBillingType,
		"selectedTeamLead":(this.selectedTeamLead==='')? this.teamleads:this.selectedTeamLead,
		"selectedLoc":(this.selectedLoc==='')? this.locs: this.selectedLoc,
		"selectedDesig":(this.selectedDesig==='') ? this.desigs:this.selectedDesig,
		"isu":user.isu,
		"selectedUserType":(this.selectedUserType==='')? this.usertypes:this.selectedUserType,
		"selectedCompany":(this.selectedCompany==='')? this.companies: this.selectedCompany ,
		"mobileno":user.mobileno,
		"deskphno":user.deskphno,
		"selectedGeo":(this.selectedGeo==='')? this.geos:this.selectedGeo ,
		"isProjectUser":this.chkProjectUser,
		"isTimeSheetUser":this.chkTimeSheetUser,
		"isProjectReportUser":this.chkProjectReportUser,
		"isTimeSheetReportUser":this.chkTimeSheetReportUser,
		"isTimeSheetUserAllocation":this.chkTimeSheetUserAllocation,
		"CREATED_BY" : this.CREATED_BY,		
		"UPDATED_BY" : this.UPDATED_BY,	
		}
		//alert(JSON.stringify(this.userObj));
		
		if(this.userInternalid!==undefined)
  		{
  		
  			console.log('Update Called');
  			this.http.post(environment.apiBaseUrl + 'api/users/'+ this.userInternalid,this.userObj).subscribe((res:Response)=>
			{
				console.log(res);				
				this.isAdded=true;	
				//this.clearFields();			
			})
  		}	
		else
		{
			console.log('Add New Called');
			this.http.post(environment.apiBaseUrl + 'api/users',this.userObj).subscribe((res:Response)=>
			{
				console.log(res);
				this.isAdded=true;
				this.clearFields();				
			})
		}
	  }

	  selectedTitle: string='';
	  selectTitleHandler(event:any){
	  this.selectedTitle=event.target.value;
	  }
	  selectedRole: string='';
	  selectRoleHandler(event:any){
	  	this.selectedRole=event.target.value;
	  }	  
	  selectedTeam: string='';	  
	  selectTeamHandler(event:any){
	  	this.selectedTeam=event.target.value;
	  }
	  selectedBillingType: string='';
	  selectBillingTypeHandler(event:any){
	  	this.selectedBillingType=event.target.value;
	  }
	  selectedTeamLead: string='';
	  selectTeamLeadHandler(event:any){
	  	this.selectedTeamLead=event.target.value;
	  }
	  selectedLoc: string='';
	  selectLocsHandler(event:any){
	  	this.selectedLoc=event.target.value;
	  }
	  selectedDesig: string='';
	  selectDesigHandler(event:any){
	  	this.selectedDesig=event.target.value;
	  }
	  selectedUserType: string='';
	  selectUserTypeHandler(event:any){
	  	this.selectedUserType=event.target.value;
	  }
	  selectedCompany: string='';
	  selectCompanyHandler(event:any){
	  	this.selectedCompany=event.target.value;
	  }
	  selectedGeo: string='';
	  selectGeoHandler(event:any){
	  	this.selectedGeo=event.target.value;
	  }
	  
	}

export class UserProp  
{
		usertitle:UserTitle;
		roles: Object[];
		//roles: tbl_role[]; 
		teams: Object[]; 
		billingtypes: Object[]; 
		teamleads: Object[]; 
		desigs: Object[];
		usertypes: Object[];
		companies: Object[];
		locs: Object[];
		geos: Object[];
}

export class UserTitle
{
	constructor(id:number, name:string) {
		this.id=id;
		this.name=name;
	}
	id:number;
	name:string;
}
export class tbl_role {  
    ROLE_ID: number;  
    ROLE_DESC: string;   
}


