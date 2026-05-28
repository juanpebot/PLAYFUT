import { Player, positionColors } from '../types/match';

interface Props {
  players: Player[];
  substitutes: Player[];
  organizerId?: string;
}

export default function MatchPlayersList({ players, substitutes, organizerId }: Props) {
  const allPlayers = [...players, ...substitutes.slice(0, 3)]; // Show max 3 subs

  return (
    <div className="space-y-3">
      {/* Players header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs uppercase tracking-wider text-slate-400">Jugadores</h3>
        <span className="text-emerald-400 font-bold text-sm">
          {players.length}/{players.length}
        </span>
      </div>

      {/* Players grid */}
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
        {allPlayers.map((player, index) => {
          const isOrganizer = organizerId === player.id;
          const isSubstitute = index >= players.length;
          const color = positionColors[player.position] || positionColors['MED'];

          return (
            <div
              key={player.id}
              className={`
                flex items-center gap-2 p-2 rounded-lg transition-all duration-200
                ${isSubstitute ? 'opacity-50' : ''}
              `}
              style={{
                background: isOrganizer
                  ? `linear-gradient(135deg, ${color}25, ${color}10)`
                  : 'rgba(255, 255, 255, 0.03)',
                border: isOrganizer
                  ? `1px solid ${color}50`
                  : '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}aa)`,
                  color: '#fff',
                }}
              >
                {player.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-white text-xs font-bold truncate">{player.username}</p>
                  {isOrganizer && <span className="text-yellow-400 text-[10px]">★</span>}
                  {isSubstitute && (
                    <span className="text-[7px] px-1 py-0.5 rounded bg-slate-700 text-slate-300">SUP</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] font-bold" style={{ color }}>
                    {player.position}
                  </span>
                  <span className="text-slate-600 text-[9px]">•</span>
                  <span className="text-slate-400 text-[9px] font-bold">{player.rating} OVR</span>
                </div>
              </div>

              {/* Rating badge */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-[10px] flex-shrink-0"
                style={{
                  background: `${color}30`,
                  color: color,
                }}
              >
                {player.rating}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {allPlayers.length === 0 && (
        <div className="text-center py-8 border border-dashed border-slate-700 rounded-lg">
          <p className="text-slate-500 text-xs">No hay jugadores ainda</p>
          <p className="text-slate-600 text-[10px] mt-1">Se el primero en unirte</p>
        </div>
      )}
    </div>
  );
}
