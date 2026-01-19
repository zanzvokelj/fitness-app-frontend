'use client';

import { useState } from 'react';
import { sendAiChat, AiChatMessage } from '@/lib/api/ai';

export default function AiChat() {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Živjo 👋 Sem tvoj AI fitnes trener. Kaj je tvoj cilj?',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const newMessages: AiChatMessage[] = [
      ...messages,
      { role: 'user', content: input },
    ];

    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await sendAiChat(newMessages);

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
            'Prišlo je do napake 😕 Poskusi ponovno.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border p-4 flex flex-col h-125">
      <h2 className="text-lg font-semibold mb-2">
        🤖 AI Fitness Coach
      </h2>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
              m.role === 'user'
                ? 'bg-blue-600 text-white ml-auto'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-400">
            AI razmišlja…
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={2}
          placeholder="Npr. Rad bi shujšal in treniral 3x na teden"
          className="flex-1 border rounded px-3 py-2 text-sm resize-none"
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Pošlji
        </button>
      </div>
    </div>
  );
}