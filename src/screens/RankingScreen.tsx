import { useState } from 'react';
import { Trophy, Medal, TrendingUp, TrendingDown, Minus, Crown } from 'lucide-react';

const rankings = [
  { rank: 1, name: 'Javier Solis', rating: 91, wins: 70, goals: 2, form: 'WWW', trend: 'up', avatar: 'JS', level: 'LEYENDA', streak: '+5' },
  { rank: 2, name: 'Carlos Romero', rating: 88, wins: 62, goals: 47, form: 'WWL', trend: 'up', avatar: 'CR', level: 'ORO', streak: '+3' },
  { rank: 3, name: 'Miguel Torres', rating: 86, wins: 55, goals: 32, form: 'WLW', trend: 'up', avatar: 'MT', level: 'ORO', streak: '+2' },
  { rank: 4, name: 'Ahmed Benali', rating: 82, wins: 49, goals: 9, form: 'LDW', trend: 'down', avatar: 'AB', level: 'PLATA', streak: '-1' },
  { rank: 5, name: 'Laura Perez', rating: 80, wins: 42, goals: 28, form: 'WWD', trend: 'up', avatar: 'LP', level: 'PLATA', streak: '+4' },
  { rank: 6, name: 'Pedro Ruiz', rating: 78, wins: 38, goals: 15, form: 'DLL', trend: 'down', avatar: 'PR', level: 'PLATA', streak: '-2' },
  { rank: 7, name: 'Ana Martinez', rating: 76, wins: 35, goals: 41, form: 'LWW', trend: 'up', avatar: 'AM', level: 'PLATA', streak: '+1' },
  { rank: 8, name: 'Diego Lopez', rating: 74, wins: 31, goals: 19, form: 'DDL', trend: 'down', avatar: 'DL', level: 'BRONCE', streak: '-3' },
  { rank: 9, name: 'Sara Garcia', rating: 72, wins: 28, goals: 24, form: 'WLD', trend: 'same', avatar: 'SG', level: 'BRONCE', streak: '0' },
  { rank: 10, name: 'Raul Navarro', rating: 70, wins: 25, goals: 12, form: 'LLD', trend: 'down', avatar: 'RN', level: 'BRONCE', streak: '-1' },
];

const levelColors: Record<string, { bg: string; text: string; border: string }> = {
  LEYENDA: { bg: 'bg-gradient-to-r from-yellow-400 to-amber-500', text: 'text-black', border: 'border-yellow-300' },
  ORO: { bg: 'bg-gradient-to-r from-yellow-600 to-yellow-400', text: 'text-black', border: 'border-yellow-500' },
  PLATA: { bg: 'bg-gradient-to-r from-gray-400 to-gray-300', text: 'text-black', border: 'border-gray-400' },
  BRONCE: { bg: 'bg-gradient-to-r from-amber-700 to-amber-500', text: 'text-black', border: 'border-amber-600' },
};

const formColors: Record<string, string> = {
  W: 'bg-green-500 text-white',
  L: 'bg-red-500 text-white',
  D: 'bg-yellow-500 text-black',
};

