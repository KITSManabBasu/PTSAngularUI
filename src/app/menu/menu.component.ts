import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { UtilityService } from '../utility.service';
import {MenuService} from "../menu.service";
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

constructor(private userService: UserService, private menuService: MenuService) {

  this.menuService.listenLogin().subscribe(m=>{
    console.log('building menu items');
    this.loadMenuBasedonRole();
  })

  this.menuService.listenLogout().subscribe(m=>{
    console.log('removing menu items');
    this.clearMenuItems();
  })
}

  ngOnInit() {
    console.log('in menu.component oninit');
    console.log('roleMenuItemsArray' + this.roleMenuItemsArray);
    this.loadMenuBasedonRole();
  }

  roleMenuItemsArray: any[];
  userSession: any;
  userMenu: any = {"title":"User",
    "link":"/user",
    "order":1,
    "subItems":[]
  };
  wonMenu: any =  {"title":"Details",
    "link":"/won",
    "order":2,
    "subItems":[]
  };
  timesheetMenu: any = {"title":"Timesheets",
    "link":"/won",
    "order":3,
    "subItems":[]
  };
  projectReportMenu:any =  {"title":"Report",
    "link":"/billingextract",
    "order":4,
    "subItems":[]
  };
  timesheetReportMenu:any =  {"title":"Report",
    "link":"/billingextract",
    "order":5,
    "subItems":[]
  };
  accountMenu:any = {"title":"Account",
    "link":"/billingextract",
    "order":6,
    "subItems":[
      {"title":"Log out","link":""}
    ]
  };

  addModifyUserMenuItem = {"title": "Add/Modify User","order":1,"link": "/user"};

  wonDetailsManuItem = {"title": "WON Details","order":1,"link": "/won"};
  projectDetailMenuItem = {"title": "Project Detail","order":2,"link": "/project"};

  FPBillingMenuItem = {"title": "FP Billing","order":1,"link": "/fpbilling"};
  resourceAllocationMenuItem = {"title": "Resource Allocation","order":2,"link": "/resourceallocation"};
  timesheetmenuItem = {"title": "Timesheet","order":3,"link": "/timesheet"};
  billlingDescMenuItem = {"title": "Billing Description","order":4,"link": "/billingdescription"};
  freezeMenuItem = {"title": "Freeze","order":5,"link": "/freeze"};

  billingExtractMenuItem = {"title": "Billing Extract","order":1,"link": "/billingextract"};

  public menuItemsArray: any[] = [

    {"title":"User",
      "link":"/user",
      "subItems":[
        {"title":"Add/Modify User","link":"/user"},
      ]
    },

    {"title":"Details",
      "link":"/won",
      "subItems":[
        {"title":"WON Details","link":"/won"},
        //{"title":"Add WON","link":"/updateWon"},
        {"title":"Project Detail","link":"/project"},
        //{"title":"Add Project","link":"/updateProject"},
      ]
    },

    {"title":"Timesheets",
      "link":"/won",
      "subItems":[
        {"title":"FP Billing","link":"/fpbilling"},
        //{"title":"Add FP Billing","link":"/updateFpbilling"},
        {"title":"Resource Allocation","link":"/resourceallocation"},
        //{"title":"Add Resource Allocation","link":"/updateResourceallocation"},
        {"title":"Timesheet","link":"/timesheet"},
        {"title":"Billing Description","link":"/billingdescription"},
        {"title":"Freeze","link":"/freeze"},
      ]
    },
    {"title":"Report",
      "link":"/billingextract",
      "subItems":[
        {"title":"Billing Extract","link":"/billingextract"},

      ]
    },
    {"title":"Account",
      "link":"/billingextract",
      "subItems":[
        {"title":"Log out","link":""},

      ]
    },

  ];

  private clearMenuItems() {
    this.roleMenuItemsArray = [];
    this.userMenu.subItems = [];
    this.wonMenu.subItems = [];
    this.timesheetMenu.subItems = [];
    this.projectReportMenu.subItems = [];
    this.timesheetReportMenu.subItems = [];
  }


  public loadMenuBasedonRole(){
    this.clearMenuItems();
    this.userSession = UtilityService.getItemfromSessionStorage("User");
    if(this.userSession) {
      console.log(this.roleMenuItemsArray);
      if (this.userSession.isProjectUser == true) {
        if (!this.checkMenuItemExists(this.userMenu.subItems,this.addModifyUserMenuItem.order))
          this.userMenu.subItems.push(this.addModifyUserMenuItem);

        if (!this.checkMenuItemExists(this.wonMenu.subItems,this.wonDetailsManuItem.order))
          this.wonMenu.subItems.push(this. wonDetailsManuItem);
        if (!this.checkMenuItemExists(this.wonMenu.subItems,this.projectDetailMenuItem.order))
          this.wonMenu.subItems.push(this.projectDetailMenuItem);

        if (!this.checkMenuItemExists(this.timesheetMenu.subItems,this.FPBillingMenuItem.order))
          this.timesheetMenu.subItems.push(this.FPBillingMenuItem);
        if (!this.checkMenuItemExists(this.timesheetMenu.subItems,this.billlingDescMenuItem.order))
          this.timesheetMenu.subItems.push(this.billlingDescMenuItem);
        if (!this.checkMenuItemExists(this.timesheetMenu.subItems,this.freezeMenuItem.order))
          this.timesheetMenu.subItems.push(this.freezeMenuItem);

        console.log('this.wonMenu - ' + JSON.parse(JSON.stringify(this.wonMenu)));
      }
      if (this.userSession.isTimeSheetUser) {
        if (!this.checkMenuItemExists(this.timesheetMenu.subItems,this.timesheetmenuItem.order))
          this.timesheetMenu.subItems.push(this.timesheetmenuItem);
        console.log('this.timesheetMenu - ' + JSON.parse(JSON.stringify(this.timesheetMenu)));
      }
      if (this.userSession.isProjectReportUser) {
        if (!this.checkMenuItemExists(this.projectReportMenu.subItems,this.billingExtractMenuItem.order))
          this.projectReportMenu.subItems.push(this.billingExtractMenuItem);
        console.log('this.projectReportMenu - ' + JSON.parse(JSON.stringify(this.projectReportMenu)));
      }
      if (this.userSession.isTimeSheetReportUser) {
        if (!this.checkMenuItemExists(this.projectReportMenu.subItems,this.billingExtractMenuItem.order))
          this.projectReportMenu.subItems.push(this.billingExtractMenuItem);
        console.log('this.projectReportMenu - ' + JSON.parse(JSON.stringify(this.projectReportMenu)));
      }
      if (this.userSession.isTimeSheetUserAllocation) {
        if (!this.checkMenuItemExists(this.timesheetMenu.subItems,this.resourceAllocationMenuItem.order))
          this.timesheetMenu.subItems.push(this.resourceAllocationMenuItem);
        console.log('this.timesheetMenu - ' + JSON.parse(JSON.stringify(this.timesheetMenu)));
      }

      if (this.userMenu.subItems.length > 0)
        this.roleMenuItemsArray.push(this.userMenu);

      if (this.wonMenu.subItems.length > 0)
        this.roleMenuItemsArray.push(this.wonMenu);

      if (this.timesheetMenu.subItems.length > 0)
        this.roleMenuItemsArray.push(this.timesheetMenu);

      if (this.projectReportMenu.subItems.length > 0)
        this.roleMenuItemsArray.push(this.projectReportMenu);

      if (this.timesheetReportMenu.subItems.length > 0)
        this.roleMenuItemsArray.push(this.timesheetReportMenu);

      this.roleMenuItemsArray.push(this.accountMenu);
      console.log(this.userSession);
      console.log(this.roleMenuItemsArray);
    }
  }

  public onMenuClose(){
    console.log("menu closed");
  }
  public onMenuOpen(){
    console.log("menu Opened");
  }
  public onItemSelect(item:any){
    //console.log(item);
    window.location.href = item.link;
  }

  public checkMenuItemExists(itemArr,order){
    var index = itemArr.findIndex(item => item.order === order);
    if(index == -1)
      return false;
    else
      return true;
  };
}
