import { useState, useCallback } from 'react';
import { Home, Trophy, Calendar, User } from 'lucide-react';
import HomeScreen from './screens/HomeScreen';
import MatchesScreen from './screens/MatchesScreen';
import RankingScreen from './screens/RankingScreen';
import ProfileScreen from './screens/ProfileScreen';
import SplashScreen from './components/SplashScreen';

type Tab = 'home' | 'matches' | 'ranking' | 'profile';

const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: 'home', label: 'Inicio', Icon: Home },
  { id: 'matches', label: 'Partidos', Icon: Calendar },
  { id: 'ranking', label: 'Ranking', Icon: Trophy },
  { id: 'profile', label: 'Perfil', Icon: User },
];

export default function FutmatchPro() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <div className={`min-h-screen bg-black text-white flex justify-center p-4 font-sans transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full max-w-md rounded-[40px] overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl relative">

          {/* Screen content */}
          <div className="pb-20 overflow-y-auto" style={{ height: 'calc(100dvh - 120px)', maxHeight: '800px' }}>
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'matches' && <MatchesScreen />}
            {activeTab === 'ranking' && <RankingScreen />}
            {activeTab === 'profile' && <ProfileScreen />}
          </div>

          {/* Bottom Navigation */}
          <nav className="absolute bottom-0 left-0 right-0 bg-zinc-950 border-t border-white/10 px-4 py-2 rounded-b-[40px]">
            <div className="flex items-center justify-around">
              {tabs.map(({ id, label, Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className="flex flex-col items-center gap-1 py-2 px-4 transition-all duration-200"
                  >
                    <div
                      className={`p-2 rounded-xl transition-all duration-200 ${
                        isActive ? 'bg-green-500/20' : ''
                      }`}
                    >
                      <Icon
                        size={20}
                        strokeWidth={isActive ? 2.5 : 2}
                        className={`transition-colors duration-200 ${
                          isActive ? 'text-green-400' : 'text-zinc-600'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-widest transition-colors duration-200 ${
                        isActive ? 'text-green-400 font-bold' : 'text-zinc-600'
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
