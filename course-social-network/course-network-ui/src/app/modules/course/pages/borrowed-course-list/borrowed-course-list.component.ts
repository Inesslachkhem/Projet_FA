import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../../../services/services/course.service';
import {PageResponseBorrowedCourseResponse} from '../../../../services/models/page-response-borrowed-course-response';
import {BorrowedCourseResponse} from '../../../../services/models/borrowed-course-response';
import {CourseResponse} from '../../../../services/models/course-response';
import {FeedbackRequest} from '../../../../services/models/feedback-request';
import {FeedbackService} from '../../../../services/services/feedback.service';

@Component({
  selector: 'app-borrowed-course-list',
  templateUrl: './borrowed-course-list.component.html',
  styleUrls: ['./borrowed-course-list.component.scss']
})
export class BorrowedCourseListComponent implements OnInit {
  page = 0;
  size = 5;
  pages: any = [];
  borrowedCourses: PageResponseBorrowedCourseResponse = {};
  selectedCourse: CourseResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = {courseId: 0, comment: '', note: 0};
  constructor(
    private courseService: CourseService,
    private feedbackService: FeedbackService
  ) {
  }
  ngOnInit(): void {
    this.findAllBorrowedCourses();
  }

  private findAllBorrowedCourses() {
    this.courseService.findAllBorrowedCourses({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.borrowedCourses = resp;
        this.pages = Array(this.borrowedCourses.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBorrowedCourses();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedCourses();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBorrowedCourses();
  }

  goToLastPage() {
    this.page = this.borrowedCourses.totalPages as number - 1;
    this.findAllBorrowedCourses();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedCourses();
  }

  get isLastPage() {
    return this.page === this.borrowedCourses.totalPages as number - 1;
  }
  
  returnBorrowedCourse(course: BorrowedCourseResponse) {
    this.selectedCourse = course;
    this.feedbackRequest.courseId = course.id as number;
  }

  returnCourse(withFeedback: boolean) {
    this.courseService.returnBorrowCourse({
      'course-id': this.selectedCourse?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedCourse = undefined;
        this.findAllBorrowedCourses();
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }
    });
  }
}
