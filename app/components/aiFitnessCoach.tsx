'use client';

import { useState } from 'react';
import {
  getAiRecommendation,
  AiRecommendationResponse,
} from '@/lib/api/ai';

type Goal = 'fat_loss' | 'strength' | 'mobility';
type Experience = 'beginner' | 'intermediate' | 'advanced';

export default function AiFitnessCoach() {
  const [goal, setGoal] = useState<Goal>('fat_loss');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [experience] = useState<Experience>('beginner'); // zaenkrat fiksno

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiRecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await getAiRecommendation({
        goal,
        experience_level: experience,
        days_per_week: daysPerWeek,
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
    <div className="rounded-xl border p-6 space-y-6">
      <h2 className="text-xl font-semibold">
        🤖 AI Fitness Coach
      </h2>

      {/* 🔽 USER INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Goal */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Cilj vadbe
          </label>
          <select
            value={goal}
            onChange={e => setGoal(e.target.value as Goal)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="fat_loss">Kurjenje maščob</option>
            <option value="strength">Moč</option>
            <option value="mobility">Kondicija / mobilnost</option>
          </select>
        </div>

        {/* Days per week */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Treningov na teden
          </label>
          <input
            type="number"
            min={1}
            max={6}
            value={daysPerWeek}
            onChange={e => setDaysPerWeek(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* ACTION */}
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Pridobi priporočilo
      </button>

      {/* STATES */}
      {loading && <p>🤔 Razmišljam…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* RESULT */}
      {result && (
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Priporočene vadbe</h3>
           <ul className="space-y-1">
  {result.recommended_sessions.map((s, i) => (
    <li key={i}>
      <strong>{s.day}</strong> – {s.class} ob {s.time}
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

          <blockquote className="italic border-l-4 pl-4 text-gray-700">
            {result.ai_explanation}
          </blockquote>
        </div>
      )}
    </div>
  );
}