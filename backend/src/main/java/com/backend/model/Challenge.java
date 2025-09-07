package com.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private ChallengeType type; // WRITING, SPEAKING, LOGICAL

    @Enumerated(EnumType.STRING)
    private DifficultyLevel difficulty = DifficultyLevel.MEDIUM;

    private Integer maxScore = 100;
    
    private Integer timeLimit; // in minutes, null for no time limit
    
    @Column(length = 1000)
    private String tags; // comma-separated tags for categorization
    
    private Boolean isActive = true;

    private java.time.LocalDate datePosted = java.time.LocalDate.now();
    
    public enum DifficultyLevel {
        EASY, MEDIUM, HARD, EXPERT
    }
}
