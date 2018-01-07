import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private router:Router, private user:UserService) { }

  ngOnInit() {
  sessionStorage.removeItem("userID");
  sessionStorage.clear();
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
  	var username = e.target.elements[0].value;
  	var password = e.target.elements[1].value;  	

  	if(username == 'admin' && password == 'admin@123') {
      sessionStorage.setItem('userID', username);
      
      this.user.setUserLoggedIn();
  		this.router.navigate(['home']);
  	}

  }
}
