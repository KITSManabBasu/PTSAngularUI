import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;

  constructor() { 
  	this.isUserLoggedIn = false;
  }

  setUserLoggedIn() {
  	this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
    var userdata = sessionStorage.getItem("userID"); 
    //alert(userdata);
    if(userdata!==null)
      this.isUserLoggedIn = true;
  	return this.isUserLoggedIn;
  }

}