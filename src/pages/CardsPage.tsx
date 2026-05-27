import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { supabase, Player, CardType } from '../lib/supabase';
import PlayerCard from '../components/PlayerCard';
import StatBar from '../components/StatBar';
import TeamBadge from '../components/TeamBadge';

const positions = ['Todos', 'ST', 'CAM', 'CM', 'CDM', 'RW', 'LW', 'RB', 'LB', 'CB', 'GK'];
const cardTypes: { id: string; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'toty', label: 'TOTY' },
  { id: 'special', label: 'Special' },
  { id: 'hero', label: 'Hero' },
  { id: 'gold', label: 'Gold' },
  { id: 'silver', label: 'Silver' },
  { id: 'bronze', label: 'Bronze' },
];

const statBarColors: Record<string, string> = {
  pace: '#f59e0b',
  shooting: '#ef4444',
  passing: '#3b82f6',
  dribbling: '#10b981',
  defending: '#6366f1',
  physical: '#f97316',
};

export default function CardsPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filtered, setFiltered] = useState<Player[]>([]);
  const [selected, setSelected] = useState<Player | null>(null);
  const [search, setSearch] = useState('');
  const [posFilter, setPosFilter] = useState('Todos');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('players').select('*, teams(*)').order('overall', { ascending: false })
      .then(({ data }) => { setPlayers((data as Player[]) || []); setLoading(false); });
  }, []);

  useEffect(() => {
    let list = players;
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (posFilter !== 'Todos') list = list.filter(p => p.position === posFilter);
    if (typeFilter !== 'all') list = list.filter(p => p.card_type === typeFilter);
    setFiltered(list);
  }, [players, search, posFilter, typeFilter]);

  const statsForPlayer = (p: Player) => [
    { key: 'pace', label: 'PAC', value: p.pace },
    { key: 'shooting', label: 'TIR', value: p.shooting },
    { key: 'passing', label: 'PAS', value: p.passing },
    { key: 'dribbling', label: 'REG', value: p.dribbling },
    { key: 'defending', label: 'DEF', value: p.defending },
    { key: 'physical', label: 'FIS', value: p.physical },
  ];

  return (
    <div className="min-h-screen pb-20" style={{ background: '#0a0a0f', paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Header */}
      <div className="px-4 pt-8 pb-4" style={{ background: 'linear-gradient(to bottom, #0f0f1a, #0a0a0f)' }}>
        <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-1">Jugadores</h1>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">Liga Amateur 2025/26</p>

        {/* Search */}
        <div className="relative mt-4">
          <Search size={16} color="#4b5563" className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar jugador..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-white text-sm font-semibold placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>

        {/* Position filter */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {positions.map(pos => (
            <button key={pos} onClick={() => setPosFilter(pos)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 ${posFilter === pos ? 'text-black' : 'text-gray-400'}`}
              style={{ background: posFilter === pos ? '#f59e0b' : 'rgba(255,255,255,0.05)' }}>
              {pos}
            </button>
          ))}
        </div>

        {/* Card type filter */}
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
          {cardTypes.map(ct => (
            <button key={ct.id} onClick={() => setTypeFilter(ct.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 ${typeFilter === ct.id ? 'text-black' : 'text-gray-400'}`}
              style={{ background: typeFilter === ct.id ? '#f59e0b' : 'rgba(255,255,255,0.05)' }}>
              {ct.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-4">
        {loading ? (
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3,4,5,6].map(i => <div key={i} className="rounded-xl animate-pulse" style={{ height: 168, background: 'rgba(255,255,255,0.05)' }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="font-bold text-lg">Sin resultados</p>
            <p className="text-sm mt-1">Prueba otros filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {filtered.map(p => (
              <div key={p.id} className="flex justify-center">
                <PlayerCard player={p} size="sm" onClick={() => setSelected(p)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setSelected(null)}
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-md rounded-t-3xl p-6 pb-8" onClick={e => e.stopPropagation()}
            style={{ background: 'linear-gradient(to bottom, #151520, #0f0f1a)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white">{selected.name}</h2>
                <p className="text-gray-400 text-sm">{selected.position} &bull; {selected.nationality}</p>
                {selected.teams && (
                  <div className="flex items-center gap-2 mt-2">
                    <TeamBadge team={selected.teams} size={24} />
                    <span className="text-gray-300 text-sm font-semibold">{selected.teams.name}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <PlayerCard player={selected} size="sm" />
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <X size={16} color="#9ca3af" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2.5 mb-6">
              {statsForPlayer(selected).map(s => (
                <StatBar key={s.key} label={s.label} value={s.value} color={statBarColors[s.key] || '#f59e0b'} />
              ))}
            </div>

            {/* Match stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Goles', value: selected.goals },
                { label: 'Asistencias', value: selected.assists },
                { label: 'Partidos', value: selected.matches_played },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-2xl font-black text-amber-400">{s.value}</p>
                  <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
