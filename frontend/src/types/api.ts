// API request and response types

import { User, Challenge, Submission } from './models';

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// API response wrappers
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Challenge API types
export interface ChallengeListResponse extends ApiResponse<Challenge[]> {}
export interface ChallengeResponse extends ApiResponse<Challenge> {}

// Submission API types
export interface SubmissionData {
  userId: number;
  challengeId: number;
  submissionText: string;
}

export interface SubmissionResponse extends ApiResponse<Submission> {}
export interface SubmissionListResponse extends ApiResponse<Submission[]> {}

// User API types
export interface UserResponse extends ApiResponse<User> {}