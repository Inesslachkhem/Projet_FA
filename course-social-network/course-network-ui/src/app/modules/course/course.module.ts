import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { ManageCourseComponent } from './pages/manage-course/manage-course.component';
import {FormsModule} from '@angular/forms';
import { BorrowedCourseListComponent } from './pages/borrowed-course-list/borrowed-course-list.component';
import { RatingComponent } from './components/rating/rating.component';
import { AchievedCoursesComponent } from './pages/achieved-courses/achieved-courses.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';



@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    CourseListComponent,
    CourseCardComponent,
    MyCoursesComponent,
    ManageCourseComponent,
    BorrowedCourseListComponent,
    RatingComponent,
    AchievedCoursesComponent,
    CourseDetailsComponent
    
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule
  ]
})
export class CourseModule { }
