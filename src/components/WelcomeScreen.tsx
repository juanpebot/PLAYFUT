interface Props {
  onLogin: () => void;
  onCreateAccount: () => void;
}

export default function WelcomeScreen({ onLogin, onCreateAccount }: Props) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Stadium background - blurred */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.3)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-wider mb-1">
            <span
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #d1d5db 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              PLAY
            </span>
          </h1>
          <h1 className="text-4xl font-black tracking-wider">
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              FUT
            </span>
          </h1>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-emerald-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-emerald-500" />
          </div>
        </div>

        {/* Glass card */}
        <div
          className="w-full max-w-sm rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <div className="p-8">
            <h2 className="text-white text-xl font-semibold text-center mb-6">
              Bienvenido
            </h2>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={onLogin}
                className="w-full py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
                }}
              >
                Iniciar Sesión
              </button>

              <button
                onClick={onCreateAccount}
                className="w-full py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                }}
              >
                Crear Cuenta
              </button>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />
        </div>

        {/* Footer text */}
        <p className="text-slate-500 text-xs tracking-wider mt-8 uppercase">
          Tu liga amateur
        </p>
      </div>
    </div>
  );
}
