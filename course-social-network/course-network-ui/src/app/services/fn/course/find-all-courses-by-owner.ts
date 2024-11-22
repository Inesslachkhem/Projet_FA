/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseCourseResponse } from '../../models/page-response-course-response';

export interface FindAllCoursesByOwner$Params {
  page?: number;
  size?: number;
}

export function findAllCoursesByOwner(http: HttpClient, rootUrl: string, params?: FindAllCoursesByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCourseResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllCoursesByOwner.PATH, 'get');
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

findAllCoursesByOwner.PATH = '/courses/owner';
