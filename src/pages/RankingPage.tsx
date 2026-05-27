import { useEffect, useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { supabase, Ranking } from '../lib/supabase';
import TeamBadge from '../components/TeamBadge';

const formColors: Record<string, { color: string; bg: string }> = {
  W: { color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  D: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  L: { color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
};

export default function RankingPage() {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('rankings').select('*, teams(*)').order('points', { ascending: false })
      .then(({ data }) => { setRankings((data as Ranking[]) || []); setLoading(false); });
  }, []);

  const medalColor = (pos: number) => {
    if (pos === 1) return '#f59e0b';
    if (pos === 2) return '#9ca3af';
    if (pos === 3) return '#b45309';
    return '#374151';
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: '#0a0a0f', paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0f1a, #1a1505, #0f0f1a)' }}>
        <div className="px-4 pt-8 pb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-1">Clasificación</h1>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">Temporada 2025/26</p>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <Trophy size={22} color="#f59e0b" />
            </div>
          </div>

          {/* Top 3 podium */}
          {!loading && rankings.length >= 3 && (
            <div className="flex items-end justify-center gap-2 mt-8 mb-2">
              {/* 2nd */}
              <div className="flex flex-col items-center gap-2">
                {rankings[1].teams && <TeamBadge team={rankings[1].teams} size={44} />}
                <div className="rounded-xl px-4 flex flex-col items-center justify-center" style={{ height: 56, background: 'rgba(156,163,175,0.12)', border: '1px solid rgba(156,163,175,0.2)' }}>
                  <span className="text-2xl font-black" style={{ color: '#9ca3af' }}>2</span>
                </div>
                <span className="text-xs text-gray-400 font-bold text-center max-w-[64px] leading-tight">{rankings[1].teams?.name?.split(' ')[0]}</span>
                <span className="text-amber-400 text-sm font-black">{rankings[1].points}pts</span>
              </div>
              {/* 1st */}
              <div className="flex flex-col items-center gap-2 -mt-4">
                {rankings[0].teams && <TeamBadge team={rankings[0].teams} size={56} />}
                <div className="rounded-xl px-5 flex flex-col items-center justify-center" style={{ height: 72, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' }}>
                  <Trophy size={16} color="#f59e0b" />
                  <span className="text-3xl font-black text-amber-400">1</span>
                </div>
                <span className="text-xs text-white font-bold text-center max-w-[72px] leading-tight">{rankings[0].teams?.name?.split(' ')[0]}</span>
                <span className="text-amber-400 text-sm font-black">{rankings[0].points}pts</span>
              </div>
              {/* 3rd */}
              <div className="flex flex-col items-center gap-2">
                {rankings[2].teams && <TeamBadge team={rankings[2].teams} size={44} />}
                <div className="rounded-xl px-4 flex flex-col items-center justify-center" style={{ height: 44, background: 'rgba(180,83,9,0.12)', border: '1px solid rgba(180,83,9,0.2)' }}>
                  <span className="text-2xl font-black" style={{ color: '#b45309' }}>3</span>
                </div>
                <span className="text-xs text-gray-400 font-bold text-center max-w-[64px] leading-tight">{rankings[2].teams?.name?.split(' ')[0]}</span>
                <span className="text-amber-400 text-sm font-black">{rankings[2].points}pts</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="px-4 mt-4">
        {/* Header row */}
        <div className="flex items-center gap-2 px-3 py-2 mb-1">
          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider w-5 text-center">#</span>
          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider flex-1 ml-10">Equipo</span>
          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider w-6 text-center">PJ</span>
          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider w-6 text-center">G</span>
          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider w-6 text-center">E</span>
          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider w-6 text-center">P</span>
          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider w-8 text-center">DG</span>
          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider w-8 text-center">PTS</span>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          {loading ? (
            [1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="h-14 animate-pulse border-b border-white/5 last:border-0" style={{ background: 'rgba(255,255,255,0.03)' }} />
            ))
          ) : rankings.map((r, idx) => {
            const team = r.teams;
            const gd = (team?.goals_for || 0) - (team?.goals_against || 0);
            const pj = (team?.wins || 0) + (team?.draws || 0) + (team?.losses || 0);
            const formLetters = r.form.split('');
            const isTop = idx < 3;
            return (
              <div key={r.id}
                className={`flex items-center gap-2 px-3 py-2.5 ${idx < rankings.length - 1 ? 'border-b border-white/5' : ''} transition-colors`}
                style={{ background: isTop ? `rgba(245,158,11,0.${4 - idx})` : 'rgba(255,255,255,0.02)' }}>
                <span className="text-sm font-black w-5 text-center" style={{ color: medalColor(r.position) }}>{r.position}</span>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {team && <TeamBadge team={team} size={30} />}
                  <div className="min-w-0">
                    <p className="text-white text-xs font-bold truncate">{team?.name}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {formLetters.slice(-5).map((f, i) => (
                        <span key={i} className="w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[8px] font-black"
                          style={{ background: formColors[f]?.bg || 'rgba(255,255,255,0.1)', color: formColors[f]?.color || '#fff' }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-gray-400 text-xs font-semibold w-6 text-center">{pj}</span>
                <span className="text-green-400 text-xs font-semibold w-6 text-center">{team?.wins}</span>
                <span className="text-amber-400 text-xs font-semibold w-6 text-center">{team?.draws}</span>
                <span className="text-red-400 text-xs font-semibold w-6 text-center">{team?.losses}</span>
                <div className="flex items-center gap-0.5 w-8 justify-center">
                  {gd > 0 ? <TrendingUp size={10} color="#10b981" /> : gd < 0 ? <TrendingDown size={10} color="#ef4444" /> : <Minus size={10} color="#6b7280" />}
                  <span className={`text-xs font-bold ${gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-gray-500'}`}>{gd > 0 ? `+${gd}` : gd}</span>
                </div>
                <span className="text-amber-400 text-sm font-black w-8 text-center">{r.points}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-3 px-1">
          {[{ color: '#f59e0b', label: 'Zona Champions' }, { color: '#ef4444', label: 'Descenso' }].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color, opacity: 0.5 }} />
              <span className="text-[10px] text-gray-500 font-semibold">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
