/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseBorrowedCourseResponse } from '../../models/page-response-borrowed-course-response';

export interface findAllAchievedCourses$Params {
  page?: number;
  size?: number;
}

export function findAllAchievedCourses(http: HttpClient, rootUrl: string, params?: findAllAchievedCourses$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedCourseResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllAchievedCourses.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseBorrowedCourseResponse>;
    })
  );
}

findAllAchievedCourses.PATH = '/courses/achieved';
