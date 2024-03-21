import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './contactus.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
{path:'',component:ContactusComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule]
})
export class ContactusRoutingModule { }
