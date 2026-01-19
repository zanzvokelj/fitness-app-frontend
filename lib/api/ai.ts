// lib/api/ai.ts
import { apiRequest } from './apiClient';

export type AiRecommendationRequest = {
  goal: 'fat_loss' | 'strength' | 'mobility';
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  days_per_week: number;
};

export type RecommendedSession = {
  class: string;
  date: string;
  time: string;
};

export type TicketRecommendation = {
  name: string;
  price: number;
} | null;

export type AiRecommendationResponse = {
  goal: string;
  days_per_week: number;
  recommended_sessions: RecommendedSession[];
  ticket_recommendation: TicketRecommendation;
  ai_explanation: string;
};

export function getAiRecommendation(
  payload: AiRecommendationRequest
): Promise<AiRecommendationResponse> {
  return apiRequest<AiRecommendationResponse>(
    '/api/v1/ai/recommend',
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
}