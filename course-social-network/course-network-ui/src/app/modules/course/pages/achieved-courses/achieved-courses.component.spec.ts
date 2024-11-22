import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievedCoursesComponent } from './achieved-courses.component';

describe('AchievedCoursesComponent', () => {
  let component: AchievedCoursesComponent;
  let fixture: ComponentFixture<AchievedCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AchievedCoursesComponent]
    });
    fixture = TestBed.createComponent(AchievedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
