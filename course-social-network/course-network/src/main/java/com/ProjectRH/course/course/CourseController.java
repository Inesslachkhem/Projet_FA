package com.ProjectRH.course.course;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ProjectRH.course.common.PageResponse;

@RestController
@RequestMapping("courses")
@RequiredArgsConstructor
@Tag(name = "Course")
public class CourseController {

    private final CourseService service;

    @PostMapping
    public ResponseEntity<Integer> saveCourse(
            @Valid @RequestBody CourseRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping("/{course-id}")
    public ResponseEntity<CourseResponse> findCourseById(
            @PathVariable("course-id") Integer courseId
    ) {
        return ResponseEntity.ok(service.findById(courseId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<CourseResponse>> findAllCourses(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllCourses(page, size, connectedUser));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<CourseResponse>> findAllCoursesByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllCoursesByOwner(page, size, connectedUser));
    }

    @GetMapping("/borrowed")
    public ResponseEntity<PageResponse<BorrowedCourseResponse>> findAllBorrowedCourses(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllBorrowedCourses(page, size, connectedUser));
    }

    @GetMapping("/achieved")
    public ResponseEntity<PageResponse<BorrowedCourseResponse>> findAllAchievedCourses(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllAchievedCourses(page, size, connectedUser));
    }

    @PatchMapping("/shareable/{course-id}")
    public ResponseEntity<Integer> updateShareableStatus(
            @PathVariable("course-id") Integer courseId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.updateShareableStatus(courseId, connectedUser));
    }

    @PatchMapping("/archived/{course-id}")
    public ResponseEntity<Integer> updateArchivedStatus(
            @PathVariable("course-id") Integer courseId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.updateArchivedStatus(courseId, connectedUser));
    }

    @PostMapping("borrow/{course-id}")
    public ResponseEntity<Integer> borrowCourse(
            @PathVariable("course-id") Integer courseId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.borrowCourse(courseId, connectedUser));
    }

    @PatchMapping("borrow/return/{course-id}")
    public ResponseEntity<Integer> returnBorrowCourse(
            @PathVariable("course-id") Integer courseId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.returnBorrowedCourse(courseId, connectedUser));
    }

    @PatchMapping("borrow/return/approve/{course-id}")
    public ResponseEntity<Integer> approveReturnBorrowCourse(
            @PathVariable("course-id") Integer courseId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.approveReturnBorrowedCourse(courseId, connectedUser));
    }

    @PostMapping(value = "/cover/{course-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadCourseCoverPicture(
            @PathVariable("course-id") Integer courseId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ) {
        service.uploadCourseCoverPicture(file, connectedUser, courseId);
        return ResponseEntity.accepted().build();
    }
}
