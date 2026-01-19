// lib/api/ai.ts
import { apiRequest } from './apiClient';

export type AiRecommendationRequest = {
  goal: 'fat_loss' | 'strength' | 'mobility';
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  days_per_week: number;
};

export type RecommendedSession = {
  day: string;
  class: string;
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

export type AiChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type AiChatResponse = {
  reply: string;
};

export function sendAiChat(
  messages: AiChatMessage[]
): Promise<AiChatResponse> {
  return apiRequest<AiChatResponse>(
    '/api/v1/ai/chat',
    {
      method: 'POST',
      body: JSON.stringify({ messages }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json', 
      },
    }
  );
}