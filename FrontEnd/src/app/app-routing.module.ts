import { DashEmployeeContactusComponent } from './dash-employee-contactus/dash-employee-contactus.component';
import { AllcontactusComponent } from './allcontactus/allcontactus.component';
import { PropertiesforsaleOfficeComponent } from './propertiesforsale-office/propertiesforsale-office.component';
import { PropertiesforsaleWareHouseComponent } from './propertiesforsale-ware-house/propertiesforsale-ware-house.component';
import { PropertiesforsaleStoreComponent } from './propertiesforsale-store/propertiesforsale-store.component';
import { PropertiesforsaleTownHouseComponent } from './propertiesforsale-town-house/propertiesforsale-town-house.component';
import { PropertiesforsaleVillaComponent } from './propertiesforsale-villa/propertiesforsale-villa.component';
import { PropertiesforsaleApartmentComponent } from './propertiesforsale-apartment/propertiesforsale-apartment.component';
import { TestComponent } from './test/test.component';

import { EditpropertyeComponent } from './editpropertye/editpropertye.component';
import { Host, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// buyer
import { AllbuyerComponent } from './allbuyer/allbuyer.component';
import { DashboardbuyerchatComponent } from './dashboardbuyerchat/dashboardbuyerchat.component';
import { ResetPasswordBuyerComponent } from './reset-password-buyer/reset-password-buyer.component';
import { DashboardBuyerComponent } from './dashboard-buyer/dashboard-buyer.component';
import { ForgetPasswordBuyerComponent } from './forget-password-buyer/forget-password-buyer.component';
import { DashAllBuyerComponent } from './dash-all-buyer/dash-all-buyer.component';
import { RegisterComponent } from './register/register.component';

// buyer

// seller
import { AllsellerComponent } from './allseller/allseller.component';
import { DashAdsSellerComponent } from './dash-ads-seller/dash-ads-seller.component';
import { DashboardSellerComponent } from './dashboard-seller/dashboard-seller.component';
import { LoginSellerComponent } from './login-seller/login-seller.component';
import { SignupsellerComponent } from './signupseller/signupseller.component';
import { ForgetPasswordSellerComponent } from './forget-password-seller/forget-password-seller.component';
import { ResetPasswordSellerComponent } from './reset-password-seller/reset-password-seller.component';
import { DashAllSellerComponent } from './dash-all-seller/dash-all-seller.component';
// seller

// company
import { AllcompanyComponent } from './allcompany/allcompany.component';
import { LogincompanyComponent } from './logincompany/logincompany.component';
import { SignupcompanyComponent } from './signupcompany/signupcompany.component';
import { DashadscompanyComponent } from './dashadscompany/dashadscompany.component';
import { DashAllCompanyComponent } from './dash-all-company/dash-all-company.component';
import { ForgetPasswordCompanyComponent } from './forget-password-company/forget-password-company.component';
import { ResetPasswordCompanyComponent } from './reset-password-company/reset-password-company.component';
import { DashboardCompanyComponent } from './dashboard-company/dashboard-company.component';

// company
import { AllemployeeComponent } from './allemployee/allemployee.component';
import { LoginemployeeComponent } from './loginemployee/loginemployee.component';
import { DashEmployeeMassageComponent } from './dash-employee-massage/dash-employee-massage.component';
import { DashEmployeeReportComponent } from './dash-employee-report/dash-employee-report.component';
import { DashallemployeeComponent } from './dashallemployee/dashallemployee.component';
import { DashEmployeeAllAdsComponent } from './dash-employee-all-ads/dash-employee-all-ads.component';
import { AllPropertyEmployeeComponent } from './all-property-employee/all-property-employee.component';
import { DashboardEmployeeComponent } from './dashboard-employee/dashboard-employee.component';
// employee

// property
import { PROPERTIESFORSALEComponent } from './propertiesforsale/propertiesforsale.component';
import { PropertyForSaleDetailsComponent } from './property-for-sale-details/property-for-sale-details.component';



// property

// home
import { HComponent } from './h/h.component';
// home

// 404
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
// 404


import { LoginComponent } from './login/login.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { FindyourhomeComponent } from './findyourhome/findyourhome.component';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { AllreportComponent } from './allreport/allreport.component';
import { MessageComponent } from './message/message.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { MyfavPropertiesComponent } from './myfav-properties/myfav-properties.component';

const routes: Routes = [
  { path: '', component: HComponent },

  { path: 'findyourhome', component: FindyourhomeComponent },
  {
    path: 'AboutUs',                                // done
    loadChildren: () =>
      import('./aboutus/aboutus.module').then(
        (moduleClass) => moduleClass.AboutusModule
      ),
  },

  {
    path: 'EG',                             // done
    loadChildren: () =>
      import('./lastest-news/lastest-news.module').then(
        (moduleClass) => moduleClass.LastestNewsModule
      ),
  },

  {
    path: 'ContactUs',                                 // done
    loadChildren: () =>
      import('./contactus/contactus.module').then(
        (moduleClass) => moduleClass.ContactusModule
      ),
  },
  // BUYER
  { path: 'login', component: LoginComponent }, //done login
  { path: 'dashbuyer', component: DashboardBuyerComponent }, //done dash
  { path: 'ForgetPasswordB', component: ForgetPasswordBuyerComponent },//done forget
  { path: 'resetB', component: ResetPasswordBuyerComponent }, //done reset
  { path: 'dashbuyer/chat', component: DashboardbuyerchatComponent },//done chat
  { path: 'Register', component: RegisterComponent }, // done signup
  { path: 'buyerFavProperties', component: MyfavPropertiesComponent }, // done signup

  // BUYER

  // SELLER
  { path: 'loginSeller', component: LoginSellerComponent }, //done login
  { path: 'dashseller', component: DashboardSellerComponent }, //done dash
  { path: 'ForgetPasswordS', component: ForgetPasswordSellerComponent },//done forget
  { path: 'resetS', component: ResetPasswordSellerComponent },//done reset
  { path: 'dashseller/chat', component: DashboardbuyerchatComponent },//done chat
  { path: 'SignupSeller', component: SignupsellerComponent },//done signup
  { path: 'myProperties-seller', component: MyPropertiesComponent },//done myProperties >>>
  { path: 'dashAdsSeller', component: DashAdsSellerComponent },  //done add property >>>
  { path: 'editpropertySeller/:id', component: DashAdsSellerComponent }, // done add property >>>
  { path: 'sellerFavProperties', component: MyfavPropertiesComponent }, // done signup

  // { path: 'addAds', component: AddAdsComponent },//done add property >>>

  // SELLER

  // COMPANY
  { path: 'loginCompany', component: LogincompanyComponent }, // done login
  { path: 'dashcompany', component: DashboardCompanyComponent },  // done dash
  { path: 'ForgetPasswordC', component: ForgetPasswordCompanyComponent }, // done forget
  { path: 'resetC', component: ResetPasswordCompanyComponent },// done reset
  { path: 'dashcompany/chat', component: DashboardbuyerchatComponent },// done chat
  { path: 'SignupCompany', component: SignupcompanyComponent },  // done signup
  { path: 'myProperties-company', component: MyPropertiesComponent },//done myProperties >>>
  { path: 'dashAdsCompany', component: DashadscompanyComponent }, // done add property >>>
  { path: 'editproperty/:id', component: DashadscompanyComponent }, // done add property >>>
  { path: 'companyFavProperties', component: MyfavPropertiesComponent }, // done signup


  // done add property >>>
  // COMPANY

  // EMPLOYEE
  { path: 'loginEmployee', component: LoginemployeeComponent }, // done login
  { path: 'allads', component: DashEmployeeAllAdsComponent }, // done all ads
  { path: 'allseller', component: AllsellerComponent },// done all seller
  { path: 'allemployee', component: AllemployeeComponent },// done all
  { path: 'allpro', component: AllPropertyEmployeeComponent },// done all
  { path: 'allbuyer', component: AllbuyerComponent },// done all
  { path: 'allcompany', component: AllcompanyComponent },// done all
  { path: 'allreport', component: AllreportComponent }, // done all
  { path: 'message', component: DashEmployeeMassageComponent }, // done all
  { path: 'dashemployee/chat', component: DashboardbuyerchatComponent },// done chat
  { path: 'dashemployee', component: DashboardEmployeeComponent },// done all
  { path: 'dashallcompany', component: DashAllCompanyComponent },// done all
  { path: 'dashallbuyer', component: DashAllBuyerComponent },// done all
  { path: 'editpropertye/:id', component: EditpropertyeComponent }, // done add property >>>
  { path: 'myProperties-employee', component: MyPropertiesComponent },//done myProperties >>>
 { path: 'dashallreport', component: DashEmployeeReportComponent },// done all
  { path: 'dashallemployee', component: DashallemployeeComponent },// done all
  { path: 'dashallseller', component: DashAllSellerComponent },// done all
  { path: 'allContactUs', component: AllcontactusComponent },// done all
  { path: 'DashallContactUs', component: DashEmployeeContactusComponent },// done all
  // EMPLOYEE

  // PROPERTY
  { path: 'propertiesforsale', component: PROPERTIESFORSALEComponent }, // done
  { path: 'propertiesforsale/:id', component: PropertyForSaleDetailsComponent }, // done
  { path: 'propertiesforsaleApartment', component: PropertiesforsaleApartmentComponent }, // done
  { path: 'propertiesforsaleVilla', component: PropertiesforsaleVillaComponent }, // done
  { path: 'propertiesforsaleTownHouse', component: PropertiesforsaleTownHouseComponent }, // done
  { path: 'propertiesforsaleStore', component: PropertiesforsaleStoreComponent }, // done
  { path: 'propertiesforsaleWareHouse', component: PropertiesforsaleWareHouseComponent }, // done
  { path: 'propertiesforsaleOffice', component: PropertiesforsaleOfficeComponent }, // done
 // services

 {
  path: 'services',                                // done
  loadChildren: () =>
    import('./ourservices/ourservices.module').then(
      (moduleClass) => moduleClass.OurservicesModule
    ),
},



{ path: 'test', component: TestComponent }, // done


  // pagenotfound
  { path: '**', component: PagenotfoundComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
