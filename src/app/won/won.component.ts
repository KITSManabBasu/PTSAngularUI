import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx'; 
import { UtilityService } from '../utility.service';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-won',
  templateUrl: './won.component.html',
  styleUrls: ['./won.component.css']
})
export class WonComponent implements OnInit {
  wons=[];	
  constructor(private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }
  private headers=new Headers({'Content-Type':'application/json'});

  ngOnInit() {
  this.fetchWons();
  }
  fetchWons= function(){
  this.ng4LoadingSpinnerService.show();
  	this.http.get(environment.apiBaseUrl + 'api/wons').subscribe(
  		(res: Response)=>{
  			this.wons=res.json();
        this.ng4LoadingSpinnerService.hide();
  			//alert(JSON.stringify(res));
  		}
  		)
    }
convertISODatetoString= function(str1:string){return UtilityService.convertISOtoStringDate(str1);}
    deleteWon= function(id){
    if(confirm('Are you sure ?'))
	    {
	      const url=`${environment.apiBaseUrl + 'api/wons'}/${id}`;
	      return this.http.delete(url, {headers:this.headers}).toPromise()
	      .then(()=>{
	      this.fetchWons();
	      }

	      )
	    }
    }
}
