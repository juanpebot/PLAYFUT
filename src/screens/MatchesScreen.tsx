import { useState } from 'react';
import { MapPin, Users, Clock } from 'lucide-react';
import { Match, MatchLevel, MatchFormat, createInitialMatches } from '../types/match';
import MatchModal from '../components/MatchModal';
import { useAuth } from '../hooks/useAuth';

type FilterType = 'all' | 'today' | 'week';

const levelColors: Record<MatchLevel, string> = {
  Principiante: 'bg-blue-500 text-white',
  Medio: 'bg-yellow-500 text-black',
  Alto: 'bg-red-500 text-white',
  Elite: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
};

const formatLabels: Record<MatchFormat, string> = {
  FS: 'Futbol Sala',
  F7: 'Futbol 7',
  F11: 'Futbol 11',
};

export default function MatchesScreen() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterType>('all');
  const [matches, setMatches] = useState<Match[]>(createInitialMatches());
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const filteredMatches = matches.filter((match) => {
    const matchDate = new Date(match.date);
    const today = new Date();

    if (filter === 'today') {
      return matchDate.toDateString() === today.toDateString();
    }
    if (filter === 'week') {
      const weekFromNow = new Date(Date.now() + 7 * 86400000);
      return matchDate <= weekFromNow;
    }
    return true;
  });

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
  };

  const handleUpdateMatch = (updatedMatch: Match) => {
    setMatches(matches.map((m) => (m.id === updatedMatch.id ? updatedMatch : m)));
    setSelectedMatch(updatedMatch);
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <header className="px-6 pt-8 pb-5 border-b border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <h1 className="text-2xl font-black tracking-wider text-white">Partidos</h1>
        <p className="text-xs tracking-[0.25em] text-zinc-500 uppercase mt-1">
          Encuentra tu proximo partido
        </p>
      </header>

      {/* Filters */}
      <div className="px-5 py-4 border-b border-white/10 bg-zinc-950">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {[
            { id: 'all' as FilterType, label: 'Todos' },
            { id: 'today' as FilterType, label: 'Hoy' },
            { id: 'week' as FilterType, label: 'Esta Semana' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                filter === id
                  ? 'bg-emerald-500 text-black'
                  : 'bg-white/5 text-zinc-400 border border-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Matches List */}
      <div className="p-5 space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 mb-4">No hay partidos disponibles</p>
            <button className="bg-emerald-500 hover:bg-emerald-400 transition text-black px-6 py-3 rounded-xl font-bold">
              Crear Partido
            </button>
          </div>
        ) : (
          filteredMatches.map((match, idx) => {
            const spotsLeft = match.maxPlayers - match.currentPlayers;
            const userInMatch = match.slots.some((s) => s.player?.id === user?.id);

            return (
              <button
                key={match.id}
                onClick={() => handleMatchClick(match)}
                className="w-full text-left bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 active:scale-[0.98] transition-all duration-200"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Match Header */}
                <div className="p-4 border-b border-white/5">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="bg-emerald-500 text-black text-[10px] font-black px-2 py-1 rounded-md tracking-widest">
                          {match.format}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${levelColors[match.level]}`}>
                          {match.level}
                        </span>
                        {userInMatch && (
                          <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Apuntado
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-lg text-white">{match.title}</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-emerald-400 font-black text-lg">{match.price}€</span>
                    </div>
                  </div>
                </div>

                {/* Match Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <MapPin size={14} className="text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{match.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Clock size={14} className="text-emerald-400" />
                      <span>{match.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Users size={14} className="text-emerald-400" />
                      <span>{match.currentPlayers}/{match.maxPlayers}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="text-xs text-slate-500">{formatLabels[match.format]}</div>
                    <div className="text-xs">
                      <span className="text-emerald-400 font-bold">{spotsLeft}</span>
                      <span className="text-zinc-500"> plazas libres</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold">
                    <span>Ver campo y unirse</span>
                    <span>→</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Match Modal */}
      {selectedMatch && (
        <MatchModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onUpdate={handleUpdateMatch}
        />
      )}
    </div>
  );
}
