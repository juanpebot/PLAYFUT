import { Player, positionColors } from '../types/match';

interface Props {
  id: string;
  position: string;
  label: string;
  x: number;
  y: number;
  player?: Player;
  isUser?: boolean;
  onJoin: (slotId: string) => void;
  onLeave: (slotId: string) => void;
}

export default function PositionSlot({
  id,
  position,
  label,
  x,
  y,
  player,
  isUser,
  onJoin,
  onLeave,
}: Props) {
  const color = positionColors[position] || positionColors['MED'];

  if (player) {
    // Occupied slot
    return (
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
        style={{ left: `${x}%`, top: `${y}%` }}
        onClick={() => isUser && onLeave(id)}
      >
        {/* Player card */}
        <div
          className="relative w-11 h-14 rounded-lg overflow-hidden transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${color}50, ${color}25)`,
            border: isUser ? '2.5px solid #10b981' : `2px solid ${color}`,
            boxShadow: isUser
              ? '0 0 20px rgba(16, 185, 129, 0.7), 0 0 40px rgba(16, 185, 129, 0.4)'
              : `0 4px 12px ${color}40`,
          }}
        >
          {/* Rating badge */}
          <div
            className="absolute top-0.5 left-0.5 text-[8px] font-black px-1 rounded"
            style={{ background: `${color}90`, color: '#fff' }}
          >
            {player.rating}
          </div>

          {/* Avatar circle */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}aa)`,
                color: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
              }}
            >
              {player.avatar}
            </div>
          </div>

          {/* Position label */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[7px] font-black px-1.5 rounded-t"
            style={{ background: color, color: '#fff' }}
          >
            {label}
          </div>

          {/* Organizer star */}
          {player.isOrganizer && (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] text-black font-black border-2 border-yellow-300 shadow-lg">
              ★
            </div>
          )}

          {/* User indicator */}
          {isUser && (
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[9px] text-emerald-400 font-bold whitespace-nowrap bg-black/60 px-1.5 py-0.5 rounded">
              Tú
            </div>
          )}
        </div>

        {/* Hover name tooltip */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div
            className="text-[9px] font-bold text-white whitespace-nowrap px-2 py-0.5 rounded"
            style={{ background: 'rgba(0,0,0,0.85)' }}
          >
            {player.username}
          </div>
        </div>

        {/* Glow animation for user */}
        {isUser && (
          <style>{`
            @keyframes userGlow {
              0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.6), 0 0 30px rgba(16, 185, 129, 0.3); }
              50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.9), 0 0 50px rgba(16, 185, 129, 0.5); }
            }
          `}</style>
        )}
      </div>
    );
  }

  // Empty slot
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <button
        onClick={() => onJoin(id)}
        className="relative group transition-all duration-300 hover:scale-110"
      >
        {/* Empty slot circle */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}08)`,
            border: `2px dashed ${color}60`,
          }}
        >
          {/* Plus icon */}
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-base font-bold"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}bb)`,
              color: '#fff',
              boxShadow: `0 0 12px ${color}80`,
            }}
          >
            +
          </div>
        </div>

        {/* Position label below */}
        <div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[8px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap"
          style={{ background: `${color}80`, color: '#fff' }}
        >
          {label}
        </div>

        {/* Animated glow on hover */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            boxShadow: `0 0 30px ${color}90`,
          }}
        />
      </button>

      <style>{`
        @keyframes emptyPulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
