package com.ProjectRH.course.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CourseTransactionHistoryRepository extends JpaRepository<CourseTransactionHistory, Integer> {
    @Query("""
            SELECT
            (COUNT (*) > 0) AS isBorrowed
            FROM CourseTransactionHistory courseTransactionHistory
            WHERE courseTransactionHistory.user.id = :userId
            AND courseTransactionHistory.course.id = :courseId
            AND courseTransactionHistory.achieveApproved = false
            """)
    boolean isAlreadyBorrowedByUser(@Param("courseId") Integer courseId, @Param("userId") Integer userId);

    @Query("""
            SELECT
            (COUNT (*) > 0) AS isBorrowed
            FROM CourseTransactionHistory courseTransactionHistory
            WHERE courseTransactionHistory.course.id = :courseId
            AND courseTransactionHistory.achieveApproved = false
            """)
    boolean isAlreadyBorrowed(@Param("courseId") Integer courseId);

    @Query("""
            SELECT transaction
            FROM CourseTransactionHistory  transaction
            WHERE transaction.user.id = :userId
            AND transaction.course.id = :courseId
            AND transaction.achieved = false
            AND transaction.achieveApproved = false
            """)
    Optional<CourseTransactionHistory> findByCourseIdAndUserId(@Param("courseId") Integer courseId, @Param("userId") Integer userId);

    @Query("""
            SELECT transaction
            FROM CourseTransactionHistory  transaction
            WHERE transaction.course.owner.id = :userId
            AND transaction.course.id = :courseId
            AND transaction.achieved = true
            AND transaction.achieveApproved = false
            """)
    Optional<CourseTransactionHistory> findByCourseIdAndOwnerId(@Param("courseId") Integer courseId, @Param("userId") Integer userId);

    @Query("""
            SELECT history
            FROM CourseTransactionHistory history
            WHERE history.user.id = :userId
            """)
    Page<CourseTransactionHistory> findAllBorrowedCourses(Pageable pageable, Integer userId);
    @Query("""
            SELECT history
            FROM CourseTransactionHistory history
            WHERE history.course.owner.id = :userId
            """)
    Page<CourseTransactionHistory> findAllAchievedCourses(Pageable pageable, Integer userId);
}
