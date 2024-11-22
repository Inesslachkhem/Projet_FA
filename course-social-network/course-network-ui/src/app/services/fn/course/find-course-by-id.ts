/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CourseResponse } from '../../models/course-response';

export interface FindCourseById$Params {
  'course-id': number;
}

export function findCourseById(http: HttpClient, rootUrl: string, params: FindCourseById$Params, context?: HttpContext): Observable<StrictHttpResponse<CourseResponse>> {
  const rb = new RequestBuilder(rootUrl, findCourseById.PATH, 'get');
  if (params) {
    rb.path('course-id', params['course-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CourseResponse>;
    })
  );
}

findCourseById.PATH = '/courses/{course-id}';
