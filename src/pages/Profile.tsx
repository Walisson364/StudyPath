import { Award, Flame, Star, Trophy, UserCircle2 } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { useStudy } from '../context/StudyContext';
import { calculateXp, countStudyStreak, levelFromXp, personalRecords } from '../lib/studyStats';

export default function Profile() {
  const { user } = useAuth();
  const { subjects, tasks, sessions, achievements } = useStudy();
  const xp = calculateXp(subjects, tasks, sessions);
  const level = levelFromXp(xp);
  const records = personalRecords(tasks, sessions);
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Estudante';

  return (
    <div className="space-y-6">
      <section className="glass rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-[1.75rem] bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 text-white shadow-glow">
              <UserCircle2 size={36} />
            </div>
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Perfil</p>
              <h1 className="mt-1 text-3xl font-extrabold text-slate-950">{name}</h1>
              <p className="mt-1 text-sm font-bold text-slate-500">Nivel {level.level} - {xp} XP acumulados</p>
            </div>
          </div>
          <div className="min-w-72">
            <div className="mb-2 flex justify-between text-sm font-bold text-slate-500">
              <span>Progresso do nivel</span>
              <span>{Math.round(level.progress)}%</span>
            </div>
            <ProgressBar value={level.progress} color="bg-violet-600" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="glass rounded-[2rem] p-5">
          <Flame className="text-orange-600" size={24} />
          <p className="mt-4 text-sm font-extrabold text-slate-400">Sequencia atual</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{countStudyStreak(sessions)} dias</p>
        </article>
        <article className="glass rounded-[2rem] p-5">
          <Trophy className="text-emerald-600" size={24} />
          <p className="mt-4 text-sm font-extrabold text-slate-400">Melhor dia de estudo</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{records.bestStudyDay.toFixed(1)}h</p>
        </article>
        <article className="glass rounded-[2rem] p-5">
          <Star className="text-blue-600" size={24} />
          <p className="mt-4 text-sm font-extrabold text-slate-400">Melhor dia de tarefas</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{records.bestTaskDay}</p>
        </article>
        <article className="glass rounded-[2rem] p-5">
          <Award className="text-amber-500" size={24} />
          <p className="mt-4 text-sm font-extrabold text-slate-400">Conquistas</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{achievements.filter((item) => item.unlocked_at).length}</p>
        </article>
      </section>
    </div>
  );
}
