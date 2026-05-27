import { useState } from 'react';
import { Settings, Bell, Shield, LogOut, ChevronRight, Share2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types/auth';

interface Props {
  userData?: User | null;
}

const achievements = [
  { id: 1, title: 'Primer Gol', desc: 'Marca tu primer gol', unlocked: true, icon: '⚽' },
  { id: 2, title: 'Hat-Trick', desc: '3 goles en un partido', unlocked: false, icon: '🎯' },
  { id: 3, title: 'MVP', desc: 'Mejor jugador del partido', unlocked: false, icon: '⭐' },
  { id: 4, title: 'Victorioso', desc: '10 victorias', unlocked: false, icon: '🏆' },
  { id: 5, title: 'Leyenda', desc: '100 partidos jugados', unlocked: false, icon: '👑' },
  { id: 6, title: 'Asistente', desc: '50 asistencias', unlocked: false, icon: '🎯' },
];

const menuItems = [
  { id: 'notifications', icon: Bell, label: 'Notificaciones', desc: 'Gestiona tus alertas' },
  { id: 'privacy', icon: Shield, label: 'Privacidad', desc: 'Controla tu visibilidad' },
  { id: 'settings', icon: Settings, label: 'Configuracion', desc: 'Preferencias de la app' },
];

export default function ProfileScreen({ userData }: Props) {
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const profileData = {
    name: userData?.username || 'Jugador',
    email: userData?.email || 'jugador@email.com',
    avatar: userData?.avatar || '??',
    position: userData?.position || 'MED',
    city: userData?.city || 'Madrid',
    rating: userData?.rating || 75,
    level: userData?.level || 'BRONCE',
    memberSince: userData?.memberSince || 'Mayo 2026',
    stats: userData?.stats || {
      matches: 0,
      wins: 0,
      goals: 0,
      mvp: 0,
      assists: 0,
    },
    cardStats: userData?.cardStats || {
      VEL: 75,
      TIR: 72,
      PAS: 70,
      REG: 68,
      FIS: 71,
      DEF: 65,
    },
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 border-b border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-700 flex items-center justify-center text-3xl font-black text-black border-2 border-emerald-300 shadow-lg shadow-emerald-500/30">
            {profileData.avatar}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-black text-white">{profileData.name}</h1>
            <p className="text-xs text-zinc-500 mt-0.5">{profileData.email}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="bg-gradient-to-r from-amber-600 to-amber-700 text-black text-[10px] font-black px-2 py-0.5 rounded-md">
                {profileData.level}
              </span>
              <span className="text-zinc-500 text-xs">{profileData.rating} OVR</span>
              <span className="text-emerald-400 text-xs font-bold">{profileData.position}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mini Card */}
      <div className="px-5 py-4">
        <div
          className="rounded-2xl overflow-hidden p-4 flex items-center gap-4 animate-slideUp"
          style={{
            background: profileData.level === 'BRONCE' ? 'linear-gradient(to bottom right, #d97706, #92400e)' :
                       profileData.level === 'PLATA' ? 'linear-gradient(to bottom right, #94a3b8, #475569)' :
                       profileData.level === 'ORO' ? 'linear-gradient(to bottom right, #fbbf24, #f59e0b)' :
                       'linear-gradient(to bottom right, #a855f7, #7c3aed)',
          }}
        >
          <div className="text-center">
            <div className="text-4xl font-black text-black">{profileData.rating}</div>
            <div className="text-[10px] font-bold text-black/70">OVR</div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-3">
            {Object.entries(profileData.cardStats).slice(0, 6).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="text-lg font-black text-black">{value}</div>
                <div className="text-[9px] font-bold text-black/70">{label}</div>
              </div>
            ))}
          </div>
          <button className="p-2 bg-black/20 rounded-xl hover:bg-black/30 transition-colors">
            <Share2 size={18} color="#000" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <section className="px-5 pb-6 animate-slideUp" style={{ animationDelay: '50ms' }}>
        <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">Estadisticas</h2>
        <div className="grid grid-cols-5 gap-3">
          {Object.entries(profileData.stats).map(([label, value]) => (
            <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-xl font-black text-emerald-400">{value}</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="px-5 pb-6 animate-slideUp" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-500">Logros</h2>
          <span className="text-emerald-400 text-xs font-bold">
            {achievements.filter(a => a.unlocked).length}/{achievements.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-xl p-3 text-center transition-all duration-200 ${
                achievement.unlocked
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-zinc-900/50 border border-white/5 opacity-40'
              }`}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <p className="text-[10px] font-bold text-white truncate">{achievement.title}</p>
              <p className="text-[9px] text-zinc-500 truncate">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="px-5 pb-8 animate-slideUp" style={{ animationDelay: '150ms' }}>
        <div className="rounded-2xl overflow-hidden border border-white/10">
          {menuItems.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-4 hover:bg-white/5 transition-colors cursor-pointer ${
                idx < menuItems.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                <item.icon size={18} color="#10b981" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{item.label}</p>
                <p className="text-zinc-500 text-xs">{item.desc}</p>
              </div>
              {item.id === 'notifications' ? (
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-7 rounded-full transition-all duration-200 relative ${
                    notifications ? 'bg-emerald-500' : 'bg-zinc-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all duration-200 ${
                      notifications ? 'left-5.5' : 'left-0.5'
                    }`}
                    style={{ left: notifications ? '22px' : '2px' }}
                  />
                </button>
              ) : (
                <ChevronRight size={18} color="#6b7280" />
              )}
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          <span className="font-bold text-sm">Cerrar Sesion</span>
        </button>
      </section>

      {/* Footer */}
      <div className="px-5 pb-6 text-center">
        <p className="text-zinc-700 text-xs">PlayFUT v1.0.0</p>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div
            className="w-full max-w-sm rounded-2xl overflow-hidden animate-fadeIn"
            style={{
              background: 'linear-gradient(to bottom, #1f2937, #111827)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <LogOut size={32} color="#ef4444" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Cerrar Sesion</h3>
              <p className="text-slate-400 text-sm mb-8">
                ¿Estas seguro de que quieres cerrar sesion? Tendras que volver a iniciar sesion.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: '#fff',
                  }}
                >
                  Cerrar Sesion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
