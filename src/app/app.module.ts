import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SlideMenuModule } from 'cuppa-ng2-slidemenu/cuppa-ng2-slidemenu';
//import { MyDatePickerModule } from 'node_modules/angular4-datepicker/src/my-date-picker';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { WonComponent } from './won/won.component';
import { UpdateWonComponent } from './update-won/update-won.component';
import { ProjectComponent } from './project/project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { FpbillingComponent } from './fpbilling/fpbilling.component';
import { UpdateFpbillingComponent } from './update-fpbilling/update-fpbilling.component';
import { ResourceallocationComponent } from './resourceallocation/resourceallocation.component';
import { UpdateResourceallocationComponent } from './update-resourceallocation/update-resourceallocation.component';
import { BillingdescriptionComponent } from './billingdescription/billingdescription.component';
import { UpdateBillingdescriptionComponent } from './update-billingdescription/update-billingdescription.component';
import { FreezeComponent } from './freeze/freeze.component';
import { BillingextractComponent } from './billingextract/billingextract.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    UpdateProductComponent,
    UserComponent,
    UpdateUserComponent,
    WonComponent,
    UpdateWonComponent,
    ProjectComponent,
    UpdateProjectComponent,
    FpbillingComponent,
    UpdateFpbillingComponent,
    ResourceallocationComponent,
    UpdateResourceallocationComponent,
    BillingdescriptionComponent,
    UpdateBillingdescriptionComponent,
    FreezeComponent,
    BillingextractComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SlideMenuModule,// Import SlideMenu module variable here 
    //MyDatePickerModule,
    RouterModule.forRoot([
    
    {path:"user",component: UserComponent},    
    {path:"updateUser/:id",component: UpdateUserComponent},
    {path:"updateUser",component: UpdateUserComponent},

    {path:"won",component: WonComponent},
    {path:"updateWon/:id",component: UpdateWonComponent},
    {path:"updateWon",component: UpdateWonComponent}, 

    {path:"project",component: ProjectComponent},
    {path:"updateProject/:id",component: UpdateProjectComponent},
    {path:"updateProject",component: UpdateProjectComponent}, 

    {path:"fpbilling",component: FpbillingComponent},
    {path:"updateFpbilling/:id",component: UpdateFpbillingComponent},
    {path:"updateFpbilling",component: UpdateFpbillingComponent}, 

    {path:"resourceallocation",component: ResourceallocationComponent},
    {path:"updateResourceallocation/:id",component: UpdateResourceallocationComponent},
    {path:"updateResourceallocation",component: UpdateResourceallocationComponent}, 

    {path:"billingdescription",component: BillingdescriptionComponent},
    {path:"updateBillingdescription/:id",component: UpdateBillingdescriptionComponent},
    {path:"updateBillingdescription",component: UpdateBillingdescriptionComponent}, 

    {path:"freeze",component: FreezeComponent},

    {path:"billingextract",component: BillingextractComponent},

    {path:"product",component: ProductComponent},
    {path:"updateProduct/:id",component: UpdateProductComponent},
    {path:"",component: HomeComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
