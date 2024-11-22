package com.ProjectRH.course.course;

import org.springframework.data.jpa.domain.Specification;

public class CourseSpecification {

    public static Specification<Course> withOwnerId(Integer ownerId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }
}
