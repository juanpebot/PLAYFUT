import { useState } from 'react';
import { MapPin, Users, Clock, ChevronDown, Filter } from 'lucide-react';

type FilterType = 'all' | 'today' | 'week' | 'level';

const allMatches = [
  {
    id: 1,
    title: 'Futbol 7 - Vallecas',
    time: 'Hoy - 19:00',
    date: new Date(),
    level: 'Medio',
    price: '6 EUR',
    players: '11/14',
    format: 'F7',
    location: 'Polideportivo Vallecas',
    spots: 3,
    organizer: 'Mario G.',
    distance: '2.3 km',
  },
  {
    id: 2,
    title: 'Futsal - Madrid Rio',
    time: 'Manana - 20:30',
    date: new Date(Date.now() + 86400000),
    level: 'Alto',
    price: '8 EUR',
    players: '9/10',
    format: 'FS',
    location: 'Centro Deportivo Madrid Rio',
    spots: 1,
    organizer: 'Laura P.',
    distance: '4.1 km',
  },
  {
    id: 3,
    title: 'Futbol 11 - Canillejas',
    time: 'Sabado - 10:00',
    date: new Date(Date.now() + 172800000),
    level: 'Principiante',
    price: '5 EUR',
    players: '18/22',
    format: 'F11',
    location: 'Ciudad Deportiva Canillejas',
    spots: 4,
    organizer: 'Pedro R.',
    distance: '6.7 km',
  },
  {
    id: 4,
    title: 'Futbol 7 - Moratalaz',
    time: 'Domingo - 11:00',
    date: new Date(Date.now() + 259200000),
    level: 'Medio',
    price: '6 EUR',
    players: '12/14',
    format: 'F7',
    location: 'Centro Deportivo Moratalaz',
    spots: 2,
    organizer: 'Ana M.',
    distance: '3.5 km',
  },
  {
    id: 5,
    title: 'Futsal Indoor - Valdebebas',
    time: 'Lunes - 21:00',
    date: new Date(Date.now() + 345600000),
    level: 'Alto',
    price: '10 EUR',
    players: '8/10',
    format: 'FS',
    location: 'Pabellon Valdebebas',
    spots: 2,
    organizer: 'Carlos T.',
    distance: '8.2 km',
  },
];

const levelColors: Record<string, string> = {
  Principiante: 'bg-blue-500 text-white',
  Medio: 'bg-yellow-500 text-black',
  Alto: 'bg-red-500 text-white',
};

export default function MatchesScreen() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredMatches = allMatches.filter(match => {
    if (filter === 'today') {
      const today = new Date();
      return match.date.toDateString() === today.toDateString();
    }
    if (filter === 'week') {
      const weekFromNow = new Date(Date.now() + 7 * 86400000);
      return match.date <= weekFromNow;
    }
    return true;
  });

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <header className="px-6 pt-8 pb-5 border-b border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <h1 className="text-2xl font-black tracking-wider text-white">
          Partidos
        </h1>
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
                  ? 'bg-green-500 text-black'
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
            <button className="bg-green-500 hover:bg-green-400 transition text-black px-6 py-3 rounded-xl font-bold">
              Crear Partido
            </button>
          </div>
        ) : (
          filteredMatches.map((match, idx) => (
            <div
              key={match.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-200 animate-slideUp"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Match Header */}
              <div className="p-4 border-b border-white/5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-500 text-black text-[10px] font-black px-2 py-1 rounded-md tracking-widest">
                        {match.format}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${levelColors[match.level]}`}>
                        {match.level}
                      </span>
                    </div>
                    <h3 className="font-black text-lg text-white">
                      {match.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 font-black text-lg">
                      {match.price}
                    </span>
                    <p className="text-zinc-500 text-[10px] mt-1">{match.distance}</p>
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <MapPin size={14} />
                    <span>{match.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Clock size={14} />
                    <span>{match.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Users size={14} />
                    <span>{match.players}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="text-xs text-zinc-500">
                    Organiza: <span className="text-white">{match.organizer}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-green-400 font-bold">{match.spots}</span>
                    <span className="text-zinc-500"> plazas</span>
                  </div>
                </div>

                <button className="w-full bg-green-500 hover:bg-green-400 active:scale-[0.98] transition-all duration-200 text-black py-3 rounded-xl font-black text-sm tracking-wider mt-2">
                  UNIRSE AL PARTIDO
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
