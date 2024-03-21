import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurservicesRoutingModule } from './ourservices-routing.module';
import { OurservicesComponent } from './ourservices.component';

@NgModule({
  declarations: [
    OurservicesComponent
  ],
  imports: [
    CommonModule,
    OurservicesRoutingModule
  ]
})
export class OurservicesModule { }
