import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx'; 
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectdetails=[];	
  constructor(private http:Http,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }
  private headers=new Headers({'Content-Type':'application/json'});

  ngOnInit() {
  	this.fetchProjectdeatails();
  }

  fetchProjectdeatails= function(){
  this.ng4LoadingSpinnerService.show();
  	this.http.get(environment.apiBaseUrl + 'api/projectdetails').subscribe(
  		(res: Response)=>{
  			this.projectdetails=res.json();
        this.ng4LoadingSpinnerService.hide();
  			//alert(JSON.stringify(res));
  		}
  		)
    }

    deleteProjectdetails= function(id){
    if(confirm('Are you sure ?'))
	    {
	      const url=`${environment.apiBaseUrl + 'api/projectdetails'}/${id}`;
	      return this.http.delete(url, {headers:this.headers}).toPromise()
	      .then(()=>{
	      this.fetchProjectdeatails();
	      }

	      )
	    }
    }

}
