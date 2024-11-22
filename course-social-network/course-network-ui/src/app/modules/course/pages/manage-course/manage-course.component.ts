import {Component, OnInit} from '@angular/core';
import {CourseRequest} from '../../../../services/models/course-request';
import {CourseService} from '../../../../services/services/course.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {

  errorMsg: Array<string> = [];
  courseRequest: CourseRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };
  selectedCourseCover: any;
  selectedPicture: string | undefined;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const courseId = this.activatedRoute.snapshot.params['courseId'];
    if (courseId) {
      this.courseService.findCourseById({
        'course-id': courseId
      }).subscribe({
        next: (course) => {
         this.courseRequest = {
           id: course.id,
           title: course.title as string,
           authorName: course.authorName as string,
           isbn: course.isbn as string,
           synopsis: course.synopsis as string,
           shareable: course.shareable
         };
         this.selectedPicture='data:image/jpg;base64,' + course.cover;
        }
      });
    }
  }
  
  saveCourse() {
    this.courseService.saveCourse({
      body: this.courseRequest
    }).subscribe({
      next: (courseId) => {
        this.courseService.uploadCourseCoverPicture({
          'course-id': courseId,
          body: {
            file: this.selectedCourseCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/courses/my-courses']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedCourseCover = event.target.files[0];
    console.log(this.selectedCourseCover);

    if (this.selectedCourseCover) {

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedCourseCover);
    }
  }
}
