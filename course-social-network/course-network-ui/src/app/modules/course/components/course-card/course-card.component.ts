import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CourseResponse} from '../../../../services/models/course-response';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  private _course: CourseResponse = {};
  private _manage = false;
  private _courseCover: string | undefined;

  get courseCover(): string | undefined {
    if (this._course.cover) {
      return 'data:image/jpg;base64,' + this._course.cover
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }

  get course(): CourseResponse {
    return this._course;
  }

  @Input()
  set course(value: CourseResponse) {
    this._course = value;
  }


  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  @Output() private share: EventEmitter<CourseResponse> = new EventEmitter<CourseResponse>();
  @Output() private archive: EventEmitter<CourseResponse> = new EventEmitter<CourseResponse>();
  @Output() private addToWaitingList: EventEmitter<CourseResponse> = new EventEmitter<CourseResponse>();
  @Output() private borrow: EventEmitter<CourseResponse> = new EventEmitter<CourseResponse>();
  @Output() private edit: EventEmitter<CourseResponse> = new EventEmitter<CourseResponse>();
  @Output() private details: EventEmitter<CourseResponse> = new EventEmitter<CourseResponse>();

  onShare() {
    this.share.emit(this._course);
  }

  onArchive() {
    this.archive.emit(this._course);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._course);
  }

  onBorrow() {
    this.borrow.emit(this._course); 
  }

  onEdit() {
    this.edit.emit(this._course);
  }

  onShowDetails() {
    this.details.emit(this._course);
  }
}
