import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx'; 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	users=[];
  constructor(private http:Http) { }
  private headers=new Headers({'Content-Type':'application/json'});

  ngOnInit() {
  this.fetchUsers();
  }


  fetchUsers= function(){
  	this.http.get(environment.apiBaseUrl + 'api/users').subscribe(
  		(res: Response)=>{
  			this.users=res.json();
  			//alert(JSON.stringify(res));
  		}
  		)
    }

    deleteUser= function(id){
    if(confirm('Are you sure ?'))
    {
      const url=`${environment.apiBaseUrl + 'api/users'}/${id}`;
      return this.http.delete(url, {headers:this.headers}).toPromise()
      .then(()=>{
      this.fetchUsers();
      }

      )
    }
  }
}
