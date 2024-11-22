import {Component, OnInit} from '@angular/core';
import {CourseResponse} from '../../../../services/models/course-response';
import {CourseService} from '../../../../services/services/course.service';
import {ActivatedRoute} from '@angular/router';
import {FeedbackService} from '../../../../services/services/feedback.service';
import {PageResponseFeedbackResponse} from '../../../../services/models/page-response-feedback-response';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: CourseResponse = {};
  feedbacks: PageResponseFeedbackResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  private courseId = 0;

  constructor(
    private courseService: CourseService,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.params['courseId'];
    if (this.courseId) {
      this.courseService.findCourseById({
        'course-id': this.courseId
      }).subscribe({
        next: (course) => {
          this.course = course;
          this.findAllFeedbacks();
        }
      });
    }
  }

  private findAllFeedbacks() {
    this.feedbackService.findAllFeedbacksByCourse({
      'course-id': this.courseId,
      page: this.page,
      size: this.size
    }).subscribe({
      next: (data) => {
        this.feedbacks = data;
      }
    });
  } 

  gotToPage(page: number) {
    this.page = page;
    this.findAllFeedbacks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllFeedbacks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllFeedbacks();
  }

  goToLastPage() {
    this.page = this.feedbacks.totalPages as number - 1;
    this.findAllFeedbacks();
  }

  goToNextPage() {
    this.page++;
    this.findAllFeedbacks();
  }

  get isLastPage() {
    return this.page === this.feedbacks.totalPages as number - 1;
  }

}
