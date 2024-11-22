import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {CourseListComponent} from './pages/course-list/course-list.component';
import {MyCoursesComponent} from './pages/my-courses/my-courses.component';
import {ManageCourseComponent} from './pages/manage-course/manage-course.component';
import {BorrowedCourseListComponent} from './pages/borrowed-course-list/borrowed-course-list.component';
import {AchievedCoursesComponent} from './pages/achieved-courses/achieved-courses.component';
import {authGuard} from '../../services/guard/auth.guard';
import {CourseDetailsComponent} from './pages/course-details/course-details.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: CourseListComponent,
        canActivate: [authGuard]
      },
  
      {
        path: 'my-courses',
        component: MyCoursesComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-borrowed-courses',
        component: BorrowedCourseListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-returned-courses',
        component: AchievedCoursesComponent,
        canActivate: [authGuard]
      },
      {
        path: 'details/:courseId',
        component: CourseDetailsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageCourseComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:courseId',
        component: ManageCourseComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {
}
