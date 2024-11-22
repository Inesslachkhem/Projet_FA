package com.ProjectRH.course.course;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ProjectRH.course.common.PageResponse;
import com.ProjectRH.course.exception.OperationNotPermittedException;
import com.ProjectRH.course.file.FileStorageService;
import com.ProjectRH.course.history.CourseTransactionHistoryRepository;
import com.ProjectRH.course.history.CourseTransactionHistory;
import com.ProjectRH.course.user.User;

import static com.ProjectRH.course.course.CourseSpecification.withOwnerId;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final CourseTransactionHistoryRepository transactionHistoryRepository;
    private final FileStorageService fileStorageService;

    public Integer save(CourseRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Course course = courseMapper.toCourse(request); 
        course.setOwner(user);
        return courseRepository.save(course).getId();
    }

    public CourseResponse findById(Integer courseId) {
        return courseRepository.findById(courseId)
                .map(courseMapper::toCourseResponse)
                .orElseThrow(() -> new EntityNotFoundException("No course found with ID:: " + courseId));
    }

    public PageResponse<CourseResponse> findAllCourses(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Course> courses = courseRepository.findAllDisplayableCourses(pageable, user.getId());
        List<CourseResponse> coursesResponse = courses.stream()
                .map(courseMapper::toCourseResponse)
                .toList();
        return new PageResponse<>(
          coursesResponse,
          courses.getNumber(),
          courses.getSize(),
          courses.getTotalElements(),
          courses.getTotalPages(),
          courses.isFirst(),
          courses.isLast()
        );
    }

    public PageResponse<CourseResponse> findAllCoursesByOwner(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Course> courses = courseRepository.findAll(withOwnerId(user.getId()), pageable);
        List<CourseResponse> coursesResponse = courses.stream()
                .map(courseMapper::toCourseResponse)
                .toList();
        return new PageResponse<>(
          coursesResponse,
          courses.getNumber(),
          courses.getSize(),
          courses.getTotalElements(),
          courses.getTotalPages(),
          courses.isFirst(),
          courses.isLast()
        );
    }
    

    public Integer updateShareableStatus(Integer courseId, Authentication connectedUser) {
      Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("No course found with ID:: " + courseId));
        User user = ((User) connectedUser.getPrincipal());
        if (!Objects.equals(course.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot update others courses shareable status");
        }
        course.setShareable(!course.isShareable());
        courseRepository.save(course);
        return courseId;
    }

    public Integer updateArchivedStatus(Integer courseId, Authentication connectedUser) {
      Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("No course found with ID:: " + courseId));
        User user = ((User) connectedUser.getPrincipal());
        if (!Objects.equals(course.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot update others courses archived status");
        }
        course.setArchived(!course.isArchived());
        courseRepository.save(course);
        return courseId;
    }

    public Integer borrowCourse(Integer courseId, Authentication connectedUser) {
      Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("No course found with ID:: " + courseId));
        if (course.isArchived() || !course.isShareable()) {
            throw new OperationNotPermittedException("The requested course cannot be borrowed since it is archived or not shareable");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(course.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot borrow your own course");
        }
        final boolean isAlreadyBorrowedByUser = transactionHistoryRepository.isAlreadyBorrowedByUser(courseId, user.getId());
        if (isAlreadyBorrowedByUser) {
            throw new OperationNotPermittedException("You already borrowed this course and it is still not achieved or the return is not approved by the owner");
        }

        final boolean isAlreadyBorrowedByOtherUser = transactionHistoryRepository.isAlreadyBorrowed(courseId);
        if (isAlreadyBorrowedByOtherUser) {
            throw new OperationNotPermittedException("Te requested course is already borrowed");
        }

        CourseTransactionHistory courseTransactionHistory = CourseTransactionHistory.builder()
                .user(user)
                .course(course)
                .achieved(false)
                .achieveApproved(false)
                .build();
        return transactionHistoryRepository.save(courseTransactionHistory).getId();

    }

    public Integer returnBorrowedCourse(Integer courseId, Authentication connectedUser) {
      Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("No course found with ID:: " + courseId));
        if (course.isArchived() || !course.isShareable()) {
            throw new OperationNotPermittedException("The requested course is archived or not shareable");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(course.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot borrow or return your own course");
        }

        CourseTransactionHistory courseTransactionHistory = transactionHistoryRepository.findByCourseIdAndUserId(courseId, user.getId())
                .orElseThrow(() -> new OperationNotPermittedException("You did not borrow this course"));

                courseTransactionHistory.setAchieved(true);
        return transactionHistoryRepository.save(courseTransactionHistory).getId();
    }

    public Integer approveReturnBorrowedCourse(Integer courseId, Authentication connectedUser) {
      Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("No course found with ID:: " + courseId));
        if (course.isArchived() || !course.isShareable()) {
            throw new OperationNotPermittedException("The requested course is archived or not shareable");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (!Objects.equals(course.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot approve the return of a course you do not own");
        }

        CourseTransactionHistory courseTransactionHistory = transactionHistoryRepository.findByCourseIdAndOwnerId(courseId, user.getId())
                .orElseThrow(() -> new OperationNotPermittedException("The course is not achieved yet. You cannot approve its return"));

                courseTransactionHistory.setAchieveApproved(true);
        return transactionHistoryRepository.save(courseTransactionHistory).getId();
    }

    public void uploadCourseCoverPicture(MultipartFile file, Authentication connectedUser, Integer courseId) {
      Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("No course found with ID:: " + courseId));
        User user = ((User) connectedUser.getPrincipal());
        var profilePicture = fileStorageService.saveFile(file, courseId, user.getId());
        course.setCourseCover(profilePicture);
        courseRepository.save(course);
    }

    public PageResponse<BorrowedCourseResponse> findAllBorrowedCourses(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<CourseTransactionHistory> allBorrowedCourses = transactionHistoryRepository.findAllBorrowedCourses(pageable, user.getId());
        List<BorrowedCourseResponse> coursesResponse = allBorrowedCourses.stream()
                .map(courseMapper::toBorrowedCourseResponse)
                .toList();
        return new PageResponse<>(
          coursesResponse,
                allBorrowedCourses.getNumber(),
                allBorrowedCourses.getSize(),
                allBorrowedCourses.getTotalElements(),
                allBorrowedCourses.getTotalPages(),
                allBorrowedCourses.isFirst(),
                allBorrowedCourses.isLast()
        );
    }

    public PageResponse<BorrowedCourseResponse> findAllAchievedCourses(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<CourseTransactionHistory> allBorrowedCourses = transactionHistoryRepository.findAllAchievedCourses(pageable, user.getId());
        List<BorrowedCourseResponse> coursesResponse = allBorrowedCourses.stream()
                .map(courseMapper::toBorrowedCourseResponse)
                .toList();
        return new PageResponse<>(
          coursesResponse,
                allBorrowedCourses.getNumber(),
                allBorrowedCourses.getSize(),
                allBorrowedCourses.getTotalElements(),
                allBorrowedCourses.getTotalPages(),
                allBorrowedCourses.isFirst(),
                allBorrowedCourses.isLast()
        );
    }
}
