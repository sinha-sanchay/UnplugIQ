package com.backend.controller;

import com.backend.model.Challenge;
import com.backend.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @PostMapping
    public Challenge createChallenge(@RequestBody Challenge challenge) {
        return challengeService.createChallenge(challenge);
    }

    @GetMapping
    public List<Challenge> getAllChallenges() {
        return challengeService.getAllChallenges();
    }

    @GetMapping("/{id}")
    public Optional<Challenge> getChallengeById(@PathVariable Long id) {
        return challengeService.getChallengeById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteChallenge(@PathVariable Long id) {
        challengeService.deleteChallenge(id);
        return "Challenge deleted with ID: " + id;
    }

    @GetMapping("/type/{type}")
    public List<Challenge> getChallengesByType(@PathVariable String type) {
        return challengeService.getChallengesByType(type);
    }
}
