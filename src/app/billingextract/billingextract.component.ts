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

  constructor(private router:Router, private route:ActivatedRoute, private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }

  downloadFile(data: Response){
  var blob = new Blob([data], { type: 'text/csv' });
  var url= window.URL.createObjectURL(blob);
  window.open(url);
}

private saveAsBlob(data: any) {
    const blob = new Blob([data._body],
        { type: 'application/vnd.ms-excel' });
    const file = new File([blob], 'report.xlsx',
        { type: 'application/vnd.ms-excel' });

   // FileSaver.saveAs(file);
}

  addRecords=function(data){
  var destination=environment.apiBaseUrl + 'api/pocexcel/AAA/BBBB';
  		window.location.href=destination;

		/*console.log('Update Called');
  			this.http.get(environment.apiBaseUrl + 'api/pocexcel').subscribe(
		  		(res: Response)=>{
		  			this.existingData=res.json();
		  			
		  			if(this.existingData!==null)
		  			{

		  				console.log('Data Exist');
		  			}
		  		}
		  		)*/

		 /*this.http.get(environment.apiBaseUrl + 'api/pocexcel').subscribe(data => this.downloadFile(data)),//console.log(data),
                 error => console.log("Error downloading the file."),
                 () => console.info("OK");*/

             

		/*this.dataObj={
		"WON":(data.WON===undefined)? this.WON :data.WON,
		"WON_DESC":data.WON_DESC,		
		"WON_TYPE":(this.selectedWon==='')?this.WON_TYPE:this.selectedWon,
		"OFF_ON":(this.selectedOffon==='')?this.OFF_ON:this.selectedOffon,
		"IS_ACTIVE":(this.selectedIsActive==='')?this.IS_ACTIVE:this.selectedIsActive,
		"START_DATE":data.START_DATE,	
		"END_DATE":data.END_DATE,	
		"GEO_ID":(this.selectedGeo==='')?this.GEO_ID:this.selectedGeo,
		"OWNER_ID":(this.selectedOwner==='')?this.OWNER_ID:this.selectedOwner,
		"CREATED_BY" : this.CREATED_BY,		
		"UPDATED_BY" : this.UPDATED_BY,		
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
		}*/

	}

}
