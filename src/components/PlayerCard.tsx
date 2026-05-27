import { Player, CardType } from '../lib/supabase';

const cardThemes: Record<CardType, { bg: string; text: string; statText: string; border: string; shine: string }> = {
  gold: {
    bg: 'linear-gradient(145deg, #b8902a 0%, #f5d06e 35%, #e8b840 55%, #c9921c 80%, #a07420 100%)',
    text: '#3d2200',
    statText: '#4a2e00',
    border: '#f5d06e',
    shine: 'rgba(255,240,150,0.35)',
  },
  silver: {
    bg: 'linear-gradient(145deg, #8a8a8a 0%, #d4d4d4 35%, #c0c0c0 55%, #969696 80%, #707070 100%)',
    text: '#1a1a1a',
    statText: '#2a2a2a',
    border: '#d4d4d4',
    shine: 'rgba(255,255,255,0.3)',
  },
  bronze: {
    bg: 'linear-gradient(145deg, #7a4a1e 0%, #c87941 35%, #b8692e 55%, #8c4e1a 80%, #6a3810 100%)',
    text: '#2a0e00',
    statText: '#3a1800',
    border: '#c87941',
    shine: 'rgba(255,200,100,0.3)',
  },
  special: {
    bg: 'linear-gradient(145deg, #0a2a4a 0%, #1a5a8a 30%, #0d7fc4 50%, #0a5a8a 70%, #082040 100%)',
    text: '#e8f4ff',
    statText: '#b8d8f5',
    border: '#0d9ae8',
    shine: 'rgba(100,200,255,0.25)',
  },
  toty: {
    bg: 'linear-gradient(145deg, #1a0a30 0%, #4a1a7a 30%, #7b2dbd 50%, #5a1a9a 70%, #200a40 100%)',
    text: '#f5e8ff',
    statText: '#d5b8ff',
    border: '#a855f7',
    shine: 'rgba(180,100,255,0.3)',
  },
  hero: {
    bg: 'linear-gradient(145deg, #1a0a00 0%, #7a3000 30%, #c84a00 50%, #8a3500 70%, #1a0500 100%)',
    text: '#fff5e8',
    statText: '#ffd5a8',
    border: '#f97316',
    shine: 'rgba(255,150,50,0.3)',
  },
};

const cardLabels: Record<CardType, string> = {
  gold: 'GOLD',
  silver: 'SILVER',
  bronze: 'BRONZE',
  special: 'SPECIAL',
  toty: 'TOTY',
  hero: 'HERO',
};

const positionInitials: Record<string, string> = {
  ST: 'ST', CAM: 'CAM', CM: 'CM', CDM: 'CDM',
  RW: 'RW', LW: 'LW', RB: 'RB', LB: 'LB',
  CB: 'CB', GK: 'GK',
};

interface Props {
  player: Player;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlayerCard({ player, onClick, size = 'md' }: Props) {
  const theme = cardThemes[player.card_type] || cardThemes.gold;
  const label = cardLabels[player.card_type] || 'GOLD';
  const pos = positionInitials[player.position] || player.position;

  const dims = {
    sm: { w: 120, h: 168, overall: 'text-3xl', name: 'text-xs', stat: 'text-[9px]', pos: 'text-[9px]', label: 'text-[7px]', avatar: 36 },
    md: { w: 160, h: 224, overall: 'text-4xl', name: 'text-sm', stat: 'text-[10px]', pos: 'text-[10px]', label: 'text-[8px]', avatar: 48 },
    lg: { w: 200, h: 280, overall: 'text-5xl', name: 'text-base', stat: 'text-xs', pos: 'text-xs', label: 'text-[9px]', avatar: 64 },
  }[size];

  const stats = [
    { label: 'PAC', value: player.pace },
    { label: 'TIR', value: player.shooting },
    { label: 'PAS', value: player.passing },
    { label: 'REG', value: player.dribbling },
    { label: 'DEF', value: player.defending },
    { label: 'FIS', value: player.physical },
  ];

  const initials = player.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div
      onClick={onClick}
      className={`relative select-none ${onClick ? 'cursor-pointer' : ''} transition-transform duration-200 ${onClick ? 'hover:scale-105 active:scale-95' : ''}`}
      style={{ width: dims.w, height: dims.h }}
    >
      {/* Card body */}
      <div
        className="w-full h-full rounded-xl overflow-hidden flex flex-col"
        style={{
          background: theme.bg,
          border: `1.5px solid ${theme.border}`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 ${theme.shine}`,
        }}
      >
        {/* Top section */}
        <div className="flex flex-col items-start px-3 pt-2 pb-1" style={{ flex: '0 0 auto' }}>
          <span className={`font-black leading-none ${dims.overall}`} style={{ color: theme.text, fontFamily: 'system-ui', textShadow: `0 1px 2px rgba(0,0,0,0.3)` }}>
            {player.overall}
          </span>
          <span className={`font-bold uppercase tracking-widest ${dims.pos}`} style={{ color: theme.text, opacity: 0.85 }}>
            {pos}
          </span>
          <span className={`font-bold uppercase tracking-widest ${dims.label} mt-0.5 px-1 rounded`} style={{ background: `rgba(0,0,0,0.2)`, color: theme.text }}>
            {label}
          </span>
        </div>

        {/* Avatar */}
        <div className="flex justify-center items-center" style={{ flex: '0 0 auto', height: dims.avatar + 16 }}>
          <div
            className="flex items-center justify-center rounded-full font-black"
            style={{
              width: dims.avatar,
              height: dims.avatar,
              background: `rgba(0,0,0,0.25)`,
              border: `2px solid ${theme.border}`,
              color: theme.text,
              fontSize: dims.avatar * 0.38,
            }}
          >
            {initials}
          </div>
        </div>

        {/* Name */}
        <div className="text-center px-2" style={{ flex: '0 0 auto' }}>
          <p className={`font-black uppercase tracking-wide leading-tight ${dims.name}`} style={{ color: theme.text }}>
            {player.name.split(' ').slice(-1)[0]}
          </p>
        </div>

        {/* Divider */}
        <div className="mx-3 my-1" style={{ height: 1, background: `rgba(0,0,0,0.2)` }} />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-x-1 gap-y-0.5 px-2 pb-2" style={{ flex: 1 }}>
          {stats.map(s => (
            <div key={s.label} className="flex items-center gap-0.5">
              <span className={`font-black ${dims.stat}`} style={{ color: theme.text }}>{s.value}</span>
              <span className={`font-semibold uppercase ${dims.stat}`} style={{ color: theme.statText, opacity: 0.8 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
