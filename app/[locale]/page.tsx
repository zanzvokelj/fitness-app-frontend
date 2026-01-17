'use client';

import HomeActions from '@/app/components/home/HomeActions';
import WaveBackground from '../components/WaveBackground';


export default function HomePage() {
  return (
    <main className="relative flex-1 bg-white overflow-hidden">

      {/* FREE TIER NOTICE */}
<div className="relative z-20 mx-auto mt-6 max-w-3xl rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
  <div className="font-semibold mb-1">
    ⏳ Obvestilo / Notice
  </div>

  <p className="mb-2">
    Ta aplikacija uporablja <strong>free-tier strežnike</strong>.  
    Ob prvem obisku se lahko strežnik zaganja tudi do <strong>1 minute</strong>.
  </p>

  <p className="text-amber-800">
    This app runs on <strong>free-tier servers</strong>.  
    On first visit, the backend may take up to <strong>1 minute</strong> to wake up.
  </p>
</div>
      
      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <HomeActions />
      </div>

      {/* WAVE BACKGROUND */}
      <WaveBackground />
    </main>
  );
}