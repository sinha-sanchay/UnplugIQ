package com.backend.repository;

import com.backend.model.Submission;
import com.backend.model.User;
import com.backend.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUser(User user);
    List<Submission> findByChallenge(Challenge challenge);
}
