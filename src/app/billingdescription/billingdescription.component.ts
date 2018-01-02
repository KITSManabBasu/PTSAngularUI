import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx'; 
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-billingdescription',
  templateUrl: './billingdescription.component.html',
  styleUrls: ['./billingdescription.component.css']
})
export class BillingdescriptionComponent implements OnInit {
  billdescrips=[];
  constructor(private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }
  private headers=new Headers({'Content-Type':'application/json'});
  ngOnInit() {
  	this.fetchBilldescrips();
  }

  fetchBilldescrips= function(){
  this.ng4LoadingSpinnerService.show();
  	this.http.get(environment.apiBaseUrl + 'api/billdescrips').subscribe(
  		(res: Response)=>{
  			this.billdescrips=res.json();
        	this.ng4LoadingSpinnerService.hide();
  			//alert(JSON.stringify(res));
  		}
  		)
    }

    deleteBilldescrips= function(id){
    if(confirm('Are you sure ?'))
	    {
	      const url=`${environment.apiBaseUrl + 'api/billdescrips'}/${id}`;
	      return this.http.delete(url, {headers:this.headers}).toPromise()
	      .then(()=>{
	      this.fetchBilldescrips();
	      }

	      )
	    }
    }

}
