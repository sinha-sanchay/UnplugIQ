import { apiClient, handleApiResponse, handleApiError } from './api';
import {
  Submission,
  SubmissionData,
} from '@/types';

export class SubmissionService {
  /**
   * Submit a response to a challenge
   */
  static async submitResponse(submissionData: SubmissionData): Promise<Submission> {
    try {
      // Backend expects query parameters and text body, not JSON
      const response = await apiClient.post<Submission>(
        `/submissions?userId=${submissionData.userId}&challengeId=${submissionData.challengeId}`,
        submissionData.submissionText,
        {
          headers: {
            'Content-Type': 'text/plain'
          }
        }
      );
      const result = handleApiResponse(response);
      
      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get all submissions for the current user
   */
  static async getUserSubmissions(userId: number): Promise<Submission[]> {
    try {
      const response = await apiClient.get<Submission[]>(`/submissions/user/${userId}`);
      const result = handleApiResponse(response);
      
      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get all submissions for a specific challenge
   */
  static async getChallengeSubmissions(challengeId: number): Promise<Submission[]> {
    try {
      const response = await apiClient.get<Submission[]>(`/submissions/challenge/${challengeId}`);
      const result = handleApiResponse(response);
      
      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get all submissions (admin use)
   */
  static async getAllSubmissions(): Promise<Submission[]> {
    try {
      const response = await apiClient.get<Submission[]>('/submissions');
      const result = handleApiResponse(response);
      
      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get user submission for a specific challenge
   */
  static async getUserSubmissionForChallenge(challengeId: number): Promise<Submission | null> {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return null;
      
      const response = await apiClient.get<Submission[]>(`/submissions/user/${userId}`);
      const submissions = handleApiResponse(response);
      
      return submissions.find(sub => sub.challenge.id === challengeId) || null;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Update a submission
   */
  static async updateSubmission(submissionId: number, submissionText: string): Promise<Submission> {
    try {
      const response = await apiClient.put<Submission>(
        `/submissions/${submissionId}`,
        submissionText,
        {
          headers: {
            'Content-Type': 'text/plain'
          }
        }
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get recent user submissions
   */
  static async getRecentUserSubmissions(limit: number = 10): Promise<Submission[]> {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return [];
      
      const response = await apiClient.get<Submission[]>(`/submissions/user/${userId}`);
      const submissions = handleApiResponse(response);
      
      // Sort by submission date and limit
      return submissions
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
        .slice(0, limit);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get user submission statistics
   */
  static async getUserSubmissionStats(): Promise<any> {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return {
          totalSubmissions: 0,
          challengesCompleted: 0,
          averageSubmissionLength: 0,
          submissionsByType: {}
        };
      }
      
      const response = await apiClient.get<Submission[]>(`/submissions/user/${userId}`);
      const submissions = handleApiResponse(response);
      
      // Calculate statistics
      const totalSubmissions = submissions.length;
      const challengesCompleted = new Set(submissions.map(s => s.challenge.id)).size;
      
      // Calculate average submission length
      const totalWords = submissions.reduce((sum, submission) => {
        return sum + (submission.submissionText?.split(' ').length || 0);
      }, 0);
      const averageSubmissionLength = totalSubmissions > 0 ? totalWords / totalSubmissions : 0;
      
      // Group by challenge type
      const submissionsByType: Record<string, number> = {};
      submissions.forEach(submission => {
        const type = submission.challenge.type || 'UNKNOWN';
        submissionsByType[type] = (submissionsByType[type] || 0) + 1;
      });
      
      return {
        totalSubmissions,
        challengesCompleted,
        averageSubmissionLength,
        submissionsByType
      };
    } catch (error) {
      return handleApiError(error);
    }
  }
}