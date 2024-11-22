package com.ProjectRH.course.feedback;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FeedBackRepository extends JpaRepository<Feedback, Integer> {
    @Query("""
            SELECT feedback
            FROM Feedback  feedback
            WHERE feedback.course.id = :courseId
""")
    Page<Feedback> findAllByCourseId(@Param("courseId") Integer courseId, Pageable pageable);
}
