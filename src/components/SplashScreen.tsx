import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  const [ballY, setBallY] = useState(0);
  const [ballVelocity, setBallVelocity] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const gravity = 0.8;
    const bounceFactor = 0.7;
    const groundY = 60;

    let velocity = 0;
    let y = -100;
    let bouncing = true;

    const animate = () => {
      if (!bouncing) return;

      velocity += gravity;
      y += velocity;

      if (y >= groundY) {
        y = groundY;
        velocity = -velocity * bounceFactor;

        if (Math.abs(velocity) < 2) {
          bouncing = false;
          velocity = 0;
          y = groundY;
        }
      }

      setBallY(y);
      setBallVelocity(velocity);

      if (bouncing) {
        requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 200);

    const textTimeout = setTimeout(() => {
      setShowText(true);
    }, 1500);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3700);

    return () => {
      clearTimeout(timeout);
      clearTimeout(textTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-slate-50">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ball */}
      <div className="relative" style={{ marginTop: '-60px' }}>
        <div
          className="relative transition-transform"
          style={{ transform: `translateY(${ballY}px)` }}
        >
          {/* Ball shadow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-75"
            style={{
              width: `${90 + (ballY / 60) * 35}px`,
              height: `${10 - (ballY / 60) * 4}px`,
              top: '98px',
              opacity: 0.08 - (ballY / 60) * 0.03,
              filter: `blur(${14 + (ballY / 60) * 8}px)`,
              background: '#000',
            }}
          />

          {/* Al Rihla Ball - Premium Professional Look */}
          <div
            className="w-[88px] h-[88px] rounded-full relative overflow-hidden"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #fff7ed 0%, #ffedd5 15%, #fed7aa 40%, #fb923c 70%, #ea580c 100%)',
              boxShadow: `
                0 8px 35px rgba(0,0,0,0.18),
                0 3px 10px rgba(0,0,0,0.1),
                inset 0 4px 25px rgba(255,255,255,0.35),
                inset 0 -5px 20px rgba(194,65,12,0.15)
              `,
              transform: `scale(${ballVelocity < 0 ? 0.92 : 1})`,
            }}
          >
            {/* Micro texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                background: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.4) 1px, transparent 1px)',
                backgroundSize: '5px 5px',
              }}
            />

            {/* Al Rihla speed lines - minimal professional design */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[72px] h-[72px] relative">
                {/* Main aerodynamic panels - subtle */}
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 origin-left"
                    style={{ transform: `translate(-35%, -50%) rotate(${i * 120}deg)` }}
                  >
                    <div
                      className="w-[50px] h-[6px] rounded-r-full"
                      style={{
                        background: 'linear-gradient(90deg, rgba(180,83,9,0.06) 0%, rgba(180,83,9,0.12) 50%, rgba(180,83,9,0.22) 100%)',
                        borderRadius: '0 100px 100px 0',
                      }}
                    />
                  </div>
                ))}

                {/* Subtle inner ring detail */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-9 h-9 rounded-full border"
                    style={{ borderColor: 'rgba(180,83,9,0.12)' }}
                  />
                </div>
              </div>
            </div>

            {/* Professional highlight */}
            <div
              className="absolute top-4 left-6"
              style={{
                width: '26px',
                height: '6px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
                borderRadius: '50%',
                transform: 'rotate(-18deg)',
              }}
            />

            {/* Secondary highlight */}
            <div
              className="absolute top-7 right-5 w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
              }}
            />

            {/* Center accent mark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(251,191,36,0.08) 50%, transparent 70%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Minimal grass/ground */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.02) 25%, rgba(34,197,94,0.06) 55%, rgba(34,197,94,0.1) 100%)',
        }}
      />

      {/* Text */}
      <div
        className={`absolute z-10 transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        style={{ bottom: '210px' }}
      >
        <div className="text-center">
          <h1
            className="text-5xl font-black tracking-[0.18em] text-slate-800"
            style={{ textShadow: '0 1px 0 rgba(255,255,255,0.85)' }}
          >
            PLAY<span className="text-emerald-600">FOOTBALL</span>
          </h1>
          <div className="mt-5 flex items-center justify-center gap-4">
            <div className="h-px w-14 bg-slate-300" />
            <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase font-medium">
              Tu Liga Amateur
            </p>
            <div className="h-px w-14 bg-slate-300" />
          </div>
        </div>
      </div>

      {/* Loading indicator - minimal */}
      <div
        className={`absolute z-10 transition-all duration-700 ${showText ? 'opacity-100' : 'opacity-0'}`}
        style={{ bottom: '150px' }}
      >
        <div className="flex gap-[6px]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-5 h-[2px] bg-slate-700 rounded-full"
              style={{ animation: `loadPulse 1.3s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loadPulse {
          0%, 80%, 100% {
            opacity: 0.2;
            transform: scaleX(0.55);
          }
          40% {
            opacity: 0.9;
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
