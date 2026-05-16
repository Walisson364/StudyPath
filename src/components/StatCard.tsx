import { LucideIcon } from 'lucide-react';

type Props = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: string;
};

export default function StatCard({ label, value, detail, icon: Icon, tone }: Props) {
  return (
    <article className="glass animate-pop rounded-[1.75rem] p-5 transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{value}</p>
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-2xl ${tone}`}>
          <Icon size={22} />
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-500">{detail}</p>
    </article>
  );
}
