'use client';

import { useState } from 'react';
import {
  getAiRecommendation,
  AiRecommendationResponse,
} from '@/lib/api/ai';

export default function AiFitnessCoach() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiRecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

async function handleClick() {
  setLoading(true);
  setError(null);

  try {
    const res = await getAiRecommendation({
      goal: 'fat_loss',
      experience_level: 'beginner',
      days_per_week: 3,
    });

    setResult(res);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Prišlo je do napake');
    }
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="rounded-xl border p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        🤖 AI Fitness Coach
      </h2>

     <button
  onClick={handleClick}
  disabled={loading}
  className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
>
  Pridobi priporočilo
</button>

      {loading && <p>Razmišljam…</p>}

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <>
          <div>
            <h3 className="font-medium">Priporočene vadbe</h3>
            <ul className="list-disc pl-5">
              {result.recommended_sessions.map((s, i) => (
                <li key={i}>
                  {s.class} – {s.date} ob {s.time}
                </li>
              ))}
            </ul>
          </div>

          {result.ticket_recommendation && (
            <div>
              <h3 className="font-medium">Priporočena karta</h3>
              <p>
                {result.ticket_recommendation.name} –{' '}
                {result.ticket_recommendation.price} €
              </p>
            </div>
          )}

          <blockquote className="italic border-l-4 pl-4">
            {result.ai_explanation}
          </blockquote>
        </>
      )}
    </div>
  );
}