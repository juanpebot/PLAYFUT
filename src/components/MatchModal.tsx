import { useState } from 'react';
import { X, MapPin, Clock, Sun, Cloud, CloudRain, Moon, Users, MessageCircle } from 'lucide-react';
import { Match, ChatMessage, formations, positionColors } from '../types/match';
import { useAuth } from '../hooks/useAuth';
import TeamFormation from './TeamFormation';
import MatchPlayersList from './MatchPlayersList';
import FootballField from './FootballField';

interface Props {
  match: Match;
  onClose: () => void;
  onUpdate: (match: Match) => void;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  night: Moon,
};

const weatherLabels = {
  sunny: 'Soleado',
  cloudy: 'Nublado',
  rainy: 'Lluvia',
  night: 'Noche',
};

const formatLabels = {
  FS: 'Futbol Sala',
  F7: 'Futbol 7',
  F11: 'Futbol 11',
};

export default function MatchModal({ match, onClose, onUpdate }: Props) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'field' | 'players' | 'chat'>('field');
  const [chatMessage, setChatMessage] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const WeatherIcon = weatherIcons[match.weather] || Sun;

  const handleJoinPosition = (slotId: string) => {
    if (!user || isJoining) return;

    setIsJoining(true);

    // Animate joining
    setTimeout(() => {
      const updatedSlots = match.slots.map((slot) =>
        slot.id === slotId
          ? {
              ...slot,
              player: {
                id: user.id,
                username: user.username,
                avatar: user.avatar,
                rating: user.rating,
                position: user.position,
              },
            }
          : slot
      );

      const updatedMatch: Match = {
        ...match,
        slots: updatedSlots,
        currentPlayers: updatedSlots.filter((s) => s.player).length,
      };

      onUpdate(updatedMatch);
      setIsJoining(false);
    }, 500);
  };

  const handleLeavePosition = (slotId: string) => {
    const updatedSlots = match.slots.map((slot) =>
      slot.id === slotId ? { ...slot, player: undefined } : slot
    );

    const updatedMatch: Match = {
      ...match,
      slots: updatedSlots,
      currentPlayers: updatedSlots.filter((s) => s.player).length,
    };

    onUpdate(updatedMatch);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !user) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: user.id,
      username: user.username,
      message: chatMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedMatch: Match = {
      ...match,
      chatMessages: [...match.chatMessages, newMessage],
    };

    onUpdate(updatedMatch);
    setChatMessage('');
  };

  const playersWithPositions = match.slots.filter((s) => s.player).map((s) => s.player!);
  const userInMatch = playersWithPositions.find((p) => p.id === user?.id);
  const organizerId = match.slots.find((s) => s.player?.isOrganizer)?.player?.id;
  const spotsLeft = match.maxPlayers - match.currentPlayers;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-end justify-center">
      <div className="w-full max-w-md h-[93vh] bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-t-[32px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-emerald-500 text-black text-[10px] font-black px-2 py-0.5 rounded-md">
                  {match.format}
                </span>
                <span className="text-slate-400 text-[10px]">{match.level}</span>
                {userInMatch && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Apuntado
                  </span>
                )}
              </div>
              <h2 className="text-lg font-black text-white">{match.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <X size={18} className="text-white" />
            </button>
          </div>

          {/* Match info grid */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <MapPin size={12} className="text-emerald-400 flex-shrink-0" />
              <span className="truncate">{match.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Clock size={12} className="text-emerald-400 flex-shrink-0" />
              <span>{match.time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <WeatherIcon size={12} className="text-yellow-400 flex-shrink-0" />
              <span>{match.temperature}°C</span>
            </div>
          </div>

          {/* Price and spots */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black text-emerald-400">{match.price}€</div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{
                background: spotsLeft > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: spotsLeft > 0 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
              }}
            >
              <Users size={14} className={spotsLeft > 0 ? 'text-emerald-400' : 'text-red-400'} />
              <span className={`font-bold text-sm ${spotsLeft > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {spotsLeft} plazas libres
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            {[
              { id: 'field' as const, label: 'Campo', Icon: MapPin },
              { id: 'players' as const, label: 'Jugadores', Icon: Users },
              { id: 'chat' as const, label: 'Chat', Icon: MessageCircle },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all text-xs font-semibold ${
                  activeTab === id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-500 border border-white/5'
                }`}
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'field' && (
            <div className="space-y-4">
              {/* Mini field preview */}
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    Formacion {formations[match.format].name}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">{formatLabels[match.format]}</span>
                </div>
                <div className="h-20">
                  <FootballField format={match.format} mini>
                    {match.slots.slice(0, 6).map((slot) => (
                      <div
                        key={slot.id}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          left: `${slot.x}%`,
                          top: `${slot.y}%`,
                          transform: 'translate(-50%, -50%)',
                          background: slot.player ? '#10b981' : 'rgba(16, 185, 129, 0.3)',
                          boxShadow: slot.player ? '0 0 6px rgba(16, 185, 129, 0.8)' : 'none',
                        }}
                      />
                    ))}
                  </FootballField>
                </div>
              </div>

              {/* Main formation */}
              <TeamFormation
                format={match.format}
                slots={match.slots}
                onJoinPosition={handleJoinPosition}
                onLeavePosition={handleLeavePosition}
              />
            </div>
          )}

          {activeTab === 'players' && (
            <MatchPlayersList
              players={playersWithPositions}
              substitutes={match.substitutes}
              organizerId={organizerId}
            />
          )}

          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-2 mb-4 min-h-[300px]">
                {match.chatMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle size={32} className="mx-auto text-slate-700 mb-2" />
                    <p className="text-slate-600 text-sm">No hay mensajes</p>
                    <p className="text-slate-700 text-xs mt-1">Se el primero en escribir</p>
                  </div>
                ) : (
                  match.chatMessages.map((msg) => {
                    const isOwn = msg.userId === user?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-lg ${
                            isOwn
                              ? 'bg-emerald-500/20 border border-emerald-500/30'
                              : 'bg-white/5 border border-white/10'
                          }`}
                        >
                          {!isOwn && (
                            <p className="text-emerald-400 text-[10px] font-bold mb-0.5">{msg.username}</p>
                          )}
                          <p className="text-white text-sm">{msg.message}</p>
                          <p className="text-slate-600 text-[9px] mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/30 text-sm"
                />
                <button
                  type="submit"
                  disabled={!chatMessage.trim()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-sm transition-all hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enviar
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {userInMatch && (
          <div className="p-4 border-t border-white/10 bg-zinc-900/80">
            <button
              onClick={() => {
                const userSlot = match.slots.find((s) => s.player?.id === user?.id);
                if (userSlot) handleLeavePosition(userSlot.id);
              }}
              className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 font-bold text-sm hover:bg-red-500/10 transition-colors"
            >
              Salir del Partido
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
