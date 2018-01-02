import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx'; 
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-fpbilling',
  templateUrl: './fpbilling.component.html',
  styleUrls: ['./fpbilling.component.css']
})
export class FpbillingComponent implements OnInit {
  fpbillings=[];	
  constructor(private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }
  private headers=new Headers({'Content-Type':'application/json'});
  ngOnInit() {
  	this.fetchFpbillings();
  }

  fetchFpbillings= function(){
  this.ng4LoadingSpinnerService.show();
  	this.http.get(environment.apiBaseUrl + 'api/fpbillings').subscribe(
  		(res: Response)=>{
  			this.fpbillings=res.json();
        	this.ng4LoadingSpinnerService.hide();
  			//alert(JSON.stringify(res));
  		}
  		)
    }

    deleteFpbillings= function(id){
    if(confirm('Are you sure ?'))
	    {
	      const url=`${environment.apiBaseUrl + 'api/fpbillings'}/${id}`;
	      return this.http.delete(url, {headers:this.headers}).toPromise()
	      .then(()=>{
	      this.fetchFpbillings();
	      }

	      )
	    }
    }

}
