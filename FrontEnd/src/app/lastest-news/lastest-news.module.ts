import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LastestNewsRoutingModule } from './lastest-news-routing.module';

import{LastestNewsComponent} from './lastest-news.component';

@NgModule({
  declarations: [
    LastestNewsComponent
  ],
  imports: [
    CommonModule,
    LastestNewsRoutingModule
  ]
})
export class LastestNewsModule { }