export default function RankingScreen() {
  const [tab, setTab] = useState<'local' | 'friends'>('local');

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 border-b border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase">
              Ranking Semanal
            </p>
            <h1 className="text-2xl font-black tracking-wider text-white mt-1">
              CLASIFICACION
            </h1>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
            <Trophy size={24} color="#000" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-5">
          {[
            { id: 'local' as const, label: 'Local' },
            { id: 'friends' as const, label: 'Amigos' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                tab === id
                  ? 'bg-green-500 text-black'
                  : 'bg-white/5 text-zinc-400 border border-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Podium */}
      <div className="px-5 py-6 bg-gradient-to-b from-zinc-900/50 to-transparent">
        <div className="flex items-end justify-center gap-3">
          {/* 2nd Place */}
          {rankings[1] && (
            <div className="flex flex-col items-center animate-slideUp" style={{ animationDelay: '50ms' }}>
              <div className="relative">
                <div className={`w-16 h-16 rounded-full ${levelColors[rankings[1].level].bg} flex items-center justify-center text-xl font-black ${levelColors[rankings[1].level].text} border-2 ${levelColors[rankings[1].level].border}`}>
                  {rankings[1].avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs font-black text-black border-2 border-zinc-900">
                  2
                </div>
              </div>
              <p className="text-white text-xs font-bold mt-2 max-w-[70px] text-center truncate">
                {rankings[1].name.split(' ')[0]}
              </p>
              <p className="text-2xl font-black text-gray-400">{rankings[1].rating}</p>
            </div>
          )}

          {/* 1st Place */}
          {rankings[0] && (
            <div className="flex flex-col items-center -mt-4 animate-slideUp">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-2xl font-black text-black border-2 border-yellow-300 shadow-lg shadow-yellow-500/40">
                  {rankings[0].avatar}
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <Crown size={20} color="#fbbf24" fill="#fbbf24" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-black text-black border-2 border-zinc-900">
                  1
                </div>
              </div>
              <p className="text-white text-sm font-bold mt-2 max-w-[80px] text-center truncate">
                {rankings[0].name.split(' ')[0]}
              </p>
              <p className="text-3xl font-black text-yellow-400">{rankings[0].rating}</p>
            </div>
          )}

          {/* 3rd Place */}
          {rankings[2] && (
            <div className="flex flex-col items-center animate-slideUp" style={{ animationDelay: '100ms' }}>
              <div className="relative">
                <div className={`w-16 h-16 rounded-full ${levelColors[rankings[2].level].bg} flex items-center justify-center text-xl font-black ${levelColors[rankings[2].level].text} border-2 ${levelColors[rankings[2].level].border}`}>
                  {rankings[2].avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-700 flex items-center justify-center text-xs font-black text-white border-2 border-zinc-900">
                  3
                </div>
              </div>
              <p className="text-white text-xs font-bold mt-2 max-w-[70px] text-center truncate">
                {rankings[2].name.split(' ')[0]}
              </p>
              <p className="text-xl font-black text-amber-700">{rankings[2].rating}</p>
            </div>
          )}
        </div>
      </div>

      {/* Rankings List */}
      <div className="px-5 pb-8">
        <div className="space-y-2">
          {rankings.map((player, idx) => (
            <div
              key={player.rank}
              className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 animate-slideUp ${
                idx === 0
                  ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20'
                  : idx < 3
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-zinc-900/50'
              }`}
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              {/* Rank */}
              <div className={`w-8 text-center text-lg font-black ${
                idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-700' : 'text-zinc-600'
              }`}>
                {player.rank}
              </div>

              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full ${levelColors[player.level].bg} flex items-center justify-center text-sm font-black ${levelColors[player.level].text}`}>
                {player.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm truncate">{player.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-zinc-500 text-xs">{player.wins}V</span>
                  <span className="text-zinc-500 text-xs">{player.goals}G</span>
                </div>
              </div>

              {/* Form */}
              <div className="flex gap-1">
                {player.form.split('').map((f, i) => (
                  <span
                    key={i}
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${formColors[f]}`}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Rating */}
              <div className="flex flex-col items-end">
                <span className={`text-xl font-black ${
                  idx === 0 ? 'text-yellow-400' : idx < 3 ? 'text-white' : 'text-zinc-400'
                }`}>
                  {player.rating}
                </span>
                <div className="flex items-center gap-0.5">
                  {player.trend === 'up' && <TrendingUp size={10} color="#22c55e" />}
                  {player.trend === 'down' && <TrendingDown size={10} color="#ef4444" />}
                  {player.trend === 'same' && <Minus size={10} color="#6b7280" />}
                  <span className={`text-[10px] font-bold ${
                    player.trend === 'up' ? 'text-green-500' : player.trend === 'down' ? 'text-red-500' : 'text-zinc-500'
                  }`}>
                    {player.streak}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
