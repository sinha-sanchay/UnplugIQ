package com.backend.service;

import com.backend.model.Challenge;
import com.backend.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    public Challenge createChallenge(Challenge challenge) {
        return challengeRepository.save(challenge);
    }

    public List<Challenge> getAllChallenges() {
        return challengeRepository.findAll();
    }

    public Optional<Challenge> getChallengeById(Long id) {
        return challengeRepository.findById(id);
    }

    public void deleteChallenge(Long id) {
        challengeRepository.deleteById(id);
    }

    public List<Challenge> getChallengesByType(String type) {
        return challengeRepository.findByType(type.toUpperCase());
    }
}
