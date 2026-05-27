import { useState } from 'react';
import { User, Settings, Bell, Shield, ChevronRight, Award, Target, Zap, Star } from 'lucide-react';

const achievements = [
  { icon: <Award size={18} color="#f59e0b" />, title: 'Primer Gol', desc: 'Marcaste tu primer gol', unlocked: true },
  { icon: <Target size={18} color="#10b981" />, title: 'Hat-Trick', desc: '3 goles en un partido', unlocked: true },
  { icon: <Zap size={18} color="#3b82f6" />, title: 'Racha de 5', desc: '5 victorias seguidas', unlocked: false },
  { icon: <Star size={18} color="#a855f7" />, title: 'MVP de la Liga', desc: 'Mejor valoración de la temporada', unlocked: false },
];

const menuItems = [
  { icon: <Bell size={18} color="#f59e0b" />, label: 'Notificaciones', sub: 'Partidos y actualizaciones' },
  { icon: <Shield size={18} color="#3b82f6" />, label: 'Mi Equipo', sub: 'Gestiona tu equipo amateur' },
  { icon: <Settings size={18} color="#6b7280" />, label: 'Configuración', sub: 'Preferencias de la app' },
];

export default function ProfilePage() {
  const [notifs, setNotifs] = useState(true);

  return (
    <div className="min-h-screen pb-20" style={{ background: '#0a0a0f', paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0f1a, #1a1a2e)' }}>
        <div className="px-4 pt-10 pb-8 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center font-black text-3xl"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0f0f1a', boxShadow: '0 0 0 4px rgba(245,158,11,0.15), 0 4px 20px rgba(245,158,11,0.3)' }}>
              JG
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#10b981', border: '2px solid #0a0a0f' }}>
              <User size={14} color="#fff" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white mt-4">Jugador Amateur</h2>
          <p className="text-gray-400 text-sm mt-1">Liga Amateur Madrid &bull; Temporada 2025/26</p>

          {/* Stats row */}
          <div className="flex gap-4 mt-6">
            {[
              { label: 'Partidos', value: '22' },
              { label: 'Goles', value: '11' },
              { label: 'Asistencias', value: '7' },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center px-4 py-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-2xl font-black text-amber-400">{s.value}</span>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 space-y-5 mt-5">
        {/* My card */}
        <section>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Mi Carta FUT</h3>
          <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: 'linear-gradient(135deg, #b8902a, #f5d06e, #c9921c)', boxShadow: '0 4px 20px rgba(245,158,11,0.2)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl" style={{ background: 'rgba(0,0,0,0.2)', color: '#3d2200', border: '2px solid rgba(255,255,255,0.2)' }}>
              JG
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black" style={{ color: '#3d2200' }}>82</span>
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: '#4a2e00', opacity: 0.7 }}>GOLD</span>
              </div>
              <p className="font-black text-sm uppercase" style={{ color: '#3d2200' }}>JUGADOR</p>
              <p className="text-xs font-bold" style={{ color: '#4a2e00', opacity: 0.7 }}>CAM &bull; España</p>
            </div>
            <div className="ml-auto grid grid-cols-2 gap-x-3 gap-y-0.5">
              {[['78', 'PAC'], ['80', 'TIR'], ['85', 'PAS'], ['82', 'REG'], ['55', 'DEF'], ['74', 'FIS']].map(([v, l]) => (
                <div key={l} className="flex items-center gap-1">
                  <span className="text-xs font-black" style={{ color: '#3d2200' }}>{v}</span>
                  <span className="text-[9px] font-bold" style={{ color: '#4a2e00', opacity: 0.7 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Logros</h3>
          <div className="grid grid-cols-2 gap-2">
            {achievements.map(a => (
              <div key={a.title} className="rounded-2xl p-3 flex items-center gap-3"
                style={{ background: a.unlocked ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${a.unlocked ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`, opacity: a.unlocked ? 1 : 0.4 }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  {a.icon}
                </div>
                <div>
                  <p className="text-white text-xs font-bold">{a.title}</p>
                  <p className="text-gray-500 text-[10px] leading-tight">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Menu */}
        <section>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Ajustes</h3>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            {menuItems.map((item, idx) => (
              <div key={item.label} className={`flex items-center gap-3 px-4 py-3.5 ${idx < menuItems.length - 1 ? 'border-b border-white/5' : ''}`}
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-bold">{item.label}</p>
                  <p className="text-gray-500 text-xs">{item.sub}</p>
                </div>
                {item.label === 'Notificaciones' ? (
                  <button onClick={() => setNotifs(!notifs)}
                    className="w-11 h-6 rounded-full transition-all duration-200 relative"
                    style={{ background: notifs ? '#f59e0b' : 'rgba(255,255,255,0.1)' }}>
                    <div className="absolute top-0.5 transition-all duration-200 w-5 h-5 rounded-full bg-white shadow"
                      style={{ left: notifs ? 24 : 2 }} />
                  </button>
                ) : (
                  <ChevronRight size={16} color="#4b5563" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Version */}
        <div className="text-center pb-4">
          <p className="text-gray-700 text-xs font-semibold">FUTAmateur v1.0.0 &bull; EA Sports FC Amateur</p>
        </div>
      </div>
    </div>
  );
}
