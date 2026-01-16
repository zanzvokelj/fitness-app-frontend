export default function WaveBackground() {
  return (
    <div className="fixed bottom-0 left-0 w-full overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="w-full h-50 md:h-60"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E6F2FF" />
            <stop offset="100%" stopColor="#F5FAFF" />
          </linearGradient>
        </defs>

        <path
          d="
            M0,80
            C120,60 240,40 360,50
            C480,60 600,100 720,110
            C840,120 960,100 1080,85
            C1200,70 1320,70 1440,80
            L1440,180
            L0,180
            Z
          "
          fill="url(#waveGradient)"
        />
      </svg>
    </div>
  );
}