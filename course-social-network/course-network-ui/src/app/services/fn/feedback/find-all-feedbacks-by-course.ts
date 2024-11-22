/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseFeedbackResponse } from '../../models/page-response-feedback-response';

export interface FindAllFeedbacksByCourse$Params {
  'course-id': number;
  page?: number;
  size?: number;
}

export function findAllFeedbacksByCourse(http: HttpClient, rootUrl: string, params: FindAllFeedbacksByCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFeedbackResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllFeedbacksByCourse.PATH, 'get');
  if (params) {
    rb.path('course-id', params['course-id'], {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseFeedbackResponse>;
    })
  );
}

findAllFeedbacksByCourse.PATH = '/feedbacks/course/{course-id}';
