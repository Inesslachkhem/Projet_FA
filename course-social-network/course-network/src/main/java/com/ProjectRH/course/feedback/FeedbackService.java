package com.ProjectRH.course.feedback;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProjectRH.course.common.PageResponse;

import com.ProjectRH.course.course.Course;
import com.ProjectRH.course.course.CourseRepository;
import com.ProjectRH.course.exception.OperationNotPermittedException;
import com.ProjectRH.course.user.User;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedBackRepository feedBackRepository;
    private final CourseRepository courseRepository;
    private final FeedbackMapper feedbackMapper;

    public Integer save(FeedbackRequest request, Authentication connectedUser) {
        Course course = courseRepository.findById(request.courseId())
                .orElseThrow(() -> new EntityNotFoundException("No course found with ID:: " + request.courseId()));
        if (course.isArchived() || !course.isShareable()) {
            throw new OperationNotPermittedException("You cannot give a feedback for and archived or not shareable course");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(course.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give feedback to your own course");
        }
        Feedback feedback = feedbackMapper.toFeedback(request);
        return feedBackRepository.save(feedback).getId();
    }

    @Transactional
    public PageResponse<FeedbackResponse> findAllFeedbacksByCourse(Integer courseId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedBackRepository.findAllByCourseId(courseId, pageable);
        List<FeedbackResponse> feedbackResponses = feedbacks.stream()
                .map(f -> feedbackMapper.toFeedbackResponse(f, user.getId()))
                .toList();
        return new PageResponse<>(
                feedbackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );

    }
}
