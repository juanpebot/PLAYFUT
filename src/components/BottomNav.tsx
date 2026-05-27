import { Home, CreditCard, Calendar, Trophy, User } from 'lucide-react';

type Tab = 'home' | 'cards' | 'matches' | 'ranking' | 'profile';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: 'home', label: 'Inicio', Icon: Home },
  { id: 'cards', label: 'Jugadores', Icon: CreditCard },
  { id: 'matches', label: 'Partidos', Icon: Calendar },
  { id: 'ranking', label: 'Ranking', Icon: Trophy },
  { id: 'profile', label: 'Perfil', Icon: User },
];

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/5"
      style={{ background: 'linear-gradient(to top, #0a0a0f, #111118)', height: 64, paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-150 focus:outline-none"
          >
            <div className={`flex items-center justify-center rounded-lg transition-all duration-150 ${isActive ? 'bg-amber-400/15' : ''}`} style={{ width: 36, height: 28 }}>
              <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 1.8} color={isActive ? '#f59e0b' : '#4b5563'} />
            </div>
            <span className={`text-[10px] font-semibold uppercase tracking-wider transition-colors duration-150 ${isActive ? 'text-amber-400' : 'text-gray-600'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
