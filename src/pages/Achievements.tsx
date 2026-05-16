import { Award, BadgeCheck, Flame, Lock, Medal, Star, Trophy } from 'lucide-react';
import { useStudy } from '../context/StudyContext';

const icons = [Trophy, Flame, Medal, BadgeCheck, Award, Star];

export default function Achievements() {
  const { achievements } = useStudy();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Conquistas</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Badges que celebram constancia.</h1>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement, index) => {
          const Icon = icons[index % icons.length];
          const unlocked = Boolean(achievement.unlocked_at);
          return (
            <article key={achievement.id} className={`glass rounded-[2rem] p-6 transition hover:-translate-y-1 ${unlocked ? 'animate-pop' : 'opacity-65'}`}>
              <div className={`grid h-16 w-16 place-items-center rounded-3xl ${unlocked ? 'bg-gradient-to-br from-amber-400 to-emerald-500 text-white shadow-glow' : 'bg-slate-100 text-slate-400'}`}>
                {unlocked ? <Icon size={30} /> : <Lock size={26} />}
              </div>
              <h2 className="mt-5 text-xl font-extrabold text-slate-950">{achievement.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{achievement.description}</p>
              <p className={`mt-5 rounded-2xl px-4 py-2 text-sm font-extrabold ${unlocked ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {unlocked ? 'Desbloqueada' : 'Bloqueada'}
              </p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
