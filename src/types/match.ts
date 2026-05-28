export type MatchFormat = 'FS' | 'F7' | 'F11';
export type MatchLevel = 'Principiante' | 'Medio' | 'Alto' | 'Elite';
export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'night';

export interface Player {
  id: string;
  username: string;
  avatar: string;
  rating: number;
  position: string;
  isOrganizer?: boolean;
}

export interface PositionSlot {
  id: string;
  position: string;
  x: number;
  y: number;
  label: string;
  player?: Player;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
}

export interface Match {
  id: string;
  title: string;
  format: MatchFormat;
  level: MatchLevel;
  date: string;
  time: string;
  location: string;
  field: string;
  price: number;
  maxPlayers: number;
  currentPlayers: number;
  duration: number;
  weather: WeatherType;
  temperature: number;
  slots: PositionSlot[];
  substitutes: Player[];
  chatMessages: ChatMessage[];
  organizer?: Player;
}

export const formations: Record<MatchFormat, { name: string; positions: Array<{ position: string; x: number; y: number; label: string }> }> = {
  FS: {
    name: '2-2',
    positions: [
      { position: 'POR', x: 50, y: 88, label: 'POR' },
      { position: 'DEF', x: 30, y: 60, label: 'DEF' },
      { position: 'DEF', x: 70, y: 60, label: 'DEF' },
      { position: 'DEL', x: 50, y: 25, label: 'DEL' },
    ],
  },
  F7: {
    name: '2-3-1',
    positions: [
      { position: 'POR', x: 50, y: 88, label: 'POR' },
      { position: 'DEF', x: 30, y: 65, label: 'DEF' },
      { position: 'DEF', x: 70, y: 65, label: 'DEF' },
      { position: 'MED', x: 25, y: 42, label: 'MED' },
      { position: 'MED', x: 50, y: 40, label: 'MED' },
      { position: 'MED', x: 75, y: 42, label: 'MED' },
      { position: 'DEL', x: 50, y: 18, label: 'DEL' },
    ],
  },
  F11: {
    name: '4-3-3',
    positions: [
      { position: 'POR', x: 50, y: 92, label: 'POR' },
      { position: 'DEF', x: 20, y: 72, label: 'LD' },
      { position: 'DEF', x: 37, y: 75, label: 'DFC' },
      { position: 'DEF', x: 63, y: 75, label: 'DFC' },
      { position: 'DEF', x: 80, y: 72, label: 'LI' },
      { position: 'MED', x: 30, y: 52, label: 'MCD' },
      { position: 'MED', x: 50, y: 48, label: 'MC' },
      { position: 'MED', x: 70, y: 52, label: 'MC' },
      { position: 'DEL', x: 20, y: 25, label: 'EI' },
      { position: 'DEL', x: 50, y: 20, label: 'DC' },
      { position: 'DEL', x: 80, y: 25, label: 'ED' },
    ],
  },
};

export const positionColors: Record<string, string> = {
  POR: '#f59e0b',
  DEF: '#3b82f6',
  MED: '#10b981',
  DEL: '#ef4444',
};



// Helper function to create slots from formation
export function createMatchSlots(format: MatchFormat): PositionSlot[] {
  const formation = formations[format];
  return formation.positions.map((pos, index) => ({
    id: `slot-${format}-${index}`,
    position: pos.position,
    x: pos.x,
    y: pos.y,
    label: pos.label,
    player: undefined,
  }));
}

// Helper function to create initial matches
export function createInitialMatches(): Match[] {
  const createSlots = (format: MatchFormat, playerCount: number): PositionSlot[] => {
    const slots = createMatchSlots(format);
    // Add some demo players
    for (let i = 0; i < Math.min(playerCount, slots.length); i++) {
      slots[i].player = {
        id: `player-${i}`,
        username: ['Mario G.', 'Laura P.', 'Carlos R.'][i] || `Jugador ${i + 1}`,
        avatar: ['MG', 'LP', 'CR'][i] || `J${i + 1}`,
        rating: 75 + Math.floor(Math.random() * 15),
        position: slots[i].position,
        isOrganizer: i === 0,
      };
    }
    return slots;
  };

  return [
    {
      id: 'm-1',
      title: 'Futbol 7 - Vallecas',
      format: 'F7',
      level: 'Medio',
      date: '2026-05-28',
      time: '19:00',
      location: 'Polideportivo Vallecas',
      field: 'Campo 1 - Cesped Artificial',
      price: 6,
      maxPlayers: 7,
      currentPlayers: 2,
      duration: 90,
      weather: 'sunny',
      temperature: 24,
      slots: createSlots('F7', 2),
      substitutes: [],
      chatMessages: [
        { id: 'msg-1', userId: 'player-0', username: 'Mario G.', message: 'Hola a todos! El partido es hoy a las 19:00', timestamp: new Date().toISOString() },
      ],
    },
    {
      id: 'm-2',
      title: 'Futsal - Madrid Rio',
      format: 'FS',
      level: 'Alto',
      date: '2026-05-29',
      time: '20:30',
      location: 'Centro Deportivo Madrid Rio',
      field: 'Pista 3 - Indoor',
      price: 8,
      maxPlayers: 4,
      currentPlayers: 2,
      duration: 60,
      weather: 'cloudy',
      temperature: 18,
      slots: createSlots('FS', 2),
      substitutes: [],
      chatMessages: [],
    },
    {
      id: 'm-3',
      title: 'Futbol 11 - Canillejas',
      format: 'F11',
      level: 'Principiante',
      date: '2026-05-30',
      time: '10:00',
      location: 'Ciudad Deportiva Canillejas',
      field: 'Campo 5 - Cesped Natural',
      price: 5,
      maxPlayers: 11,
      currentPlayers: 1,
      duration: 90,
      weather: 'sunny',
      temperature: 26,
      slots: createSlots('F11', 1),
      substitutes: [],
      chatMessages: [],
    },
  ];
}
