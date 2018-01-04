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
   return sessionStorage.getItem("userID"); 
  }

}
