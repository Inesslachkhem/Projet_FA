/* tslint:disable */
/* eslint-disable */
import { BorrowedCourseResponse } from './borrowed-course-response';
export interface PageResponseBorrowedCourseResponse {
  content?: Array<BorrowedCourseResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
