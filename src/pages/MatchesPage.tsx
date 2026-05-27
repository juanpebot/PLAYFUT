import { useEffect, useState } from 'react';
import { MapPin, Clock, CheckCircle, Radio } from 'lucide-react';
import { supabase, Match, MatchStatus } from '../lib/supabase';
import TeamBadge from '../components/TeamBadge';

const statusFilters: { id: string; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'scheduled', label: 'Próximos' },
  { id: 'live', label: 'En Vivo' },
  { id: 'finished', label: 'Jugados' },
];

const statusConfig: Record<MatchStatus, { label: string; color: string; bg: string }> = {
  scheduled: { label: 'Programado', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  live: { label: 'En Vivo', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
  finished: { label: 'Final', color: '#6b7280', bg: 'rgba(107,114,128,0.12)' },
  cancelled: { label: 'Cancelado', color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
};

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('matches')
      .select('*, home_team:teams!matches_home_team_id_fkey(*), away_team:teams!matches_away_team_id_fkey(*)')
      .order('match_date', { ascending: true })
      .then(({ data }) => { setMatches((data as Match[]) || []); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? matches : matches.filter(m => m.status === filter);

  const formatDate = (d: string) => new Date(d).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  const formatTime = (d: string) => new Date(d).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  const groupByDate = (list: Match[]) => {
    const groups: Record<string, Match[]> = {};
    list.forEach(m => {
      const key = formatDate(m.match_date);
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });
    return groups;
  };

  const groups = groupByDate(filtered);

  return (
    <div className="min-h-screen pb-20" style={{ background: '#0a0a0f', paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Header */}
      <div className="px-4 pt-8 pb-4" style={{ background: 'linear-gradient(to bottom, #0f0f1a, #0a0a0f)' }}>
        <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-1">Partidos</h1>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">Liga Amateur 2025/26</p>

        {/* Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
          {statusFilters.map(sf => (
            <button key={sf.id} onClick={() => setFilter(sf.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 ${filter === sf.id ? 'text-black' : 'text-gray-400'}`}
              style={{ background: filter === sf.id ? '#f59e0b' : 'rgba(255,255,255,0.05)' }}>
              {sf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-28 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />)
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="font-bold text-lg">Sin partidos</p>
            <p className="text-sm mt-1">No hay partidos en esta categoría</p>
          </div>
        ) : Object.entries(groups).map(([date, dayMatches]) => (
          <div key={date}>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 capitalize">{date}</h3>
            <div className="space-y-3">
              {dayMatches.map(m => {
                const cfg = statusConfig[m.status] || statusConfig.scheduled;
                return (
                  <div key={m.id} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {/* Competition + Status bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{m.competition}</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ background: cfg.bg }}>
                        {m.status === 'live' ? <Radio size={10} color={cfg.color} /> :
                         m.status === 'finished' ? <CheckCircle size={10} color={cfg.color} /> :
                         <Clock size={10} color={cfg.color} />}
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: cfg.color }}>{cfg.label}</span>
                      </div>
                    </div>

                    {/* Match */}
                    <div className="px-4 py-4 flex items-center gap-2">
                      {/* Home */}
                      <div className="flex flex-col items-center gap-2 flex-1">
                        {m.home_team && <TeamBadge team={m.home_team} size={44} />}
                        <span className="text-white text-xs font-bold text-center leading-tight max-w-[80px]">{m.home_team?.name}</span>
                      </div>

                      {/* Score / VS */}
                      <div className="flex flex-col items-center gap-1 px-2">
                        {m.status === 'finished' ? (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-black text-white">{m.home_score}</span>
                              <span className="text-gray-500 font-black text-xl">-</span>
                              <span className="text-3xl font-black text-white">{m.away_score}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="text-amber-400 font-black text-lg tracking-widest">VS</span>
                            <span className="text-gray-500 text-[11px] font-semibold">{formatTime(m.match_date)}</span>
                          </>
                        )}
                      </div>

                      {/* Away */}
                      <div className="flex flex-col items-center gap-2 flex-1">
                        {m.away_team && <TeamBadge team={m.away_team} size={44} />}
                        <span className="text-white text-xs font-bold text-center leading-tight max-w-[80px]">{m.away_team?.name}</span>
                      </div>
                    </div>

                    {/* Location */}
                    {m.location && (
                      <div className="flex items-center gap-1.5 px-4 pb-3">
                        <MapPin size={11} color="#6b7280" />
                        <span className="text-[11px] text-gray-500 font-semibold">{m.location}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
