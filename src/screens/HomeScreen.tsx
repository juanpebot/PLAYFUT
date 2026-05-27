import { Share2, MapPin, Users, DollarSign } from 'lucide-react';

const matches = [
  {
    id: 1,
    title: 'Futbol 7 - Vallecas',
    time: 'Hoy - 19:00',
    level: 'Medio',
    price: '6 EUR',
    players: '11/14',
    format: 'F7',
    location: 'Polideportivo Vallecas',
    spots: 3,
  },
  {
    id: 2,
    title: 'Futsal - Madrid Rio',
    time: 'Manana - 20:30',
    level: 'Alto',
    price: '8 EUR',
    players: '9/10',
    format: 'FS',
    location: 'Centro Deportivo Madrid Rio',
    spots: 1,
  },
  {
    id: 3,
    title: 'Futbol 11 - Canillejas',
    time: 'Sabado - 10:00',
    level: 'Principiante',
    price: '5 EUR',
    players: '18/22',
    format: 'F11',
    location: 'Ciudad Deportiva Canillejas',
    spots: 4,
  },
];

const userCardData = {
  name: 'Carlos Romero',
  rating: 88,
  position: 'DEL',
  secondary: 'EXT',
  avatar: 'CR',
  stats: [
    { label: 'VEL', value: 89 },
    { label: 'TIR', value: 91 },
    { label: 'PAS', value: 78 },
    { label: 'REG', value: 85 },
    { label: 'FIS', value: 82 },
    { label: 'DEF', value: 45 },
  ],
};

export default function HomeScreen() {
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <header className="px-6 pt-8 pb-5 border-b border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase">
              Futmatch Pro
            </p>
            <h1 className="text-4xl font-black tracking-wider mt-1 text-green-400">
              FUTMATCH
            </h1>
          </div>

          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-700 flex items-center justify-center text-black font-black text-xl border-2 border-green-300 shadow-lg shadow-green-500/30">
            {userCardData.avatar}
          </div>
        </div>
      </header>

      <main className="p-5 space-y-8">
        {/* User FUT Card */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Tu Carta FUT
            </h2>
            <button className="bg-green-500 hover:bg-green-400 active:scale-95 transition-all duration-200 text-black px-4 py-2 rounded-xl font-black text-xs tracking-wider flex items-center gap-2">
              <Share2 size={14} />
              COMPARTIR
            </button>
          </div>

          <div className="rounded-[28px] overflow-hidden bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-800 p-[2px] shadow-2xl shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-shadow duration-300">
            <div className="rounded-[26px] bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-900 p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />

              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h3 className="text-6xl font-black leading-none text-black">
                    {userCardData.rating}
                  </h3>
                  <div className="mt-3 space-y-1">
                    <div className="bg-black/20 rounded px-2 py-1 text-xs font-black w-fit text-black">
                      {userCardData.position}
                    </div>
                    <div className="bg-black/20 rounded px-2 py-1 text-xs font-black w-fit text-black">
                      {userCardData.secondary}
                    </div>
                  </div>
                </div>

                <div className="w-24 h-24 rounded-full border-4 border-yellow-200 bg-black/20 flex items-center justify-center text-3xl font-black text-black">
                  {userCardData.avatar}
                </div>
              </div>

              <div className="relative z-10 mt-6 text-center">
                <div className="h-px bg-black/20 mb-2" />
                <h2 className="text-xl tracking-[0.3em] font-black uppercase text-black">
                  {userCardData.name}
                </h2>
                <div className="h-px bg-black/20 mt-2" />
              </div>

              <div className="relative z-10 mt-5 grid grid-cols-3 gap-4 text-center">
                {userCardData.stats.map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-2xl font-black text-black">{value}</div>
                    <div className="text-[10px] tracking-widest text-black/70 font-bold">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Estadisticas
            </h2>
            <span className="text-green-400 text-sm font-bold">
              Division Oro
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ['Victorias', '62'],
              ['Goles', '47'],
              ['Partidos', '84'],
              ['MVP', '18'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-green-500/30 transition-all duration-200"
              >
                <div className="text-3xl font-black text-green-400">
                  {value}
                </div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nearby Matches */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Partidos Cercanos
            </h2>
            <button className="text-green-400 text-sm font-bold hover:text-green-300 transition-colors">
              Ver Todos
            </button>
          </div>

          <div className="space-y-4">
            {matches.slice(0, 2).map((match, idx) => (
              <div
                key={match.id}
                className={`bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-green-500/40 transition-all duration-200 ${idx === 0 ? 'animate-slideUp' : ''}`}
                style={{ animationDelay: '100ms' }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-green-500 text-black text-[10px] font-black px-2 py-1 rounded-md tracking-widest">
                        {match.format}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {match.level}
                      </span>
                    </div>
                    <h3 className="font-black text-lg tracking-wide">
                      {match.title}
                    </h3>
                  </div>
                  <span className="text-green-400 font-black text-sm">
                    {match.price}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-zinc-400">
                    <MapPin size={12} />
                    <span>{match.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Users size={12} />
                    <span>{match.players}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-zinc-500 text-xs">
                    {match.time}
                  </span>
                  <button className="bg-green-500 hover:bg-green-400 active:scale-95 transition-all duration-200 text-black px-4 py-1.5 rounded-lg font-black text-[10px] tracking-widest">
                    UNIRSE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
