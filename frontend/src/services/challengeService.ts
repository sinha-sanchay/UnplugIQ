import { apiClient, handleApiResponse, handleApiError, apiCallWithRetry } from './api';
import {
  Challenge,
  ChallengeType,
} from '@/types';

export class ChallengeService {
  /**
   * Get all challenges
   */
  static async getAllChallenges(): Promise<Challenge[]> {
    const result = await apiCallWithRetry(
      () => apiClient.get<Challenge[]>('/challenges'),
      'ChallengeService.getAllChallenges'
    );
    
    return result;
  }

  /**
   * Get challenge by ID
   */
  static async getChallengeById(id: number): Promise<Challenge> {
    const result = await apiCallWithRetry(
      () => apiClient.get<Challenge>(`/challenges/${id}`),
      `ChallengeService.getChallengeById(${id})`
    );
    
    return result;
  }

  /**
   * Get challenges filtered by type
   */
  static async getChallengesByType(type: ChallengeType): Promise<Challenge[]> {
    try {
      const response = await apiClient.get<Challenge[]>(`/challenges/type/${type}`);
      const result = handleApiResponse(response);
      
      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Note: The following methods are not implemented in the backend yet
  // They can be added when the backend supports these features:
  
  // - searchChallenges(query: string)
  // - getChallengesPaginated(page, size, type?)
  // - getRecentChallenges()
  // - getChallengeStats(challengeId)
  // - hasUserSubmitted(challengeId)
}