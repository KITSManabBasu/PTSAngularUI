import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service';
import { UtilityService } from '../utility.service';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {Http, Response, Headers} from '@angular/http';
import {MenuService} from "../menu.service";
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output() onFilter: EventEmitter<any> = new EventEmitter();

  constructor(private router:Router, private user:UserService, private http:Http, private menuService: MenuService,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }

  private userObjectId : string;
  private username : string;
  private password : string;
  public userData: any;

  loadMenu():void {
    // this.onFilter.emit('Register click');
    this.menuService.loadMenu();
  }

  ngOnInit() {
  sessionStorage.removeItem("userID");
  sessionStorage.removeItem("User");
  sessionStorage.clear();
  this.menuService.unLoadMenu();
  console.log('All Session Cleared');
  }

  isUserLogin= function(){
  if(UtilityService.getCurrentSessionID()!==null)
    return true;
  else
    return false;
}

  loginUser(e) {
  	e.preventDefault();
  	console.log(e);
  	var username = e.target.elements[1].value;
  	var password = e.target.elements[2].value;
    if(username == '' || password == '' ){
      alert('Please enter full credential');
      return;
    }
  	if(username == 'admin' && password == 'admin@123') {
      this.userData={
        "username":'admin',
        "isProjectUser":true,
        "isTimeSheetUser" : true,
        "isProjectReportUser" : true,
        "isTimeSheetReportUser" : true,
        "isTimeSheetUserAllocation" : true
      }
      UtilityService.setItemtoSessionStorage('User', this.userData);
      UtilityService.setItemtoSessionStorage('userID', username);
      this.user.setUserLoggedIn();
      this.loadMenu();
  		this.router.navigate(['home']);
  	}
  	else
    {
      this.validateLogin(username,password,e);
    }
  }

  validateLogin(loginId, password, event){
    console.log('in validateLogin');
    this.ng4LoadingSpinnerService.show();
    this.http.get(environment.apiBaseUrl + 'api/users/login/' + loginId +'/'+ password).subscribe(
      (res: Response)=>{
        if(res.json())
        {
          console.log('after res.json()');
          var response = JSON.parse(JSON.stringify(res.json()));
          if(response !== null)
          {
            console.log('userId and password validated');
            this.userData={
              "userObjectId":response._id,
              "username":response.userid,
              "lastname":response.lastname,
              "middlename":response.middlename,
              "firstname":response.firstname,
              "title":response.title,
              "employeeid":response.employeeid,
              "isProjectUser":response.isProjectUser,
              "isTimeSheetUser" : response.isTimeSheetUser,
              "isProjectReportUser" : response.isProjectReportUser,
              "isTimeSheetReportUser" : response.isTimeSheetReportUser,
              "isTimeSheetUserAllocation" : response.isTimeSheetUserAllocation
            }
            console.log(this.userData);
            this.user.setUserLoggedIn();
            UtilityService.setItemtoSessionStorage('User', this.userData);
            UtilityService.setItemtoSessionStorage('userID', this.userData.username);
            this.ng4LoadingSpinnerService.hide();
            this.loadMenu();
            this.router.navigate(['home']);
          }
        }
        else{
          event.target.elements[1].value = '';
          event.target.elements[2].value = '';
          this.ng4LoadingSpinnerService.hide();
          alert('Invalid Credentials');
        }
      },
      err => {
        console.log("Error occured.")
      }
    )
  }

}
