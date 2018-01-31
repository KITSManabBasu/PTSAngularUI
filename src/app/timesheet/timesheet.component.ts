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
import {UserService} from '../user.service';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private http:Http, private user:UserService
  ,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.CREATED_BY=this.UPDATED_BY=UtilityService.getCurrentSessionID();
    this.ng4LoadingSpinnerService.show();
    this.populateUserList();
    this.validateTimesheetFreezed();
    this.populateTimesheet(new Date(), true);
    this.ng4LoadingSpinnerService.hide();
  }

  timesheetMap: Map<string, string>;
  allocationMap: Map<string, any>;

  projectText: string = "PROJECT";
  leaveText: string = "LEAVE";

  allocationIdSun: string;
  allocationIdMon: string;
  allocationIdTue: string;
  allocationIdWed: string;
  allocationIdThurs: string;
  allocationIdFri: string;
  allocationIdSat: string;

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

  projectSundayHour: number;
  projectMondayHour: number;
  projectTuesdayHour: number;
  projectWednesdayHour: number;
  projectThursdayHour: number;
  projectFridayHour: number;
  projectSaturdayHour: number;
  leaveSundayHour: number;
  leaveMondayHour: number;
  leaveTuesdayHour: number;
  leaveWednesdayHour: number;
  leaveThursdayHour: number;
  leaveFridayHour: number;
  leaveSaturdayHour: number;

  timesheetObj: any[];
  datePipe: DatePipe = new DatePipe("en-US");
  freezeStartDate: Date;
  freezeEndDate: Date;
  allocationId: string;

  userList: any;
  enableUserList: boolean = false;
  CREATED_BY: string;
  UPDATED_BY: string;

  projectCodeSun: string;
  projectCodeMon: string;
  projectCodeTue: string;
  projectCodeWed: string;
  projectCodeThurs: string;
  projectCodeFri: string;
  projectCodeSat: string;


  public clearTime(event,flag) {
    console.log(event);
    flag = "";
    //console.log(flag);
  }

  public validateTimesheetFreezed()
  {
   /* this.freezeStartDate = new Date("2018-02-01");
    this.freezeEndDate = new Date("2018-02-07");*/
    console.log('in validateTimesheetFreezed');
    this.http.get(environment.apiBaseUrl + 'api/freezes').subscribe(
      (res: Response)=>{
        if(res.json())
        {
          var response = JSON.parse(JSON.stringify(res.json()));
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
        this.ng4LoadingSpinnerService.hide();
        console.log("Error occured.")
      }
    )
  }

  public populateUserList(){
    this.http.get(environment.apiBaseUrl + 'api/users').subscribe(
      (res: Response)=>{
        if(res.json())
        {
          this.userList = JSON.parse(JSON.stringify(res.json()));
          console.log(this.userList);
        }
        else
        {
          console.log("no user exists");
          //check for any alllocation based on startdate
          //this.checkForValidAllocation();
        }
      },
      err => {
        console.log("Error occured.")
        this.ng4LoadingSpinnerService.hide();
      }
    )
  }

  public populateUserTimesheet(event){
    //console.log(event.target.value);
    if(event.target.value === "")
      return;
    this.populateTimesheet(new Date(),false);
  }

  public getTimesheetUser(isSessionUser){
    //this.userId = "5a509ccca4bff81e20a56a00"; //Sandip Das
    if(isSessionUser) {
      var userSession: any;
      userSession = UtilityService.getItemfromSessionStorage("User");
      console.log(userSession);
      this.userId = userSession.userObjectId;
      console.log(userSession.userObjectId);
      console.log('UserSession - ' + JSON.parse(JSON.stringify(userSession)));
      var userName = userSession.username;
      if (userName === 'admin') {
        this.enableUserList = true;
        console.log(this.enableUserList);
        this.userId = '';
      }
      console.log('isSessionUser-' + this.enableUserList);
    }
    else{
      console.log(this.userId);
      //this.userId = userSession.userObjectId;
    }
  }

  public populateTimesheet(date,isSessionUser) {
    //clear all variables
    this.clearAllfields();
    this.getTimesheetUser(isSessionUser);
    if(this.userId != "") {
      if (date)
        this.currentDate = new Date(date);
      else
        this.currentDate = new Date();
      this.startDate = this.getStartOfWeek(this.currentDate);
      this.sundayDate = this.startDate;
      this.mondayDate = this.getDayOfWeek(this.startDate, 1);
      this.tuesdayDate = this.getDayOfWeek(this.startDate, 2);
      this.wednesdayDate = this.getDayOfWeek(this.startDate, 3);
      this.thursdayDate = this.getDayOfWeek(this.startDate, 4);
      this.fridayDate = this.getDayOfWeek(this.startDate, 5);
      this.saturdayDate = this.getDayOfWeek(this.startDate, 6);
      this.endDate = new Date(this.saturdayDate);
      console.log((this.endDate));
      this.checkForValidAllocation();
    }
  }

  public checkForValidTimesheet(){
    this.ng4LoadingSpinnerService.show();
    this.http.get(environment.apiBaseUrl + 'api/timesheet/' + this.userId + '/' + this.datePipe.transform(this.startDate, 'yyyy-MM-dd')).subscribe(
      (res: Response) => {
          if (res.json()) {
            this.timesheetObj = JSON.parse(JSON.stringify(res.json()));
            if (this.timesheetObj.length > 0) {
                console.log('timesheet exists');
                console.log(this.timesheetObj);
                this.timesheetObj.forEach(timesheet => {
                //Populate Allocation Id and Project Code for latest allocation
                console.log(timesheet);
                this.timesheetMap.set(timesheet.allocationId,timesheet._id);
                console.log('allocationIdSun' + '-' + this.allocationIdSun);
                if (timesheet.allocationId == this.allocationIdSun) {
                this.projectSundayHour = timesheet.projectSundayHour == 0 ? null : timesheet.projectSundayHour;
                this.leaveSundayHour = timesheet.leaveSundayHour == 0 ? null : timesheet.leaveSundayHour;
              }
              if (timesheet.allocationId == this.allocationIdMon) {
                this.projectMondayHour = timesheet.projectMondayHour == 0 ? null : timesheet.projectMondayHour;
                this.leaveMondayHour = timesheet.leaveMondayHour == 0 ? null : timesheet.leaveMondayHour;
              }
              if (timesheet.allocationId == this.allocationIdTue) {
                this.projectTuesdayHour = timesheet.projectTuesdayHour == 0 ? null : timesheet.projectTuesdayHour;
                this.leaveTuesdayHour = timesheet.leaveTuesdayHour == 0 ? null : timesheet.leaveTuesdayHour;
              }
              if (timesheet.allocationId == this.allocationIdWed) {
                this.projectWednesdayHour = timesheet.projectWednesdayHour == 0 ? null : timesheet.projectWednesdayHour;
                this.leaveWednesdayHour = timesheet.leaveWednesdayHour == 0 ? null : timesheet.leaveWednesdayHour;
              }
              if (timesheet.allocationId == this.allocationIdThurs) {
                this.projectThursdayHour = timesheet.projectThursdayHour == 0 ? null : timesheet.projectThursdayHour;
                this.leaveThursdayHour = timesheet.leaveThursdayHour == 0 ? null : timesheet.leaveThursdayHour;
              }
              if (timesheet.allocationId == this.allocationIdFri) {
                this.projectFridayHour = timesheet.projectFridayHour == 0 ? null : timesheet.projectFridayHour;
                this.leaveFridayHour = timesheet.leaveFridayHour == 0 ? null : timesheet.leaveFridayHour;
              }
              if (timesheet.allocationId == this.allocationIdSat) {
                this.projectSaturdayHour = timesheet.projectSaturdayHour == 0 ? null : timesheet.projectSaturdayHour;
                this.leaveSaturdayHour = timesheet.leaveSaturdayHour == 0 ? null : timesheet.leaveSaturdayHour;
              }
            })
              this.timesheetObj = [];
          }
          else {
            console.log("timesheet doesn't exist");
            //check for any alllocation based on startdate
            //this.checkForValidAllocation();
            }
          }
          this.ng4LoadingSpinnerService.hide();
        },
      err => {
        console.log("Error occured.")
        this.ng4LoadingSpinnerService.hide();
        }
      )
  }

  public checkForValidAllocation()
  {
      this.ng4LoadingSpinnerService.show();
      this.http.get(environment.apiBaseUrl + 'api/allocation/' + this.userId +'/'+ this.datePipe.transform(this.startDate, 'yyyy-MM-dd')
        + '/'+ this.datePipe.transform(this.endDate, 'yyyy-MM-dd')).subscribe(
    (res: Response)=>{
      if(res.json())
      {
          var response = JSON.parse(JSON.stringify(res.json()))
          console.log(response);
          if(response.length > 0 )
          {
              response.forEach(allocation => {
              console.log('allocation exists');
              console.log(allocation);
              this.allocationMap.set(allocation._id, {"START_DATE": allocation.START_DATE, "END_DATE": allocation.END_DATE });
              if(this.validateIfDateIsWithinRange(this.sundayDate,allocation.START_DATE,allocation.END_DATE)){
                this.allocationIdSun = allocation._id;
                this.projectCodeSun = this.getAllocationDetails(allocation);
                console.log(this.allocationIdSun);
              }``
              if(this.validateIfDateIsWithinRange(this.mondayDate,allocation.START_DATE,allocation.END_DATE)) {
                this.allocationIdMon = allocation._id;
                this.projectCodeMon = this.getAllocationDetails(allocation);
              }
              if(this.validateIfDateIsWithinRange(this.tuesdayDate,allocation.START_DATE,allocation.END_DATE)) {
                this.allocationIdTue = allocation._id;
                this.projectCodeTue = this.getAllocationDetails(allocation);
              }
              if(this.validateIfDateIsWithinRange(this.wednesdayDate,allocation.START_DATE,allocation.END_DATE)) {
                this.allocationIdWed = allocation._id;
                this.projectCodeWed = this.getAllocationDetails(allocation);
              }
              if(this.validateIfDateIsWithinRange(this.thursdayDate,allocation.START_DATE,allocation.END_DATE)) {
                this.allocationIdThurs = allocation._id;
                this.projectCodeThurs = this.getAllocationDetails(allocation);
              }
              if(this.validateIfDateIsWithinRange(this.fridayDate,allocation.START_DATE,allocation.END_DATE)) {
                this.allocationIdFri = allocation._id;
                this.projectCodeFri = this.getAllocationDetails(allocation);
              }
              if(this.validateIfDateIsWithinRange(this.saturdayDate,allocation.START_DATE,allocation.END_DATE)) {
                this.allocationIdSat = allocation._id;
                this.projectCodeSat = this.getAllocationDetails(allocation);
              }
            })
          }
          else
          {
            console.log("allocation doesn't exist");
          }
      }
      this.checkForValidTimesheet();
    },
    err => {
      console.log("Error occured.")
      this.ng4LoadingSpinnerService.hide();
    }
    )
  }

  public clearAllfields()
  {
    this.timesheetMap = new Map<string,string>();
    this.allocationMap = new Map<string,any>();
    this.timesheetObj = [];
    this.projectSundayHour = null;
    this.projectMondayHour = null;
    this.projectTuesdayHour = null;
    this.projectWednesdayHour = null;
    this.projectThursdayHour = null;
    this.projectFridayHour = null;
    this.projectSaturdayHour = null;
    this.leaveSundayHour = null;
    this.leaveMondayHour = null;
    this.leaveTuesdayHour = null;
    this.leaveWednesdayHour = null;
    this.leaveThursdayHour = null;
    this.leaveFridayHour = null;
    this.leaveSaturdayHour = null;

    this.allocationIdSun = null;
    this.allocationIdMon = null;
    this.allocationIdTue = null;
    this.allocationIdWed = null;
    this.allocationIdThurs = null;
    this.allocationIdFri = null;
    this.allocationIdSat = null;

    this.projectCodeSun = null;
    this.projectCodeMon = null;
    this.projectCodeTue = null;
    this.projectCodeWed = null;
    this.projectCodeThurs = null;
    this.projectCodeFri = null;
    this.projectCodeSat = null;
  }

  public getAllocationDetails(allocation)
  {
    return  allocation.PROJECT_CODE.PROJECT_CODE + '-'
          + allocation.PROJECT_CODE.PROJECT_NAME + '-'
          + allocation.WON.WON_DESC + '-'
          + allocation.BIL_DESC_ID.DESCRIPTION + '-'
  }

  public showPreviousWeek()
  {
    this.populateTimesheet(this.getStartOfWeek(this.getDayOfWeek(this.startDate,-6)),false);
    console.log('showPreviousWeek')
  }

  public showCurrentWeek()
  {
    this.populateTimesheet(this.getStartOfWeek(this.getDayOfWeek(new Date(),0)), false);
    console.log('showCurrentWeek')
  }

  public showNextWeek()
  {
    this.populateTimesheet(this.getStartOfWeek(this.getDayOfWeek(this.endDate, 1 )),false);
    console.log('showNextWeek')
  }

  saveTimesheet=function(event){
    if(this.startDate >= this.freezeStartDate && this.endDate <= this.freezeEndDate){
      alert('Timesheet for this week is freezed');
    }
    else if(this.allocationMap.size == 0) {
      alert('Resource allocation is not available');
      return;
    }
    console.log(this.allocationMap);
    console.log(this.timesheetObj);
    this.ng4LoadingSpinnerService.show();
    this.allocationMap.forEach((value: any, key: string) =>{
      var allocId = key;
      console.log(key);
      var allocStartDate = value.START_DATE;
      var allocEndDate = value.END_DATE;
      var timesheetId = this.timesheetMap.get(allocId);
      console.log(this.sundayDate + '-' + allocStartDate + '-' + allocEndDate);
      console.log(this.validateIfDateIsWithinRange(this.sundayDate,allocStartDate,allocEndDate));
      this.timesheetObj.push({
        "userId": this.userId,
        "startDate": this.datePipe.transform(this.startDate, 'yyyy-MM-dd'),
        "endDate": this.datePipe.transform(this.endDate, 'yyyy-MM-dd'),
        "timesheetId": timesheetId,
        //"projectCode": this.projectCode,
        "projectSundayHour": this.projectSundayHour == null ||  !this.validateIfDateIsWithinRange(this.sundayDate,allocStartDate,allocEndDate) ? 0 : this.projectSundayHour,
        "projectMondayHour": this.projectMondayHour == null ||  !this.validateIfDateIsWithinRange(this.mondayDate,allocStartDate,allocEndDate) ? 0 : this.projectMondayHour,
        "projectTuesdayHour": this.projectTuesdayHour == null ||  !this.validateIfDateIsWithinRange(this.tuesdayDate,allocStartDate,allocEndDate) ? 0 : this.projectTuesdayHour,
        "projectWednesdayHour": this.projectWednesdayHour == null ||  !this.validateIfDateIsWithinRange(this.wednesdayDate,allocStartDate,allocEndDate) ? 0 : this.projectWednesdayHour,
        "projectThursdayHour": this.projectThursdayHour == null ||  !this.validateIfDateIsWithinRange(this.thursdayDate,allocStartDate,allocEndDate) ? 0 : this.projectThursdayHour,
        "projectFridayHour": this.projectFridayHour == null ||  !this.validateIfDateIsWithinRange(this.fridayDate,allocStartDate,allocEndDate) ? 0 : this.projectFridayHour,
        "projectSaturdayHour": this.projectSaturdayHour == null ||  !this.validateIfDateIsWithinRange(this.saturdayDate,allocStartDate,allocEndDate) ? 0 : this.projectSaturdayHour,
        "leaveSundayHour": this.leaveSundayHour == null ||  !this.validateIfDateIsWithinRange(this.sundayDate,allocStartDate,allocEndDate) ? 0 : this.leaveSundayHour,
        "leaveMondayHour": this.leaveMondayHour == null ||  !this.validateIfDateIsWithinRange(this.mondayDate,allocStartDate,allocEndDate) ? 0 : this.leaveMondayHour,
        "leaveTuesdayHour": this.leaveTuesdayHour == null ||  !this.validateIfDateIsWithinRange(this.tuesdayDate,allocStartDate,allocEndDate) ? 0 : this.leaveTuesdayHour,
        "leaveWednesdayHour": this.leaveWednesdayHour == null ||  !this.validateIfDateIsWithinRange(this.wednesdayDate,allocStartDate,allocEndDate) ? 0 : this.leaveWednesdayHour,
        "leaveThursdayHour": this.leaveThursdayHour == null ||  !this.validateIfDateIsWithinRange(this.thursdayDate,allocStartDate,allocEndDate) ? 0 : this.leaveThursdayHour,
        "leaveFridayHour": this.leaveFridayHour == null ||  !this.validateIfDateIsWithinRange(this.fridayDate,allocStartDate,allocEndDate) ? 0 : this.leaveFridayHour,
        "leaveSaturdayHour": this.leaveSaturdayHour == null ||  !this.validateIfDateIsWithinRange(this.saturdayDate,allocStartDate,allocEndDate) ? 0 : this.leaveSaturdayHour,
        "allocationId": allocId,
        "CREATED_BY": this.CREATED_BY,
        "UPDATED_BY": this.UPDATED_BY,
      });
    });
    console.log(this.timesheetObj);
    this.timesheetObj.forEach((timesheet) => {
      //alert(JSON.stringify(this.timesheetObj));

      if (!isNullOrUndefined(timesheet.timesheetId)) {
        console.log(timesheet.timesheetId);
        console.log('Update Called');
        this.http.post(environment.apiBaseUrl + 'api/timesheet/' + timesheet.timesheetId, timesheet).subscribe((res: Response) => {
            console.log(res);
          this.populateTimesheet(this.startDate, false);
          //this.isAdded=true;
        })
      }
      else {
        console.log('Add New Called');
        this.http.post(environment.apiBaseUrl + 'api/timesheet', timesheet).subscribe((res: Response) => {
          console.log(res);
          this.populateTimesheet(this.startDate, false);
          //this.isAdded=true;
        })
      }
    });
    this.ng4LoadingSpinnerService.hide();
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

  private validateIfDateIsWithinRange(date, startDate, endDate)
  {
    if(new Date(startDate) <= new Date(date)  && new Date(endDate) >= new Date(date))
      return true;
    else
      return false;
  }
}
