export default function ProgressBar({ value, color = 'bg-blue-600' }: { value: number; color?: string }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
