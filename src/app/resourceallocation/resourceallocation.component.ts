import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx'; 
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-resourceallocation',
  templateUrl: './resourceallocation.component.html',
  styleUrls: ['./resourceallocation.component.css']
})
export class ResourceallocationComponent implements OnInit {

  allocations=[];
  constructor(private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }
  private headers=new Headers({'Content-Type':'application/json'});

  ngOnInit() {
  	this.fetchAllocations();
  }

  fetchAllocations= function(){
  this.ng4LoadingSpinnerService.show();
  	this.http.get(environment.apiBaseUrl + 'api/allocations').subscribe(
  		(res: Response)=>{
  			this.allocations=res.json();
        	this.ng4LoadingSpinnerService.hide();
  			//alert(JSON.stringify(res));
  		}
  		)
    }

    deleteAllocations= function(id){
    if(confirm('Are you sure ?'))
	    {
	      const url=`${environment.apiBaseUrl + 'api/allocations'}/${id}`;
	      return this.http.delete(url, {headers:this.headers}).toPromise()
	      .then(()=>{
	      this.fetchAllocations();
	      }

	      )
	    }
    }

}
