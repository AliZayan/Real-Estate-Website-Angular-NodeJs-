import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastestNewsComponent } from './lastest-news.component';

const routes: Routes = [

  { path : '', component:LastestNewsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LastestNewsRoutingModule { }
