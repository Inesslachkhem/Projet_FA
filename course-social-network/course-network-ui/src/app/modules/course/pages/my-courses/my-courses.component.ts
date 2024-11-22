import {Component, OnInit} from '@angular/core';
import {PageResponseCourseResponse} from '../../../../services/models/page-response-course-response';
import {CourseService} from '../../../../services/services/course.service';
import {CourseResponse} from '../../../../services/models/course-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  courseResponse: PageResponseCourseResponse = {};
  page = 0;
  size = 5;
  pages: any = [];

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllCourses();
  }

  private findAllCourses() {
    this.courseService.findAllCoursesByOwner({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (courses) => {
          this.courseResponse = courses;
          this.pages = Array(this.courseResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllCourses();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllCourses();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllCourses();
  }

  goToLastPage() {
    this.page = this.courseResponse.totalPages as number - 1;
    this.findAllCourses();
  }

  goToNextPage() {
    this.page++;
    this.findAllCourses();
  }

  get isLastPage() {
    return this.page === this.courseResponse.totalPages as number - 1;
  }

  archiveCourse(course: CourseResponse) {
    this.courseService.updateArchivedStatus({
      'course-id': course.id as number
    }).subscribe({
      next: () => {
        course.archived = !course.archived;
      }
    });
  }

  shareCourse(course: CourseResponse) {
    this.courseService.updateShareableStatus({
      'course-id': course.id as number
    }).subscribe({
      next: () => {
        course.shareable = !course.shareable;
      }
    });
  }

  editCourse(course: CourseResponse) {
    this.router.navigate(['courses', 'manage', course.id]);
  }
}
