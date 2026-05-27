import { useCallback, useEffect, useState } from 'react';
import { Home, Trophy, Calendar, User } from 'lucide-react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import HomeScreen from './screens/HomeScreen';
import MatchesScreen from './screens/MatchesScreen';
import RankingScreen from './screens/RankingScreen';
import ProfileScreen from './screens/ProfileScreen';
import PremiumSplash from './components/PremiumSplash';
import WelcomeScreen from './components/WelcomeScreen';
import RegisterScreen from './components/RegisterScreen';

type Tab = 'home' | 'matches' | 'ranking' | 'profile';
type AppScreen = 'splash' | 'welcome' | 'login' | 'register' | 'main';

const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: 'home', label: 'Inicio', Icon: Home },
  { id: 'matches', label: 'Partidos', Icon: Calendar },
  { id: 'ranking', label: 'Ranking', Icon: Trophy },
  { id: 'profile', label: 'Perfil', Icon: User },
];

function AppContent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showSplash, setShowSplash] = useState(true);

  // Handle initial routing based on auth state
  useEffect(() => {
    if (!isLoading) {
      if (showSplash) {
        // Let splash complete first
        return;
      }

      if (isAuthenticated && user) {
        setCurrentScreen('main');
      } else {
        setCurrentScreen('welcome');
      }
    }
  }, [isLoading, isAuthenticated, user, showSplash]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleLogin = useCallback(() => {
    setCurrentScreen('login');
  }, []);

  const handleCreateAccount = useCallback(() => {
    setCurrentScreen('register');
  }, []);

  const handleBackToWelcome = useCallback(() => {
    setCurrentScreen('welcome');
  }, []);

  // Show loading screen during auth check
  if (isLoading && !showSplash) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold animate-pulse"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
            }}
          >
            PF
          </div>
        </div>
      </div>
    );
  }

  // Splash screen
  if (showSplash) {
    return <PremiumSplash onComplete={handleSplashComplete} />;
  }

  // Welcome screen
  if (currentScreen === 'welcome' && !isAuthenticated) {
    return <WelcomeScreen onLogin={handleLogin} onCreateAccount={handleCreateAccount} />;
  }

  // Login screen
  if (currentScreen === 'login' && !isAuthenticated) {
    return <RegisterScreen onBack={handleBackToWelcome} isLogin={true} />;
  }

  // Registration screen
  if (currentScreen === 'register' && !isAuthenticated) {
    return <RegisterScreen onBack={handleBackToWelcome} />;
  }

  // Main app (authenticated)
  return (
    <div className="min-h-screen bg-black text-white flex justify-center p-4 font-sans">
      <div className="w-full max-w-md rounded-[40px] overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl relative">

        {/* Screen content */}
        <div className="pb-20 overflow-y-auto" style={{ height: 'calc(100dvh - 120px)', maxHeight: '800px' }}>
          {activeTab === 'home' && <HomeScreen userData={user} />}
          {activeTab === 'matches' && <MatchesScreen />}
          {activeTab === 'ranking' && <RankingScreen />}
          {activeTab === 'profile' && <ProfileScreen userData={user} />}
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
                      isActive ? 'bg-emerald-500/20' : ''
                    }`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={`transition-colors duration-200 ${
                        isActive ? 'text-emerald-400' : 'text-zinc-600'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-widest transition-colors duration-200 ${
                      isActive ? 'text-emerald-400 font-bold' : 'text-zinc-600'
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
  );
}

export default function FutmatchPro() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
