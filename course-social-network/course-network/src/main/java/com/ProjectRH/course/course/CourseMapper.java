package com.ProjectRH.course.course;

import org.springframework.stereotype.Service;

import com.ProjectRH.course.file.FileUtils;
import com.ProjectRH.course.history.CourseTransactionHistory;

@Service
public class CourseMapper {
    public Course toCourse(CourseRequest request) {
        return Course.builder()
                .id(request.id())
                .title(request.title())
                .isbn(request.isbn())
                .authorName(request.authorName())
                .synopsis(request.synopsis())
                .archived(false)
                .shareable(request.shareable())
                .build();
    }

    public CourseResponse toCourseResponse(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .authorName(course.getAuthorName())
                .isbn(course.getIsbn())
                .synopsis(course.getSynopsis())
                .rate(course.getRate())
                .archived(course.isArchived())
                .shareable(course.isShareable())
                .owner(course.getOwner().fullName())
                .cover(FileUtils.readFileFromLocation(course.getCourseCover()))
                .build();
    }

    public BorrowedCourseResponse toBorrowedCourseResponse(CourseTransactionHistory history) {
        return BorrowedCourseResponse.builder()
                .id(history.getCourse().getId())
                .title(history.getCourse().getTitle())
                .authorName(history.getCourse().getAuthorName())
                .isbn(history.getCourse().getIsbn())
                .rate(history.getCourse().getRate())
                .achieved(history.isAchieved())
                .achieveApproved(history.isAchieveApproved()) 
                .build();
    }
}
