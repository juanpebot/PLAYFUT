import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Position } from '../types/auth';

interface Props {
  onBack: () => void;
  isLogin?: boolean;
}

const positions: { id: Position; label: string; color: string }[] = [
  { id: 'POR', label: 'Portero', color: '#f59e0b' },
  { id: 'DEF', label: 'Defensa', color: '#3b82f6' },
  { id: 'MED', label: 'Mediocampista', color: '#10b981' },
  { id: 'DEL', label: 'Delantero', color: '#ef4444' },
];

export default function RegisterScreen({ onBack, isLogin = false }: Props) {
  const { register, login } = useAuth();
  const [step, setStep] = useState(isLogin ? 3 : 1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    position: '' as Position | '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.username.length < 3) newErrors.username = 'Mínimo 3 caracteres';
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.city.length < 2) newErrors.city = 'Ciudad requerida';
    if (!formData.position) newErrors.position = 'Selecciona tu posición';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    if (!loginData.email.includes('@')) newErrors.loginEmail = 'Email inválido';
    if (loginData.password.length < 1) newErrors.loginPassword = 'Contraseña requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (step === 2 && validateStep2()) {
      setIsSubmitting(true);
      setErrors({});
      try {
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          city: formData.city,
          position: formData.position as Position,
        });
      } catch (error) {
        setErrors({ submit: 'Error al registrarse. Intenta de nuevo.' });
        setIsSubmitting(false);
      }
    }
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      setIsSubmitting(true);
      setLoginError('');
      try {
        await login(loginData.email, loginData.password);
      } catch (error) {
        setLoginError('Email o contraseña incorrectos');
        setIsSubmitting(false);
      }
    }
  };

  const getInitials = () => {
    if (!formData.username) return '?';
    return formData.username.slice(0, 2).toUpperCase();
  };

  const selectedPosition = positions.find((p) => p.id === formData.position);

  // Login screen
  if (step === 3 || isLogin) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(12px) brightness(0.2)',
            transform: 'scale(1.1)',
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 min-h-screen px-6 py-12">
          {/* Header */}
          <button
            onClick={onBack}
            className="text-white text-sm flex items-center gap-2 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Atrás
          </button>

          {/* Title */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))',
                  border: '2px solid rgba(16,185,129,0.5)',
                  color: '#10b981',
                }}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h1 className="text-white text-3xl font-bold mb-2">Bienvenido de nuevo</h1>
            <p className="text-slate-400 text-sm">Inicia sesión para continuar</p>
          </div>

          <div className="space-y-5 animate-fadeIn">
            {/* Email */}
            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: errors.loginEmail ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                placeholder="tu@email.com"
                onFocus={(e) => e.target.style.borderColor = '#10b981'}
                onBlur={(e) => e.target.style.borderColor = errors.loginEmail ? '#ef4444' : 'rgba(255,255,255,0.1)'}
              />
              {errors.loginEmail && <p className="text-red-400 text-xs mt-1">{errors.loginEmail}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider block mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: errors.loginPassword ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                placeholder="Tu contraseña"
                onFocus={(e) => e.target.style.borderColor = '#10b981'}
                onBlur={(e) => e.target.style.borderColor = errors.loginPassword ? '#ef4444' : 'rgba(255,255,255,0.1)'}
              />
              {errors.loginPassword && <p className="text-red-400 text-xs mt-1">{errors.loginPassword}</p>}
            </div>

            {/* Login error */}
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm text-center">
                {loginError}
              </div>
            )}

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-semibold text-sm tracking-wide mt-6 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>

            {/* Switch to register */}
            <p className="text-center text-slate-500 text-sm mt-6">
              ¿No tienes cuenta?{' '}
              <button
                onClick={() => setStep(1)}
                className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
              >
                Crear cuenta
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Registration screens (steps 1 and 2)
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/143423/pexels-photo-143423.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px) brightness(0.2)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={step === 1 ? onBack : () => setStep(1)}
            className="text-white text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Atrás
          </button>
          <div className="flex gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${s <= step ? 'bg-emerald-500' : 'bg-slate-700'}`}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-white text-2xl font-bold mb-1">
          {step === 1 ? 'Crea tu cuenta' : 'Tu perfil'}
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          {step === 1 ? 'Paso 1 de 2 - Datos personales' : 'Paso 2 de 2 - Información de juego'}
        </p>

        {/* Step 1: Personal Data */}
        {step === 1 && (
          <div className="space-y-5 animate-fadeIn">
            {/* Avatar preview */}
            <div className="flex justify-center mb-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
                style={{
                  background: selectedPosition
                    ? `linear-gradient(135deg, ${selectedPosition.color}40, ${selectedPosition.color}20)`
                    : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  border: selectedPosition
                    ? `2px solid ${selectedPosition.color}`
                    : '2px solid rgba(255,255,255,0.2)',
                  color: selectedPosition ? selectedPosition.color : '#fff',
                }}
              >
                {getInitials()}
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider block mb-2">
                Nombre de usuario
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: errors.username ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                placeholder="Tu apodo en el campo"
                onFocus={(e) => e.target.style.borderColor = '#10b981'}
                onBlur={(e) => e.target.style.borderColor = errors.username ? '#ef4444' : 'rgba(255,255,255,0.1)'}
              />
              {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: errors.email ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                placeholder="tu@email.com"
                onFocus={(e) => e.target.style.borderColor = '#10b981'}
                onBlur={(e) => e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(255,255,255,0.1)'}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider block mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: errors.password ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                placeholder="Mínimo 6 caracteres"
                onFocus={(e) => e.target.style.borderColor = '#10b981'}
                onBlur={(e) => e.target.style.borderColor = errors.password ? '#ef4444' : 'rgba(255,255,255,0.1)'}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider block mb-2">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: errors.confirmPassword ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                placeholder="Repite tu contraseña"
                onFocus={(e) => e.target.style.borderColor = '#10b981'}
                onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : 'rgba(255,255,255,0.1)'}
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl font-semibold text-sm tracking-wide mt-8 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
              }}
            >
              Continuar
            </button>

            {/* Switch to login */}
            <p className="text-center text-slate-500 text-sm mt-6">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => setStep(3)}
                className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        )}

        {/* Step 2: Game Info */}
        {step === 2 && (
          <div className="animate-fadeIn">
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
                style={{
                  background: selectedPosition
                    ? `linear-gradient(135deg, ${selectedPosition.color}40, ${selectedPosition.color}20)`
                    : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  border: selectedPosition
                    ? `2px solid ${selectedPosition.color}`
                    : '2px solid rgba(255,255,255,0.2)',
                  color: selectedPosition ? selectedPosition.color : '#fff',
                }}
              >
                {getInitials()}
              </div>
              <div>
                <p className="text-white font-semibold text-lg">{formData.username}</p>
                <p className="text-slate-400 text-sm">{formData.email}</p>
              </div>
            </div>

            {/* City */}
            <div className="mb-6">
              <label className="text-slate-400 text-xs uppercase tracking-wider block mb-2">
                Ciudad
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none transition-all"
                style={{ borderColor: errors.city ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                placeholder="¿Dónde juegas?"
                onFocus={(e) => e.target.style.borderColor = '#10b981'}
                onBlur={(e) => e.target.style.borderColor = errors.city ? '#ef4444' : 'rgba(255,255,255,0.1)'}
              />
              {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
            </div>

            {/* Position selector - FUT style */}
            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider block mb-4">
                Posición favorita
              </label>
              <div className="grid grid-cols-2 gap-3">
                {positions.map((pos) => {
                  const isSelected = formData.position === pos.id;
                  return (
                    <button
                      key={pos.id}
                      onClick={() => setFormData({ ...formData, position: pos.id })}
                      className="relative p-4 rounded-xl transition-all duration-300 group"
                      style={{
                        background: isSelected
                          ? `linear-gradient(135deg, ${pos.color}30, ${pos.color}10)`
                          : 'rgba(255,255,255,0.03)',
                        border: isSelected
                          ? `2px solid ${pos.color}`
                          : '2px solid rgba(255,255,255,0.1)',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      }}
                    >
                      {/* Position card */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg"
                          style={{
                            background: `linear-gradient(135deg, ${pos.color}40, ${pos.color}20)`,
                            color: pos.color,
                          }}
                        >
                          {pos.id}
                        </div>
                        <div className="text-left">
                          <p className="text-white text-sm font-semibold">{pos.label}</p>
                          <p className="text-slate-500 text-xs">Posición</p>
                        </div>
                      </div>

                      {/* Selection indicator */}
                      {isSelected && (
                        <div
                          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: pos.color }}
                        >
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {errors.position && <p className="text-red-400 text-xs mt-2">{errors.position}</p>}
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-sm tracking-wide mt-10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creando jugador...
                </span>
              ) : (
                'ENTRAR AL CAMPO'
              )}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
