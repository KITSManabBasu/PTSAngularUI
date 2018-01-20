 import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  public isUserLoggedIn: boolean;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
    var userdata = sessionStorage.getItem("User");
    //alert(userdata);
    if(userdata!==null)
      this.isUserLoggedIn = true;
    return this.isUserLoggedIn;
  }

}