import { useEffect, useState } from 'react';
import { Zap, TrendingUp, Calendar, Star } from 'lucide-react';
import { supabase, Player, Match, Ranking } from '../lib/supabase';
import PlayerCard from '../components/PlayerCard';
import TeamBadge from '../components/TeamBadge';

interface Props {
  onNavigate: (tab: 'home' | 'cards' | 'matches' | 'ranking' | 'profile') => void;
}

export default function HomePage({ onNavigate }: Props) {
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [nextMatches, setNextMatches] = useState<Match[]>([]);
  const [topRanking, setTopRanking] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: players }, { data: matches }, { data: rankings }] = await Promise.all([
        supabase.from('players').select('*, teams(*)').order('overall', { ascending: false }).limit(4),
        supabase.from('matches').select('*, home_team:teams!matches_home_team_id_fkey(*), away_team:teams!matches_away_team_id_fkey(*)').eq('status', 'scheduled').order('match_date').limit(3),
        supabase.from('rankings').select('*, teams(*)').order('points', { ascending: false }).limit(3),
      ]);
      setTopPlayers((players as Player[]) || []);
      setNextMatches((matches as Match[]) || []);
      setTopRanking((rankings as Ranking[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: '#0a0a0f' }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)', paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="relative px-4 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mb-1">EA Sports FC Amateur</p>
              <h1 className="text-3xl font-black text-white leading-none">FUT<span className="text-amber-400">Amateur</span></h1>
              <p className="text-gray-400 text-sm mt-1">Temporada 2025/26</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 4px 20px rgba(245,158,11,0.4)' }}>
                <Star size={28} color="#0f0f1a" fill="#0f0f1a" strokeWidth={0} />
              </div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Liga</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { label: 'Equipos', value: '8', icon: <Zap size={14} color="#f59e0b" /> },
              { label: 'Jugadores', value: '12+', icon: <TrendingUp size={14} color="#10b981" /> },
              { label: 'Partidos', value: '7', icon: <Calendar size={14} color="#3b82f6" /> },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 flex flex-col gap-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-1.5">{s.icon}<span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{s.label}</span></div>
                <span className="text-2xl font-black text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6 mt-6">
        {/* Top Players */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-black text-lg uppercase tracking-wider">Top Jugadores</h2>
            <button onClick={() => onNavigate('cards')} className="text-amber-400 text-xs font-bold uppercase tracking-wider">Ver todos</button>
          </div>
          {loading ? (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map(i => <div key={i} className="rounded-xl animate-pulse flex-shrink-0" style={{ width: 120, height: 168, background: 'rgba(255,255,255,0.05)' }} />)}
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {topPlayers.map(p => <PlayerCard key={p.id} player={p} size="sm" onClick={() => onNavigate('cards')} />)}
            </div>
          )}
        </section>

        {/* Next Matches */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-black text-lg uppercase tracking-wider">Próximos Partidos</h2>
            <button onClick={() => onNavigate('matches')} className="text-amber-400 text-xs font-bold uppercase tracking-wider">Ver todos</button>
          </div>
          <div className="space-y-2">
            {loading ? (
              [1, 2].map(i => <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />)
            ) : nextMatches.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No hay partidos programados</p>
            ) : nextMatches.map(m => (
              <div key={m.id} className="rounded-xl p-3 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    {m.home_team && <TeamBadge team={m.home_team} size={32} />}
                    <span className="text-white text-sm font-bold truncate max-w-[80px]">{m.home_team?.name?.split(' ')[0]}</span>
                  </div>
                  <div className="flex flex-col items-center px-2">
                    <span className="text-amber-400 font-black text-xs">VS</span>
                    <span className="text-gray-500 text-[10px] font-semibold">{formatDate(m.match_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className="text-white text-sm font-bold truncate max-w-[80px] text-right">{m.away_team?.name?.split(' ')[0]}</span>
                    {m.away_team && <TeamBadge team={m.away_team} size={32} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Ranking */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-black text-lg uppercase tracking-wider">Clasificación</h2>
            <button onClick={() => onNavigate('ranking')} className="text-amber-400 text-xs font-bold uppercase tracking-wider">Ver todo</button>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="h-14 animate-pulse border-b border-white/5 last:border-0" style={{ background: 'rgba(255,255,255,0.02)' }} />)
            ) : topRanking.map((r, idx) => (
              <div key={r.id} className={`flex items-center gap-3 px-4 py-3 ${idx < topRanking.length - 1 ? 'border-b border-white/5' : ''}`}>
                <span className={`text-sm font-black w-5 text-center ${idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-gray-300' : 'text-amber-700'}`}>{r.position}</span>
                {r.teams && <TeamBadge team={r.teams} size={32} />}
                <span className="text-white font-bold flex-1 text-sm truncate">{r.teams?.name}</span>
                <span className="text-amber-400 font-black text-base">{r.points}<span className="text-gray-500 text-xs font-normal ml-0.5">pts</span></span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
