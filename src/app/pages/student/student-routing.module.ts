import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './student-list/student-list.component';


const routes: Routes = [{
  path: '',
  component: StudentComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {
}
