import { AddProjectComponent } from './components/Projects/add-project/add-project.component';
import { ViewProjectsComponent } from './components/Projects/view-projects/view-projects.component';
import { CreateCounselorComponent } from './components/admin-pages/create-counselor/create-counselor.component';
import { StudentReportComponent } from './components/student-report/student-report.component';
import { PendingCertificateReportComponent } from './components/pending-certificate-report/pending-certificate-report.component';
import { PendingCertificateComponent } from './components/pending-certificate/pending-certificate.component';
import { IndentCertificateComponent } from './components/indent-certificate/indent-certificate.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { PrintReciptComponent } from './components/admin-pages/print-recipt/print-recipt.component';
import { CourseCreationComponent } from './components/admin-pages/course-creation/course-creation.component';
import { CreateCenterComponent } from './components/admin-pages/create-center/create-center.component';
import { ViewCouchingCenterComponent } from './components/admin-pages/view-couching-center/view-couching-center.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './student/student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentPaymentComponent } from './student/student-payment/student-payment.component';
import { StudentPaymentHistoryComponent } from './student/student-payment-history/student-payment-history.component';
import { CourseReportComponent } from './components/course-report/course-report.component';
import { CollectionReportComponent } from './components/collection-report/collection-report.component';
import { DueReportComponent } from './components/due-report/due-report.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'student',
      component: StudentComponent
    },
    {
      path: 'student/list',
      component: StudentListComponent
    },
    {
      path: 'student/pay',
      component: StudentPaymentComponent
    },
    {
      path: 'student/pay/history/:studentId',
      component: StudentPaymentHistoryComponent
    },
   
    { path: 'center/view', component: ViewCouchingCenterComponent },
    { path: 'projects/view', component: ViewProjectsComponent },
    { path: 'center/add', component: CreateCenterComponent},
    
    { path: 'project/add', component: AddProjectComponent},
    { path: 'center/edit/:centerId', component: CreateCenterComponent},
    { path: 'courses/create', component: CourseCreationComponent },
    { path: 'counselor/create', component: CreateCounselorComponent},
    { path: 'courses/update/:centerSeq', component: CourseCreationComponent },
    { path: 'paymentRecept/print',component: PrintReciptComponent },
    {path: 'passwordUpdate',component:PasswordChangeComponent},
    {path: 'indent' , component:IndentCertificateComponent},
    {path: 'pending-certificate' , component:PendingCertificateComponent},
    {path: 'reports/courses' , component:CourseReportComponent},
    {path: 'reports/pendingCertificates' , component:PendingCertificateReportComponent},
    {path: 'reports/collection', component: CollectionReportComponent},
    {path: 'reports/due', component: DueReportComponent},
    {path: 'reports/students', component: StudentReportComponent}
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
