package com.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @Column(length = 10000)
    private String submissionText;

    private Integer score; // Score out of challenge.maxScore
    
    @Column(length = 1000)
    private String feedback; // AI or manual feedback
    
    @Enumerated(EnumType.STRING)
    private SubmissionStatus status = SubmissionStatus.SUBMITTED;
    
    private Integer timeSpent; // in minutes
    
    private LocalDateTime submittedAt = LocalDateTime.now();
    
    private LocalDateTime gradedAt;
    
    public enum SubmissionStatus {
        SUBMITTED, GRADED, REVIEWED, FLAGGED
    }
}
