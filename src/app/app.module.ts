import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SlideMenuModule } from 'cuppa-ng2-slidemenu/cuppa-ng2-slidemenu';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

import { AuthguardGuard } from './authguard.guard';
import { UserService } from './user.service';

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
import { LoginFormComponent } from './login-form/login-form.component';
//import { UtilityService } from './utility.service';



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
    BillingextractComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SlideMenuModule,// Import SlideMenu module variable here 
    Ng4LoadingSpinnerModule,
    RouterModule.forRoot([
    
    {path:"user",canActivate: [AuthguardGuard],component: UserComponent},    
    {path:"updateUser/:id",canActivate: [AuthguardGuard],component: UpdateUserComponent},
    {path:"updateUser",canActivate: [AuthguardGuard],component: UpdateUserComponent},

    {path:"won",canActivate: [AuthguardGuard],component: WonComponent},
    {path:"updateWon/:id",canActivate: [AuthguardGuard],component: UpdateWonComponent},
    {path:"updateWon",canActivate: [AuthguardGuard],component: UpdateWonComponent}, 

    {path:"project",canActivate: [AuthguardGuard],component: ProjectComponent},
    {path:"updateProject/:id",canActivate: [AuthguardGuard],component: UpdateProjectComponent},
    {path:"updateProject",canActivate: [AuthguardGuard],component: UpdateProjectComponent}, 

    {path:"fpbilling",canActivate: [AuthguardGuard],component: FpbillingComponent},
    {path:"updateFpbilling/:id",canActivate: [AuthguardGuard],component: UpdateFpbillingComponent},
    {path:"updateFpbilling",canActivate: [AuthguardGuard],component: UpdateFpbillingComponent}, 

    {path:"resourceallocation",canActivate: [AuthguardGuard],component: ResourceallocationComponent},
    {path:"updateResourceallocation/:id",canActivate: [AuthguardGuard],component: UpdateResourceallocationComponent},
    {path:"updateResourceallocation",canActivate: [AuthguardGuard],component: UpdateResourceallocationComponent}, 

    {path:"billingdescription",canActivate: [AuthguardGuard],component: BillingdescriptionComponent},
    {path:"updateBillingdescription/:id",canActivate: [AuthguardGuard],component: UpdateBillingdescriptionComponent},
    {path:"updateBillingdescription",canActivate: [AuthguardGuard],component: UpdateBillingdescriptionComponent}, 

    {path:"freeze",canActivate: [AuthguardGuard],component: FreezeComponent},

    {path:"billingextract",canActivate: [AuthguardGuard],component: BillingextractComponent},

    {path:"product",component: ProductComponent},
    {path:"updateProduct/:id",component: UpdateProductComponent},
    {path:"home",canActivate: [AuthguardGuard],component: HomeComponent},
    {path:"",component: LoginFormComponent}
    ])
  ],
  providers: [UserService,AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
