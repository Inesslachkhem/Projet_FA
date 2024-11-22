import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedCourseListComponent } from './borrowed-course-list.component';

describe('BorrowedCourseListComponent', () => {
  let component: BorrowedCourseListComponent;
  let fixture: ComponentFixture<BorrowedCourseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowedCourseListComponent]
    });
    fixture = TestBed.createComponent(BorrowedCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
