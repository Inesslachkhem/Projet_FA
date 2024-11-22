import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedCourseResponse} from '../../../../services/models/page-response-borrowed-course-response';
import {CourseService} from '../../../../services/services/course.service';
import {BorrowedCourseResponse} from '../../../../services/models/borrowed-course-response';

@Component({
  
  selector: 'app-achieved-courses',
  templateUrl: './achieved-courses.component.html',
  styleUrls: ['./achieved-courses.component.scss']
})
export class AchievedCoursesComponent implements OnInit {

  page = 0;
  size = 5;
  pages: any = [];
  achievedCourses: PageResponseBorrowedCourseResponse = {};
  message = '';
  level: 'success' |'error' = 'success';
  constructor(
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    this.findAllAchievedCourses();
  }

  private findAllAchievedCourses() {
    this.courseService.findAllAchievedCourses({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.achievedCourses = resp;
        this.pages = Array(this.achievedCourses.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllAchievedCourses();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllAchievedCourses();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllAchievedCourses();
  }

  goToLastPage() {
    this.page = this.achievedCourses.totalPages as number - 1;
    this.findAllAchievedCourses();
  }

  goToNextPage() {
    this.page++;
    this.findAllAchievedCourses();
  }

  get isLastPage() {
    return this.page === this.achievedCourses.totalPages as number - 1;
  }

  approveCourseAchieved(course: BorrowedCourseResponse) {
    if (!course.achieved) {
      return;
    }
    this.courseService.approveAchieveBorrowCourse({
      'course-id': course.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Course return approved';
        this.findAllAchievedCourses();
      }
    });
  }
}
