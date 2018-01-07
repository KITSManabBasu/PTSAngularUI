import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {forEach} from "@angular/router/src/utils/collection";

import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import {isNullOrUndefined} from "util";
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private http:Http) { }

  ngOnInit() {
    this.validateTimesheetFreezed();
    this.populateTimesheet(new Date());
  }

  timesheetId: string;
  userId: string;
  currentDate: Date;
  startDate: Date;
  endDate: Date;
  sundayDate: Date;
  mondayDate: Date;
  tuesdayDate: Date;
  wednesdayDate: Date;
  thursdayDate: Date;
  fridayDate: Date;
  saturdayDate: Date;
  projectCode: string;
  projectSundayHour: number;
  projectMondayHour: number;
  projectTuesdayHour: number;
  projectWednesdayHour: number;
  projectThursdayHour: number;
  projectFridayHour: number;
  projectSaturdayHour: number;
  leaveCode: string = "LEAVE";
  leaveSundayHour: number;
  leaveMondayHour: number;
  leaveTuesdayHour: number;
  leaveWednesdayHour: number;
  leaveThursdayHour: number;
  leaveFridayHour: number;
  leaveSaturdayHour: number;

  timesheetObj: any;
  datePipe: DatePipe = new DatePipe("en-US");
  freezeStartDate: Date;
  freezeEndDate: Date;
  allocationId: string;

  public clearTime(event,flag) {
    console.log(event);
    flag = "";
    //console.log(flag);
  }

  public validateTimesheetFreezed()
  {
   /* this.freezeStartDate = new Date("2018-02-01");
    this.freezeEndDate = new Date("2018-02-07");*/
    
    this.http.get(environment.apiBaseUrl + 'api/freezes/').subscribe(
      (res: Response)=>{
        if(res.json())
        {
          var response = JSON.parse(JSON.stringify(res.json()));
          console.log('in validateTimesheetFreezed');
          if(response.length > 0)
          {
            console.log('timesheet is freezed');
            this.freezeStartDate = new Date(response[0].StartDate); 
            this.freezeEndDate = new Date(response[0].EndDate); 
            console.log(this.freezeStartDate);
            console.log(this.freezeEndDate);
          }
        }
      },
      err => {
        console.log("Error occured.")
      }
    )
  }

  public populateTimesheet(date) {
    //clear all variables
    this.clearAllfields();
    this.userId = "5a509ccca4bff81e20a56a00"; //Sandip Das
    if(date)
      this.currentDate = new Date(date);
    else
      this.currentDate = new Date();
    this.startDate = this.getStartOfWeek(this.currentDate);
    this.sundayDate = this.startDate;
    this.mondayDate = this.getDayOfWeek(this.startDate,1);
    this.tuesdayDate = this.getDayOfWeek(this.startDate,2);
    this.wednesdayDate = this.getDayOfWeek(this.startDate,3);
    this.thursdayDate = this.getDayOfWeek(this.startDate,4);
    this.fridayDate = this.getDayOfWeek(this.startDate,5);
    this.saturdayDate = this.getDayOfWeek(this.startDate,6);
    this.endDate = new Date(this.saturdayDate);
    console.log((this.endDate));
    this.http.get(environment.apiBaseUrl + 'api/timesheet/' + this.userId +'/'+ this.datePipe.transform(this.startDate, 'yyyy-MM-dd')).subscribe(
      (res: Response)=>{
        if(res.json())
        {
          this.timesheetObj = JSON.parse(JSON.stringify(res.json()));
          //console.log(this.timesheetObj);
          //console.log(this.timesheetObj.length);
          if(this.timesheetObj.length > 0)
          {
            console.log('timesheet exists');
            console.log(this.timesheetObj);
            this.timesheetId = this.timesheetObj[0]._id;
            this.allocationId = this.timesheetObj[0].allocationId;
            this.projectCode = this.timesheetObj[0].projectCode;
            //Populate Allocation Id and Project Code for latest allocation
            this.checkForValidAllocation();
            this.projectSundayHour = this.timesheetObj[0].projectSundayHour;
            this.projectMondayHour = this.timesheetObj[0].projectMondayHour;
            this.projectTuesdayHour = this.timesheetObj[0].projectTuesdayHour;
            this.projectWednesdayHour = this.timesheetObj[0].projectWednesdayHour;
            this.projectThursdayHour = this.timesheetObj[0].projectThursdayHour;
            this.projectFridayHour = this.timesheetObj[0].projectFridayHour;
            this.projectSaturdayHour = this.timesheetObj[0].projectSaturdayHour;
            //this.leaveCode = '0000';
            this.leaveSundayHour = this.timesheetObj[0].leaveSundayHour;
            this.leaveMondayHour = this.timesheetObj[0].leaveMondayHour;
            this.leaveTuesdayHour = this.timesheetObj[0].leaveTuesdayHour;
            this.leaveWednesdayHour = this.timesheetObj[0].leaveWednesdayHour;
            this.leaveFridayHour = this.timesheetObj[0].leaveFridayHour;
            this.leaveSaturdayHour = this.timesheetObj[0].leaveSaturdayHour;
          }
          else
          {
            console.log("timesheet doesn't exist");
            //check for any alllocation based on startdate
            this.checkForValidAllocation();
          }
        }
      },
      err => {
        console.log("Error occured.")
      }
    )
  }

  public checkForValidAllocation()
  {
      this.http.get(environment.apiBaseUrl + 'api/allocation/' + this.userId +'/'+ this.datePipe.transform(this.startDate, 'yyyy-MM-dd')).subscribe(
    (res: Response)=>{
      if(res.json())
      {
        var response = JSON.parse(JSON.stringify(res.json()))
        console.log(response);
        if(response.length > 0 )
        {
          var allocation = response[0];
          console.log('allocation exists');
          console.log(response[0]);
          this.allocationId = allocation._id;
          this.projectCode = allocation.PROJECT_CODE.PROJECT_CODE;
          console.log(this.projectCode);
        }
        else
        {
          console.log("allocation doesn't exist");
        }
    }
    },
    err => {
      console.log("Error occured.")
    }
    )
  }

  public clearAllfields()
  {
    this.timesheetId = null;
    this.allocationId = null;
    this.projectCode = null;
    this.projectSundayHour = null;
    this.projectMondayHour = null;
    this.projectTuesdayHour = null;
    this.projectWednesdayHour = null;
    this.projectThursdayHour = null;
    this.projectFridayHour = null;
    this.projectSaturdayHour = null;
    //this.leaveCode = '0000';
    this.leaveSundayHour = null;
    this.leaveMondayHour = null;
    this.leaveTuesdayHour = null;
    this.leaveWednesdayHour = null;
    this.leaveThursdayHour = null;
    this.leaveFridayHour = null;
    this.leaveSaturdayHour = null;
  }

  public showPreviousWeek()
  {
    this.populateTimesheet(this.getStartOfWeek(this.getDayOfWeek(this.startDate,-6)));
    console.log('showPreviousWeek')
  }

  public showCurrentWeek()
  {
    this.populateTimesheet(this.getStartOfWeek(this.getDayOfWeek(new Date(),0)));
    console.log('showCurrentWeek')
  }

  public showNextWeek()
  {
    this.populateTimesheet(this.getStartOfWeek(this.getDayOfWeek(this.endDate, 1 )));
    console.log('showNextWeek')
  }

  saveTimesheet=function(event){

    if(isNullOrUndefined(this.projectCode)) {
      alert('Resource allocation is not available');
      return;
    }

    console.log(this.datePipe.transform(this.startDate, 'yyyy-MM-dd'));

    this.timesheetObj={
      "userId":this.userId,
      "startDate":this.datePipe.transform(this.startDate, 'yyyy-MM-dd'),
      "endDate":this.datePipe.transform(this.endDate, 'yyyy-MM-dd'),
      "projectCode":this.projectCode,
      "projectSundayHour":this.projectSundayHour,
      "projectMondayHour":this.projectMondayHour,
      "projectTuesdayHour":this.projectTuesdayHour,
      "projectWednesdayHour":this.projectWednesdayHour,
      "projectThursdayHour":this.projectThursdayHour,
      "projectFridayHour":this.projectFridayHour,
      "projectSaturdayHour":this.projectSaturdayHour,
      "leaveSundayHour":this.leaveSundayHour,
      "leaveMondayHour":this.leaveMondayHour,
      "leaveTuesdayHour":this.leaveTuesdayHour,
      "leaveWednesdayHour":this.leaveWednesdayHour,
      "leaveThursdayHour":this.leaveThursdayHour,
      "leaveFridayHour":this.leaveFridayHour,
      "leaveSaturdayHour":this.leaveSaturdayHour,
      "allocationId":this.allocationId
    }
    //alert(JSON.stringify(this.timesheetObj));

    if(this.timesheetId != null)
    {
      console.log(this.timesheetId);
      console.log('Update Called');
      this.http.post(environment.apiBaseUrl + 'api/timesheet/'+ this.timesheetId,this.timesheetObj).subscribe((res:Response)=>
      {
        console.log(res);
        //this.isAdded=true;
      })
    }
    else
    {
      console.log('Add New Called');
      this.http.post(environment.apiBaseUrl + 'api/timesheet',this.timesheetObj).subscribe((res:Response)=>
      {
        console.log(res);
        //this.isAdded=true;
      })
    }
  }

  public getStartOfWeek(date) {

    // Copy date if provided, or use current date if not
    date = date? new Date(+date) : new Date();
    date.setHours(0,0,0,0);

    // Set date to previous Sunday
    date.setDate(date.getDate() - date.getDay());
    return date;
  }

  public getDayOfWeek(startDate, day) {
    var date = new Date(startDate);
    date.setDate(date.getDate() + day);
    return date;
  }
}
