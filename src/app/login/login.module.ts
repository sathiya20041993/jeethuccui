
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { routes } from './login.routing';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent ],
  providers: [ LoginService]
})
export class LoginModule { }
