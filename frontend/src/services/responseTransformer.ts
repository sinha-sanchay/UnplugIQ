import { Challenge, Submission, User, ChallengeType } from '@/types';

/**
 * Response transformer utilities for normalizing API responses
 */

export class ResponseTransformer {
  /**
   * Transform raw challenge data from API
   */
  static transformChallenge(rawChallenge: any): Challenge {
    return {
      id: rawChallenge.id,
      title: rawChallenge.title || '',
      description: rawChallenge.description || '',
      type: rawChallenge.type as ChallengeType || ChallengeType.WRITING,
      datePosted: rawChallenge.datePosted || rawChallenge.createdAt || new Date().toISOString(),
    };
  }

  /**
   * Transform array of raw challenge data
   */
  static transformChallenges(rawChallenges: any[]): Challenge[] {
    return rawChallenges.map(challenge => this.transformChallenge(challenge));
  }

  /**
   * Transform raw user data from API
   */
  static transformUser(rawUser: any): User {
    return {
      id: rawUser.id,
      username: rawUser.username || '',
      email: rawUser.email || '',
      role: rawUser.role || 'USER',
      createdAt: rawUser.createdAt || new Date().toISOString(),
    };
  }

  /**
   * Transform raw submission data from API
   */
  static transformSubmission(rawSubmission: any): Submission {
    return {
      id: rawSubmission.id,
      user: this.transformUser(rawSubmission.user),
      challenge: this.transformChallenge(rawSubmission.challenge),
      submissionText: rawSubmission.submissionText || '',
      submittedAt: rawSubmission.submittedAt || rawSubmission.createdAt || new Date().toISOString(),
    };
  }

  /**
   * Transform array of raw submission data
   */
  static transformSubmissions(rawSubmissions: any[]): Submission[] {
    return rawSubmissions.map(submission => this.transformSubmission(submission));
  }

  /**
   * Transform date strings to consistent format
   */
  static transformDate(dateString: string): string {
    try {
      return new Date(dateString).toISOString();
    } catch {
      return new Date().toISOString();
    }
  }

  /**
   * Sanitize and validate challenge type
   */
  static validateChallengeType(type: string): ChallengeType {
    const validTypes = Object.values(ChallengeType);
    return validTypes.includes(type as ChallengeType) 
      ? (type as ChallengeType) 
      : ChallengeType.WRITING;
  }

  /**
   * Transform pagination response
   */
  static transformPaginatedResponse<T>(
    rawResponse: any,
    transformItem: (item: any) => T
  ): {
    data: T[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
  } {
    return {
      data: (rawResponse.content || rawResponse.data || []).map(transformItem),
      totalElements: rawResponse.totalElements || 0,
      totalPages: rawResponse.totalPages || 0,
      currentPage: rawResponse.number || rawResponse.currentPage || 0,
    };
  }

  /**
   * Clean and validate text input
   */
  static sanitizeText(text: string): string {
    return text.trim().replace(/\s+/g, ' ');
  }

  /**
   * Transform error response to consistent format
   */
  static transformErrorResponse(error: any): {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
  } {
    return {
      message: error.message || 'An error occurred',
      status: error.status || 500,
      errors: error.errors || undefined,
    };
  }
}