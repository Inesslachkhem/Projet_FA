/* tslint:disable */
/* eslint-disable */
import { CourseResponse } from './course-response';
export interface PageResponseCourseResponse {
  content?: Array<CourseResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
