/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { approveAchieveBorrowCourse } from '../fn/course/approve-achieve-borrow-course';
import { ApproveAchieveBorrowCourse$Params } from '../fn/course/approve-achieve-borrow-course';
import { CourseResponse } from '../models/course-response';
import { borrowCourse } from '../fn/course/borrow-course';
import { BorrowCourse$Params } from '../fn/course/borrow-course';
import { findAllCourses } from '../fn/course/find-all-courses';
import { FindAllCourses$Params } from '../fn/course/find-all-courses';
import { findAllCoursesByOwner } from '../fn/course/find-all-courses-by-owner';
import { FindAllCoursesByOwner$Params } from '../fn/course/find-all-courses-by-owner';
import { findAllBorrowedCourses } from '../fn/course/find-all-borrowed-courses';
import { FindAllBorrowedCourses$Params } from '../fn/course/find-all-borrowed-courses';
import { findAllAchievedCourses } from '../fn/course/find-all-achieved-courses';
import { findAllAchievedCourses$Params } from '../fn/course/find-all-achieved-courses';
import { findCourseById } from '../fn/course/find-course-by-id';
import { FindCourseById$Params } from '../fn/course/find-course-by-id';
import { PageResponseCourseResponse } from '../models/page-response-course-response';
import { PageResponseBorrowedCourseResponse } from '../models/page-response-borrowed-course-response';
import { returnBorrowCourse } from '../fn/course/return-borrow-course';
import { ReturnBorrowCourse$Params } from '../fn/course/return-borrow-course';
import { saveCourse } from '../fn/course/save-course';
import { SaveCourse$Params } from '../fn/course/save-course';
import { updateArchivedStatus } from '../fn/course/update-archived-status';
import { UpdateArchivedStatus$Params } from '../fn/course/update-archived-status';
import { updateShareableStatus } from '../fn/course/update-shareable-status';
import { UpdateShareableStatus$Params } from '../fn/course/update-shareable-status';
import { uploadCourseCoverPicture } from '../fn/course/upload-course-cover-picture';
import { UploadCourseCoverPicture$Params } from '../fn/course/upload-course-cover-picture';

@Injectable({ providedIn: 'root' })
export class CourseService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllCourses()` */
  static readonly FindAllCoursesPath = '/courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCourses()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCourses$Response(params?: FindAllCourses$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCourseResponse>> {
    return findAllCourses(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCourses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCourses(params?: FindAllCourses$Params, context?: HttpContext): Observable<PageResponseCourseResponse> {
    return this.findAllCourses$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCourseResponse>): PageResponseCourseResponse => r.body)
    );
  }

  /** Path part for operation `saveCourse()` */
  static readonly SaveCoursePath = '/courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCourse()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCourse$Response(params: SaveCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCourse$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCourse(params: SaveCourse$Params, context?: HttpContext): Observable<number> {
    return this.saveCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadCourseCoverPicture()` */
  static readonly UploadCourseCoverPicturePath = '/courses/cover/{course-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadCourseCoverPicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadCourseCoverPicture$Response(params: UploadCourseCoverPicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadCourseCoverPicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadCourseCoverPicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadCourseCoverPicture(params: UploadCourseCoverPicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadCourseCoverPicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `borrowCourse()` */
  static readonly BorrowCoursePath = '/courses/borrow/{course-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `borrowCourse()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowCourse$Response(params: BorrowCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return borrowCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `borrowCourse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowCourse(params: BorrowCourse$Params, context?: HttpContext): Observable<number> {
    return this.borrowCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateShareableStatus()` */
  static readonly UpdateShareableStatusPath = '/courses/shareable/{course-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateShareableStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus$Response(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateShareableStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateShareableStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateShareableStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `returnBorrowCourse()` */
  static readonly ReturnBorrowCoursePath = '/courses/borrow/return/{course-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `returnBorrowCourse()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowCourse$Response(params: ReturnBorrowCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return returnBorrowCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `returnBorrowCourse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowCourse(params: ReturnBorrowCourse$Params, context?: HttpContext): Observable<number> {
    return this.returnBorrowCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `approveAchieveBorrowCourse()` */
  static readonly ApproveAchieveBorrowCoursePath = '/courses/borrow/achieve/approve/{course-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveAchieveBorrowCourse()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveAchieveBorrowCourse$Response(params: ApproveAchieveBorrowCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return approveAchieveBorrowCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `approveAchieveBorrowCourse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveAchieveBorrowCourse(params: ApproveAchieveBorrowCourse$Params, context?: HttpContext): Observable<number> {
    return this.approveAchieveBorrowCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateArchivedStatus()` */
  static readonly UpdateArchivedStatusPath = '/courses/archived/{course-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArchivedStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus$Response(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateArchivedStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArchivedStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateArchivedStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findCourseById()` */
  static readonly FindCourseByIdPath = '/courses/{course-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCourseById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCourseById$Response(params: FindCourseById$Params, context?: HttpContext): Observable<StrictHttpResponse<CourseResponse>> {
    return findCourseById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCourseById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCourseById(params: FindCourseById$Params, context?: HttpContext): Observable<CourseResponse> {
    return this.findCourseById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CourseResponse>): CourseResponse => r.body)
    );
  }

  /** Path part for operation `findAllAchievedCourses()` */
  static readonly findAllAchievedCoursesPath = '/courses/achieved';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAchievedCourses()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAchievedCourses$Response(params?: findAllAchievedCourses$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedCourseResponse>> {
    return findAllAchievedCourses(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAchievedCourses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAchievedCourses(params?: findAllAchievedCourses$Params, context?: HttpContext): Observable<PageResponseBorrowedCourseResponse> {
    return this.findAllAchievedCourses$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBorrowedCourseResponse>): PageResponseBorrowedCourseResponse => r.body)
    );
  }

  /** Path part for operation `findAllCoursesByOwner()` */
  static readonly FindAllCoursesByOwnerPath = '/courses/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCoursesByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCoursesByOwner$Response(params?: FindAllCoursesByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCourseResponse>> {
    return findAllCoursesByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCoursesByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCoursesByOwner(params?: FindAllCoursesByOwner$Params, context?: HttpContext): Observable<PageResponseCourseResponse> {
    return this.findAllCoursesByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCourseResponse>): PageResponseCourseResponse => r.body)
    );
  }

  /** Path part for operation `findAllBorrowedCourses()` */
  static readonly FindAllBorrowedCoursesPath = '/courses/borrowed';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBorrowedCourses()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBorrowedCourses$Response(params?: FindAllBorrowedCourses$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedCourseResponse>> {
    return findAllBorrowedCourses(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllBorrowedCourses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBorrowedCourses(params?: FindAllBorrowedCourses$Params, context?: HttpContext): Observable<PageResponseBorrowedCourseResponse> {
    return this.findAllBorrowedCourses$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBorrowedCourseResponse>): PageResponseBorrowedCourseResponse => r.body)
    );
  }

}
