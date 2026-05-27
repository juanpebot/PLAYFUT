interface Props {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

export default function StatBar({ label, value, max = 99, color = '#f59e0b' }: Props) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 uppercase tracking-wider w-8 text-right font-semibold">{label}</span>
      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-xs font-bold text-white w-6">{value}</span>
    </div>
  );
}
