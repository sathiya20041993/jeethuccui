import { OnlynumberDirective } from './../../directives/onlynumber.directive';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentRoutingModule } from './student-routing.module';
import { NbCardModule, NbAlertModule } from '@nebular/theme';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { StudentService } from './student.service';
import { StudentPaymentComponent } from './student-payment/student-payment.component';
import { StudentPaymentHistoryComponent } from './student-payment-history/student-payment-history.component';


@NgModule({
  imports: [
    CommonModule, StudentRoutingModule, NbCardModule, AutoCompleteModule, FormsModule, ReactiveFormsModule,
    TableModule, RouterModule, MultiSelectModule, SidebarModule, ButtonModule, DialogModule, NbAlertModule,
  ],
  providers: [StudentService],
  declarations: [StudentComponent, StudentListComponent, StudentPaymentComponent ,OnlynumberDirective, StudentPaymentHistoryComponent],
  exports: [OnlynumberDirective]
})
export class StudentModule { }
