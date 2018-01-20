import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

  constructor() { }
  
  public static convertISOtoStringDate(inputdate) {
    var date1 = new Date(inputdate);
			var year1 = date1.getFullYear();
			var month1 = date1.getMonth()+1;
			var dt1 = date1.getDate();

			var dt2: string;
			var month2: string;
			if (dt1 < 10) {
			  dt2 = '0' + dt1;
			}
			else
				dt2=dt1.toString();
			if (month1 < 10) {
			  month2 = '0' + month1;
			}
			else
				month2 =  month1.toString();	
			var startdate = year1+'-' + month2 + '-'+dt2;
  		return startdate;
  }

  public static getCurrentSessionID() {
    return this.getItemfromSessionStorage("userID");
/*    var user : any;
    user = sessionStorage.getItem("User");
    console.log('utiltiy - ' + user.username);
    return user.username;*/
  }

  public static setItemtoSessionStorage(key, value){
    if (typeof value === 'object')
      value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
  }

  public static getItemfromSessionStorage(key){
      var item = sessionStorage.getItem(key)
      if(this.isJson(item)) {
        console.log("item is object in sessionstorage");
        return JSON.parse(item);
      }
      else
        return item;
  }

  public static getCurrentUserSession() {
    return this.getItemfromSessionStorage("User");
  }

  private static isJson(item) {
    item = typeof item !== "string"
      ? JSON.stringify(item)
      : item;

    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }

    if (typeof item === "object" && item !== null) {
      return true;
    }
    return false;
  }


}
