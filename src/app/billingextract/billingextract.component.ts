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
  selector: 'app-billingextract',
  templateUrl: './billingextract.component.html',
  styleUrls: ['./billingextract.component.css']
})
export class BillingextractComponent implements OnInit {

  weekProp:WeekProp;	
  WEEKSTARTDATE:String;
  WEEKENDDATE:String;
  WEEKSTARTPERIOD:Date;
  STARTPERIOD:number;
  STARTYEAR:number;
  //items: any[];
  periods: string[];
  years: string[];

  constructor(private router:Router, private route:ActivatedRoute, private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  this.weekProp = new WeekProp();
  this.fetchweeks();
  this.fetchperiods();

  }

convertISODatetoString= function(str1:string){return UtilityService.convertISOtoStringDate(str1);}
fetchweeks= function(){
      this.http.get(environment.apiBaseUrl + 'api/weeks').subscribe(
  		(res: Response)=>{
  			this.weekProp.Weeks=res.json();

  		}
  		)
     }
fetchperiods= function(){
      this.http.get(environment.apiBaseUrl + 'api/periods').subscribe(
  		(res: Response)=>{
  			this.weekProp.Periods=res.json();  			
  		}
  		)
     }

   selectedStartPeriod: string=null;
   selecteddisplayPeriod: string=null;	  
	  selectStartPeriodHandler(event:any){
	  	this.selectedStartPeriod=event.target.value;	  	
	  	var splitted = this.selectedStartPeriod.split("#", 3);
	  	//alert(splitted[0]);
	  	this.WEEKSTARTDATE=splitted[0];
	  	this.WEEKENDDATE=splitted[1];
	  	this.selecteddisplayPeriod=event.target.options[event.target.selectedIndex].text;
	}

			
	   
  selectedStartWeek: Date=null;	  
	  selectStartDatetHandler(event:any){
	  	this.selectedStartWeek=event.target.value;	
	}
	selectedEndWeek: Date=null;	  
	  selectEndDatetHandler(event:any){
	  	this.selectedEndWeek=event.target.value;	  	
	}   
  addRecords=function(data){

  var startdate=this.WEEKSTARTDATE;
  var enddate=this.WEEKENDDATE;
  var displayperiod=this.selecteddisplayPeriod;
  var displaystart=UtilityService.convertISOtoStringDate(startdate);
  var displayend=UtilityService.convertISOtoStringDate(enddate);

  var destination=environment.apiBaseUrl + 'api/extractfpbilling/'+startdate+'/'+enddate+'/'+displayperiod+'/'+displaystart+'/'+displayend;
  		window.location.href=destination;

	}

}
export class WeekProp  
{
		Weeks:Object[];	
		Periods:Object[];		
}
