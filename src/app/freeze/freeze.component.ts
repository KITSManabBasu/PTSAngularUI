import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx'; 
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
    UpdatedBy:string;
    UpdatedOn:string;
    
  constructor(private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }
  private headers=new Headers({'Content-Type':'application/json'});

  ngOnInit() {
  	this.populateFreezeData();
  }
  populateFreezeData=function()
	{
		this.http.get(environment.apiBaseUrl + 'api/freezes/'+new Date().getTime()).subscribe(
  		(res: Response)=>{
  			this.existingData=res.json();

  			this.SLNO=this.existingData[0].SLNO;
  			this.StartDate=this.existingData[0].StartDate;
  			this.EndDate=this.existingData[0].EndDate;
  			this.Freeze=this.existingData[0].Freeze;
  			this.UpdatedBy=this.existingData[0].UpdatedBy;
  			this.UpdatedOn=this.existingData[0].UpdatedOn;
  			
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
		"UpdatedBy":data.UpdatedBy,
		"UpdatedOn":data.UpdatedOn,			
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
