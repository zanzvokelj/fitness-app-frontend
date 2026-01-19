'use client';

import { useState } from 'react';
import { sendAiChatMessage, ChatMessage } from '@/lib/api/aiChat';
import ChatBubble from './ChatMessage';

export default function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Živjo! Sem tvoj AI fitness trener. Kako ti lahko danes pomagam?',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: input },
    ];

    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await sendAiChatMessage(newMessages.slice(-10)); // 🔒 limit context

      setMessages([
        ...newMessages,
        { role: 'assistant', content: res.reply },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            'Prišlo je do napake. Poskusi znova čez trenutek.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border p-4 space-y-4">
      <h2 className="font-semibold">🤖 AI Fitness Chat</h2>

      <div className="h-80 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <ChatBubble key={i} {...m} />
        ))}
        {loading && (
          <ChatBubble
            role="assistant"
            content="Razmišljam…"
          />
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Vprašaj trenerja…"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Pošlji
        </button>
      </div>
    </div>
  );
}