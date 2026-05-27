import { Shield } from 'lucide-react';
import { Team } from '../lib/supabase';

interface Props {
  team: Team;
  size?: number;
}

export default function TeamBadge({ team, size = 40 }: Props) {
  const initials = team.name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
  return (
    <div
      className="flex items-center justify-center rounded-lg font-black relative overflow-hidden"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${team.badge_color}, ${team.secondary_color})`,
        fontSize: size * 0.28,
        color: '#fff',
        boxShadow: `0 2px 8px rgba(0,0,0,0.4)`,
        flexShrink: 0,
      }}
    >
      <Shield size={size * 0.55} color="rgba(255,255,255,0.15)" className="absolute" />
      <span className="relative z-10" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{initials}</span>
    </div>
  );
}
