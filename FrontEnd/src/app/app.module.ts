import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HComponent } from './h/h.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FindyourhomeComponent } from './findyourhome/findyourhome.component';
import { LoginSellerComponent } from './login-seller/login-seller.component';
import { LogincompanyComponent } from './logincompany/logincompany.component';
import { LoginemployeeComponent } from './loginemployee/loginemployee.component';
import { SignupsellerComponent } from './signupseller/signupseller.component';
import { SignupcompanyComponent } from './signupcompany/signupcompany.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { PROPERTIESFORSALEComponent } from './propertiesforsale/propertiesforsale.component';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { DashboardBuyerComponent } from './dashboard-buyer/dashboard-buyer.component';
import { DashboardSellerComponent } from './dashboard-seller/dashboard-seller.component';
import { DashboardEmployeeComponent } from './dashboard-employee/dashboard-employee.component';
import { DashboardCompanyComponent } from './dashboard-company/dashboard-company.component';
import { DashboardbuyerchatComponent } from './dashboardbuyerchat/dashboardbuyerchat.component';
import { DashAdsSellerComponent } from './dash-ads-seller/dash-ads-seller.component';
import { DashadscompanyComponent } from './dashadscompany/dashadscompany.component';
import { ForgetPasswordBuyerComponent } from './forget-password-buyer/forget-password-buyer.component';
import { AllbuyerComponent } from './allbuyer/allbuyer.component';
import { DashAllBuyerComponent } from './dash-all-buyer/dash-all-buyer.component';
import { DashAllSellerComponent } from './dash-all-seller/dash-all-seller.component';
import { DashAllCompanyComponent } from './dash-all-company/dash-all-company.component';
import { AllcompanyComponent } from './allcompany/allcompany.component';
import { AllsellerComponent } from './allseller/allseller.component';
import { AllemployeeComponent } from './allemployee/allemployee.component';
import { DashallemployeeComponent } from './dashallemployee/dashallemployee.component';
import { ForgetPasswordSellerComponent } from './forget-password-seller/forget-password-seller.component';
import { ForgetPasswordCompanyComponent } from './forget-password-company/forget-password-company.component';
import { ResetPasswordCompanyComponent } from './reset-password-company/reset-password-company.component';
import { ResetPasswordBuyerComponent } from './reset-password-buyer/reset-password-buyer.component';
import { ResetPasswordSellerComponent } from './reset-password-seller/reset-password-seller.component';
import { MessageComponent } from './message/message.component';
import { DashEmployeeMassageComponent } from './dash-employee-massage/dash-employee-massage.component';
import { DashEmployeeReportComponent } from './dash-employee-report/dash-employee-report.component';
import { AllreportComponent } from './allreport/allreport.component';
import { DashEmployeeAllAdsComponent } from './dash-employee-all-ads/dash-employee-all-ads.component';
import { AllPropertyEmployeeComponent } from './all-property-employee/all-property-employee.component';
import { PropertyForSaleDetailsComponent } from './property-for-sale-details/property-for-sale-details.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { ListOfMyPropertiesComponent } from './list-of-my-properties/list-of-my-properties.component';
import { RegionService } from './region.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyfavPropertiesComponent } from './myfav-properties/myfav-properties.component';
import { EditpropertyeComponent } from './editpropertye/editpropertye.component';
import { HomeCompleteComponent } from './home-complete/home-complete.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { HomecategoryComponent } from './homecategory/homecategory.component';
import { HomecarsoulComponent } from './homecarsoul/homecarsoul.component';
import { TestComponent } from './test/test.component';
import { AgmCoreModule } from '@agm/core';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NotFoundSearchComponent } from './not-found-search/not-found-search.component';
import { FavNotFoundComponent } from './fav-not-found/fav-not-found.component';
import { MyPropertyNotFoundComponent } from './my-property-not-found/my-property-not-found.component';
import { PropertiesforsaleApartmentComponent } from './propertiesforsale-apartment/propertiesforsale-apartment.component';
import { PropertiesforsaleVillaComponent } from './propertiesforsale-villa/propertiesforsale-villa.component';
import { PropertiesforsaleTownHouseComponent } from './propertiesforsale-town-house/propertiesforsale-town-house.component';
import { PropertiesforsaleStoreComponent } from './propertiesforsale-store/propertiesforsale-store.component';
import { PropertiesforsaleWareHouseComponent } from './propertiesforsale-ware-house/propertiesforsale-ware-house.component';
import { PropertiesforsaleOfficeComponent } from './propertiesforsale-office/propertiesforsale-office.component';
import { AllcontactusComponent } from './allcontactus/allcontactus.component';
import { DashEmployeeContactusComponent } from './dash-employee-contactus/dash-employee-contactus.component';
// import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    HComponent,
    LoginComponent,
    FindyourhomeComponent,
    LoginSellerComponent,
    LogincompanyComponent,
    LoginemployeeComponent,
    SignupsellerComponent,
    SignupcompanyComponent,
    RegisterComponent,
    MyprofileComponent,
    PROPERTIESFORSALEComponent,
    AddAdsComponent,
    DashboardBuyerComponent,
    DashboardSellerComponent,
    DashboardEmployeeComponent,
    DashboardCompanyComponent,
    DashboardbuyerchatComponent,
    DashAdsSellerComponent,
    DashadscompanyComponent,
    ForgetPasswordBuyerComponent,
    AllbuyerComponent,
    DashAllBuyerComponent,
    DashAllSellerComponent,
    DashAllCompanyComponent,
    AllcompanyComponent,
    AllsellerComponent,
    AllemployeeComponent,
    DashallemployeeComponent,
    ForgetPasswordSellerComponent,
    ForgetPasswordCompanyComponent,
    ResetPasswordCompanyComponent,
    ResetPasswordBuyerComponent,
    ResetPasswordSellerComponent,
    MessageComponent,
    DashEmployeeMassageComponent,
    DashEmployeeReportComponent,
    AllreportComponent,
    DashEmployeeAllAdsComponent,
    AllPropertyEmployeeComponent,
    PropertyForSaleDetailsComponent,
    MyPropertiesComponent,
    ListOfMyPropertiesComponent,
    MyfavPropertiesComponent,
    EditpropertyeComponent,
    HomeCompleteComponent,
    HomeSliderComponent,
    HomecategoryComponent,
    HomecarsoulComponent,
    TestComponent,
    NotFoundSearchComponent,
    FavNotFoundComponent,
    MyPropertyNotFoundComponent,
    PropertiesforsaleApartmentComponent,
    PropertiesforsaleVillaComponent,
    PropertiesforsaleTownHouseComponent,
    PropertiesforsaleStoreComponent,
    PropertiesforsaleWareHouseComponent,
    PropertiesforsaleOfficeComponent,
    AllcontactusComponent,
    DashEmployeeContactusComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    SlickCarouselModule,
    AgmCoreModule
    // NgOptionHighlightModule,

  ],
  providers: [RegionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
