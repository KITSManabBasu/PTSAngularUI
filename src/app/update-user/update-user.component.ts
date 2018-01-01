import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router'; 

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


	  constructor(private router:Router, private route:ActivatedRoute, private http:Http) { }

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
	  }
	userIsExist=function()
	{
		this.http.get(environment.apiBaseUrl + 'api/users/' + this.userid).subscribe(
  		(res: Response)=>{
  			this.userdatafindbyloginid=res.json();  			
  			if(this.userdatafindbyloginid.length>0)
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
  			this.userid=this.userexistingdata[0].userid;
  			this.password=this.userexistingdata[0].password;
  			this.employeeid=this.userexistingdata[0].employeeid;
  			this.role=this.userexistingdata[0].roleid;
  			this.roleText=this.userexistingdata[0].roleText;
  			this.title=this.userexistingdata[0].title;
  			this.team=this.userexistingdata[0].teamid;
  			this.teamText=this.userexistingdata[0].teamText;
  			this.firstname=this.userexistingdata[0].firstname;
  			this.middlename=this.userexistingdata[0].middlename;
  			this.lastname=this.userexistingdata[0].lastname;
  			this.billingtypes=this.userexistingdata[0].billingtypeid;
  			this.billingtypeText=this.userexistingdata[0].billingtypeText;
  			this.teamleads=this.userexistingdata[0].teamleadid;
  			this.teamleadText=this.userexistingdata[0].teamleadText;
  			this.locs=this.userexistingdata[0].locid;
  			this.locText=this.userexistingdata[0].locText;
  			this.desigs=this.userexistingdata[0].desigid;
  			this.desigText=this.userexistingdata[0].desigText;
  			this.isu=this.userexistingdata[0].isu;
  			this.usertypes=this.userexistingdata[0].usertypeid;
  			this.usertypeText=this.userexistingdata[0].usertypeText;
  			this.companies=this.userexistingdata[0].companyid;
  			this.companyText=this.userexistingdata[0].companyText;
  			this.mobileno=this.userexistingdata[0].mobileno;
  			this.deskphno=this.userexistingdata[0].deskphno;
  			this.geos=this.userexistingdata[0].geoid;
  			this.geoText=this.userexistingdata[0].geoText;
  			this.chkProjectUser=this.userexistingdata[0].isProjectUser;
  			this.chkTimeSheetUser=this.userexistingdata[0].isTimeSheetUser;
  			this.chkProjectReportUser=this.userexistingdata[0].isProjectReportUser;
  			this.chkTimeSheetReportUser=this.userexistingdata[0].isTimeSheetReportUser;
  			this.chkTimeSheetUserAllocation=this.userexistingdata[0].isTimeSheetUserAllocation;
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
      this.http.get(environment.apiBaseUrl + 'api/users').subscribe(
  		(res: Response)=>{
  			this.userprop.teamleads=res.json();
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
		"selectedRoleText":(this.selectedRoleText==='')?this.roleText:this.selectedRoleText,
		"selectedTeam":(this.selectedTeam==='')?this.team:this.selectedTeam,
		"selectedTeamText":(this.selectedTeamText==='')?this.teamText:this.selectedTeamText,
		"firstname":user.firstname,
		"middlename":user.middlename,
		"lastname":user.lastname,
		"selectedBillingType":(this.selectedBillingType==='')? this.billingtypes: this.selectedBillingType,
		"selectedBillingTypeText":(this.selectedBillingTypeText==='')? this.billingtypeText:this.selectedBillingTypeText,
		"selectedTeamLead":(this.selectedTeamLead==='')? this.teamleads:this.selectedTeamLead,
		"selectedTeamLeadText":(this.selectedTeamLeadText==='')? this.teamleadText: this.selectedTeamLeadText,
		"selectedLoc":(this.selectedLoc==='')? this.locs: this.selectedLoc,
		"selectedLocText":(this.selectedLocText==='')? this.locText : this.selectedLocText,
		"selectedDesig":(this.selectedDesig==='') ? this.desigs:this.selectedDesig,
		"selectedDesigText":(this.selectedDesigText==='')? this.desigText:this.selectedDesigText,
		"isu":user.isu,
		"selectedUserType":(this.selectedUserType==='')? this.usertypes:this.selectedUserType,
		"selectedUserTypeText":(this.selectedUserTypeText==='')? this.usertypeText:this.selectedUserTypeText,
		"selectedCompany":(this.selectedCompany==='')? this.companies: this.selectedCompany ,
		"selectedCompanyText":(this.selectedCompanyText==='')? this.companyText : this.selectedCompanyText,
		"mobileno":user.mobileno,
		"deskphno":user.deskphno,
		"selectedGeo":(this.selectedGeo==='')? this.geos:this.selectedGeo ,
		"selectedGeoText":(this.selectedGeoText==='')? this.geoText:this.selectedGeoText ,
		"isProjectUser":this.chkProjectUser,
		"isTimeSheetUser":this.chkTimeSheetUser,
		"isProjectReportUser":this.chkProjectReportUser,
		"isTimeSheetReportUser":this.chkTimeSheetReportUser,
		"isTimeSheetUserAllocation":this.chkTimeSheetUserAllocation,
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
	  selectedRoleText: string='';
	  selectRoleHandler(event:any){
	  	this.selectedRole=event.target.value;
	  	this.selectedRoleText=event.target.options[event.target.selectedIndex].text;
	  }	  
	  selectedTeam: string='';
	  selectedTeamText: string='';
	  selectTeamHandler(event:any){
	  	this.selectedTeam=event.target.value;
	  	this.selectedTeamText=event.target.options[event.target.selectedIndex].text;
	  }
	  selectedBillingType: string='';
	  selectedBillingTypeText: string='';
	  selectBillingTypeHandler(event:any){
	  	this.selectedBillingType=event.target.value;
	  	this.selectedBillingTypeText=event.target.options[event.target.selectedIndex].text;
	  }
	  selectedTeamLead: string='';
	  selectedTeamLeadText: string='';
	  selectTeamLeadHandler(event:any){
	  	this.selectedTeamLead=event.target.value;
	  	this.selectedTeamLeadText=event.target.options[event.target.selectedIndex].text;
	  }
	  selectedLoc: string='';
	  selectedLocText: string='';
	  selectLocsHandler(event:any){
	  	this.selectedLoc=event.target.value;
	  	this.selectedLocText=event.target.options[event.target.selectedIndex].text;
	  }
	  selectedDesig: string='';
	  selectedDesigText: string='';
	  selectDesigHandler(event:any){
	  	this.selectedDesig=event.target.value;
	  	this.selectedDesigText=event.target.options[event.target.selectedIndex].text;
	  }
	  selectedUserType: string='';
	  selectedUserTypeText: string='';
	  selectUserTypeHandler(event:any){
	  	this.selectedUserType=event.target.value;
	  	this.selectedUserTypeText=event.target.options[event.target.selectedIndex].text;
	  }
	  selectedCompany: string='';
	  selectedCompanyText: string='';
	  selectCompanyHandler(event:any){
	  	this.selectedCompany=event.target.value;
	  	this.selectedCompanyText=event.target.options[event.target.selectedIndex].text;
	  }
	  selectedGeo: string='';
	  selectedGeoText: string='';
	  selectGeoHandler(event:any){
	  	this.selectedGeo=event.target.value;
	  	this.selectedGeoText=event.target.options[event.target.selectedIndex].text;
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


