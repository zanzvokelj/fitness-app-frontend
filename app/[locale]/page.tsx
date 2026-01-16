'use client';

import HomeActions from '@/app/components/home/HomeActions';
import WaveBackground from '../components/WaveBackground';


export default function HomePage() {
  return (
    <main className="relative flex-1 bg-white overflow-hidden">
      
      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <HomeActions />
      </div>

      {/* WAVE BACKGROUND */}
      <WaveBackground />
    </main>
  );
}