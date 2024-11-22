package com.ProjectRH.course.course;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface CourseRepository extends JpaRepository<Course, Integer>, JpaSpecificationExecutor<Course> {
    @Query("""
            SELECT course
            FROM Course course
            WHERE course.archived = false
            AND course.shareable = true
            AND course.owner.id != :userId
            """)
    Page<Course> findAllDisplayableCourses(Pageable pageable, Integer userId);
}
