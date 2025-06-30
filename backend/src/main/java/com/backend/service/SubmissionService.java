package com.backend.service;

import com.backend.model.Submission;
import com.backend.model.User;
import com.backend.model.Challenge;
import com.backend.repository.SubmissionRepository;
import com.backend.repository.UserRepository;
import com.backend.repository.ChallengeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    public Submission submitResponse(Long userId, Long challengeId, String text) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Challenge> challengeOpt = challengeRepository.findById(challengeId);

        if (userOpt.isEmpty() || challengeOpt.isEmpty()) {
            throw new RuntimeException("User or Challenge not found.");
        }

        Submission submission = new Submission();
        submission.setUser(userOpt.get());
        submission.setChallenge(challengeOpt.get());
        submission.setSubmissionText(text);

        return submissionRepository.save(submission);
    }

    public List<Submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    public List<Submission> getByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return submissionRepository.findByUser(user);
    }

    public List<Submission> getByChallengeId(Long challengeId) {
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow();
        return submissionRepository.findByChallenge(challenge);
    }
}
