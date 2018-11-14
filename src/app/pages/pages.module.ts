import { AddProjectComponent } from './components/Projects/add-project/add-project.component';
import { ViewProjectsComponent } from './components/Projects/view-projects/view-projects.component';
import { CreateCounselorComponent } from './components/admin-pages/create-counselor/create-counselor.component';
import { StudentReportComponent } from './components/student-report/student-report.component';
import { PendingCertificateReportComponent } from './components/pending-certificate-report/pending-certificate-report.component';
import { CourseReportComponent } from './components/course-report/course-report.component';
import { PendingCertificateComponent } from './components/pending-certificate/pending-certificate.component';
import { IndentCertificateComponent } from './components/indent-certificate/indent-certificate.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { Html5UploadComponent } from './components/file-upload/file-upload.component';
import { PrintReciptComponent } from './components/admin-pages/print-recipt/print-recipt.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { CourseCreationComponent } from './components/admin-pages/course-creation/course-creation.component';


import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ViewCouchingCenterComponent } from './components/admin-pages/view-couching-center/view-couching-center.component';
import { CreateCenterComponent } from './components/admin-pages/create-center/create-center.component';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { StudentModule } from './student/student.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { NbAlertModule } from '@nebular/theme';
import { CollectionReportComponent } from './components/collection-report/collection-report.component';
import { DueReportComponent } from './components/due-report/due-report.component';
import {CalendarModule} from 'primeng/calendar';




const PAGES_COMPONENTS = [
  PagesComponent,
  CreateCenterComponent,
  ViewCouchingCenterComponent,
  PasswordChangeComponent,
  IndentCertificateComponent,
  PendingCertificateComponent,
  CourseReportComponent,
  PendingCertificateReportComponent,
  CollectionReportComponent,
  DueReportComponent,
  StudentReportComponent,
  ViewProjectsComponent,
  AddProjectComponent

];

@NgModule({
  imports: [
    
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    DialogModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    ListboxModule,
    CheckboxModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    StudentModule, AutoCompleteModule,DropdownModule,
    MessagesModule , MessageModule, NbAlertModule, CalendarModule
    
  ],
  declarations: [
    ...PAGES_COMPONENTS,CourseCreationComponent,PrintReciptComponent,Html5UploadComponent,CreateCounselorComponent
  ],

  providers: [MessageService]
})
export class PagesModule {
}
