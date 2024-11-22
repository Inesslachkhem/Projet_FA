/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ApproveAchieveBorrowCourse$Params {
  'course-id': number;
}

export function approveAchieveBorrowCourse(http: HttpClient, rootUrl: string, params: ApproveAchieveBorrowCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, approveAchieveBorrowCourse.PATH, 'patch');
  if (params) {
    rb.path('course-id', params['course-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

approveAchieveBorrowCourse.PATH = '/courses/borrow/achieve/approve/{course-id}';
