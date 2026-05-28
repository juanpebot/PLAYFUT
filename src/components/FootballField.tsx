import { MatchFormat } from '../types/match';

interface Props {
  format: MatchFormat;
  children?: React.ReactNode;
  mini?: boolean;
}

export default function FootballField({ format, children, mini = false }: Props) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{
        aspectRatio: mini ? '16/10' : '16/10',
        maxWidth: mini ? '100%' : '100%',
      }}
    >
      {/* Grass base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(16, 185, 129, 0.15) 0%,
              rgba(5, 150, 105, 0.2) 50%,
              rgba(6, 95, 70, 0.25) 100%)
          `,
        }}
      />

      {/* Grass stripes pattern */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              rgba(16, 185, 129, 0.2) 0px,
              rgba(16, 185, 129, 0.2) ${mini ? '15px' : '25px'},
              rgba(6, 95, 70, 0.15) ${mini ? '15px' : '25px'},
              rgba(6, 95, 70, 0.15) ${mini ? '30px' : '50px'}
            )
          `,
        }}
      />

      {/* Field lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 160 100"
        preserveAspectRatio="none"
        style={{ opacity: mini ? 0.4 : 0.6 }}
      >
        {/* Outer boundary */}
        <rect
          x="5"
          y="5"
          width="150"
          height="90"
          fill="none"
          stroke="white"
          strokeWidth={mini ? '0.8' : '1.2'}
          opacity="0.5"
        />

        {/* Center line */}
        <line
          x1="5"
          y1="50"
          x2="155"
          y2="50"
          stroke="white"
          strokeWidth={mini ? '0.8' : '1.2'}
          opacity="0.5"
        />

        {/* Center circle */}
        <circle
          cx="80"
          cy="50"
          r={format === 'FS' ? '10' : format === 'F7' ? '15' : '20'}
          fill="none"
          stroke="white"
          strokeWidth={mini ? '0.8' : '1.2'}
          opacity="0.5"
        />

        {/* Center spot */}
        <circle cx="80" cy="50" r={mini ? '0.8' : '1.5'} fill="white" opacity="0.6" />

        {/* Top penalty area */}
        <rect
          x={format === 'FS' ? '50' : format === 'F7' ? '40' : '30'}
          y="5"
          width={format === 'FS' ? '60' : format === 'F7' ? '80' : '100'}
          height={format === 'FS' ? '12' : format === 'F7' ? '18' : '25'}
          fill="none"
          stroke="white"
          strokeWidth={mini ? '0.8' : '1.2'}
          opacity="0.5"
        />

        {/* Top goal area */}
        <rect
          x={format === 'FS' ? '65' : format === 'F7' ? '55' : '45'}
          y="5"
          width={format === 'FS' ? '30' : format === 'F7' ? '50' : '70'}
          height={format === 'FS' ? '6' : format === 'F7' ? '9' : '12'}
          fill="none"
          stroke="white"
          strokeWidth={mini ? '0.8' : '1.2'}
          opacity="0.5"
        />

        {/* Bottom penalty area */}
        <rect
          x={format === 'FS' ? '50' : format === 'F7' ? '40' : '30'}
          y={format === 'FS' ? '83' : format === 'F7' ? '77' : '70'}
          width={format === 'FS' ? '60' : format === 'F7' ? '80' : '100'}
          height={format === 'FS' ? '12' : format === 'F7' ? '18' : '25'}
          fill="none"
          stroke="white"
          strokeWidth={mini ? '0.8' : '1.2'}
          opacity="0.5"
        />

        {/* Bottom goal area */}
        <rect
          x={format === 'FS' ? '65' : format === 'F7' ? '55' : '45'}
          y={format === 'FS' ? '89' : format === 'F7' ? '86' : '83'}
          width={format === 'FS' ? '30' : format === 'F7' ? '50' : '70'}
          height={format === 'FS' ? '6' : format === 'F7' ? '9' : '12'}
          fill="none"
          stroke="white"
          strokeWidth={mini ? '0.8' : '1.2'}
          opacity="0.5"
        />

        {/* Goals */}
        <rect
          x={format === 'FS' ? '70' : format === 'F7' ? '60' : '50'}
          y="1"
          width={format === 'FS' ? '20' : format === 'F7' ? '40' : '60'}
          height="4"
          fill="none"
          stroke="white"
          strokeWidth={mini ? '1' : '1.5'}
          opacity="0.7"
        />
        <rect
          x={format === 'FS' ? '70' : format === 'F7' ? '60' : '50'}
          y="95"
          width={format === 'FS' ? '20' : format === 'F7' ? '40' : '60'}
          height="4"
          fill="none"
          stroke="white"
          strokeWidth={mini ? '1' : '1.5'}
          opacity="0.7"
        />
      </svg>

      {/* Green glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 100%, rgba(16, 185, 129, 0.2) 0%, transparent 40%),
            radial-gradient(ellipse at 0% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 30%),
            radial-gradient(ellipse at 100% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 30%)
          `,
        }}
      />

      {/* Children content (position slots) */}
      <div className="absolute inset-0">
        {children}
      </div>

      {/* Format badge */}
      {!mini && (
        <div
          className="absolute top-2 right-2 px-3 py-1 rounded-lg text-xs font-bold"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            color: 'rgba(16, 185, 129, 1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          {format}
        </div>
      )}
    </div>
  );
}
