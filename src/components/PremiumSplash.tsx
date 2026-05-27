import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function PremiumSplash({ onComplete }: Props) {
  const [logoScale, setLogoScale] = useState(0.8);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [particlePositions, setParticlePositions] = useState<{ x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate particles
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticlePositions(particles);

    // Logo entrance
    const logoTimer = setTimeout(() => {
      setLogoOpacity(1);
      setLogoScale(1);
    }, 100);

    // Text fade in
    const textTimer = setTimeout(() => {
      setTextOpacity(1);
    }, 600);

    // Complete splash
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,1) 100%)',
        }}
      />

      {/* Animated particles */}
      {particlePositions.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `rgba(16,185,129,${0.3 + Math.random() * 0.4})`,
            boxShadow: `0 0 ${10 + Math.random() * 10}px rgba(16,185,129,0.5)`,
            animation: `floatParticle 4s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}

      {/* Glow effect */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale}) translateY(0)`,
          }}
        >
          <h1 className="text-7xl font-black tracking-wider mb-2">
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #10b981 50%, #fff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s ease-in-out infinite',
                textShadow: '0 0 40px rgba(16,185,129,0.4)',
              }}
            >
              PLAY
            </span>
          </h1>
          <h1 className="text-6xl font-black tracking-wider">
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #10b981 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s ease-in-out infinite reverse',
              }}
            >
              FUT
            </span>
          </h1>

          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-emerald-500" />
            <div className="w-2 h-2 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 10px rgba(16,185,129,0.8)' }} />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-emerald-500" />
          </div>
        </div>

        {/* Tagline */}
        <div
          className="transition-all duration-700 ease-out mt-8"
          style={{ opacity: textOpacity }}
        >
          <p className="text-slate-400 text-sm tracking-[0.25em] uppercase font-medium">
            La nueva forma de jugar
          </p>
          <p className="text-emerald-400 text-lg tracking-wider font-semibold mt-1">
            fútbol amateur
          </p>
        </div>

        {/* Loading bar */}
        <div
          className="transition-all duration-700 ease-out mt-12"
          style={{ opacity: textOpacity }}
        >
          <div className="w-48 h-[2px] bg-slate-800 mx-auto rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              style={{
                width: '100%',
                animation: 'loadProgress 2s ease-out forwards',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
        @keyframes loadProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
