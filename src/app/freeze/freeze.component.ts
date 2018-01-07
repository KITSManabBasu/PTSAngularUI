import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx'; 
import { UtilityService } from '../utility.service';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-freeze',
  templateUrl: './freeze.component.html',
  styleUrls: ['./freeze.component.css']
})
export class FreezeComponent implements OnInit {

	internalid:String='';
    datafindbyid:object={};

  	confirmationString:string="Values Saved";
    isAdded: boolean=false;
    existingData:object={};

   
    SLNO:number;
    StartDate:string;
    EndDate: string;
    Freeze: boolean;    
    CREATED_BY: string;
    UPDATED_BY: string;
    
  constructor(private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }
  private headers=new Headers({'Content-Type':'application/json'});

  ngOnInit() {
  	this.populateFreezeData();
    this.CREATED_BY=this.UPDATED_BY=UtilityService.getCurrentSessionID();
  }
  populateFreezeData=function()
	{
		this.http.get(environment.apiBaseUrl + 'api/freezes/'+new Date().getTime()).subscribe(
  		(res: Response)=>{
  			this.existingData=res.json();

  			this.SLNO=this.existingData[0].SLNO;
  			this.StartDate=UtilityService.convertISOtoStringDate(this.existingData[0].StartDate);
  			this.EndDate=UtilityService.convertISOtoStringDate(this.existingData[0].EndDate);
  			this.Freeze=this.existingData[0].Freeze;
        
  			
  			//alert(JSON.stringify(this.existingData));
  						
  		}
  		)
	}

	addRecords=function(data){
    	this.dataObj={		
		"SLNO":data.SLNO,
		"StartDate":data.StartDate,
		"EndDate":data.EndDate,
		"Freeze":data.Freeze,
		"CREATED_BY" : this.CREATED_BY,
        "UPDATED_BY" : this.UPDATED_BY,
		}
		//alert(JSON.stringify(this.dataObj));
  			console.log('Update Called');
  			this.http.post(environment.apiBaseUrl + 'api/freezes/1',this.dataObj).subscribe((res:Response)=>
			{
				console.log(res);				
				this.isAdded=true;	
				//this.clearFields();			
			})
	}	


}
