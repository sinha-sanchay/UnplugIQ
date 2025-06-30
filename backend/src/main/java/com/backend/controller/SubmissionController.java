package com.backend.controller;

import com.backend.model.Submission;
import com.backend.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    // ✅ Submit an answer to a challenge
    @PostMapping
    public Submission submitResponse(@RequestParam Long userId,
                                     @RequestParam Long challengeId,
                                     @RequestBody String submissionText) {
        return submissionService.submitResponse(userId, challengeId, submissionText);
    }

    // ✅ Get all submissions (admin use or dashboard)
    @GetMapping
    public List<Submission> getAllSubmissions() {
        return submissionService.getAllSubmissions();
    }

    // ✅ Get submissions by user
    @GetMapping("/user/{userId}")
    public List<Submission> getByUser(@PathVariable Long userId) {
        return submissionService.getByUserId(userId);
    }

    // ✅ Get submissions by challenge
    @GetMapping("/challenge/{challengeId}")
    public List<Submission> getByChallenge(@PathVariable Long challengeId) {
        return submissionService.getByChallengeId(challengeId);
    }
}
