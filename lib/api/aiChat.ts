import { apiRequest } from './apiClient';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type AiChatResponse = {
  reply: string;
};

export function sendAiChatMessage(
  messages: ChatMessage[]
): Promise<AiChatResponse> {
  return apiRequest<AiChatResponse>('/api/v1/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ messages }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
}