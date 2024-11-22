import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../../../services/services/course.service';
import {PageResponseCourseResponse} from '../../../../services/models/page-response-course-response';
import {CourseResponse} from '../../../../services/models/course-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  
  courseResponse: PageResponseCourseResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllCourses();
  }

  private findAllCourses() {
    this.courseService.findAllCourses({
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

  borrowCourse(course: CourseResponse) {
    this.message = '';
    this.level = 'success';
    this.courseService.borrowCourse({
      'course-id': course.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Course successfully added to your list';
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.error;
      }
    });
  }

  displayCourseDetails(course: CourseResponse) {
    this.router.navigate(['courses', 'details', course.id]);
  }
}
