/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseCourseResponse } from '../../models/page-response-course-response';

export interface FindAllCourses$Params {
  page?: number;
  size?: number;
}

export function findAllCourses(http: HttpClient, rootUrl: string, params?: FindAllCourses$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCourseResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllCourses.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseCourseResponse>;
    })
  );
}

findAllCourses.PATH = '/courses';
