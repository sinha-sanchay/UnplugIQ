// Core data models for the application

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  type: ChallengeType;
  datePosted: string;
}

export interface Submission {
  id: number;
  user: User;
  challenge: Challenge;
  submissionText: string;
  submittedAt: string;
}

export enum ChallengeType {
  WRITING = 'WRITING',
  SPEAKING = 'SPEAKING',
  LOGICAL = 'LOGICAL'
}