import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { BookOpen, CheckCircle2, Clock, Flame, Goal } from 'lucide-react';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { useStudy } from '../context/StudyContext';
import { buildWeeklyEvolution, calculateXp, countStudyStreak, levelFromXp } from '../lib/studyStats';

export default function Dashboard() {
  const { user } = useAuth();
  const { subjects, tasks, sessions, simulations, goal } = useStudy();
  const weeklyEvolution = buildWeeklyEvolution(sessions, tasks);
  const completed = tasks.filter((task) => task.completed).length;
  const progress = Math.round((subjects.reduce((sum, subject) => sum + subject.progress, 0) / Math.max(subjects.length, 1)) || 0);
  const hours = weeklyEvolution.reduce((sum, item) => sum + item.horas, 0);
  const streak = countStudyStreak(sessions);
  const xp = calculateXp(subjects, tasks, sessions, simulations);
  const level = levelFromXp(xp);
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'estudante';

  return (
    <div className="space-y-6">
      <section className="glass rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Dashboard principal</p>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">Ola, {name}. Sua rota esta em movimento.</h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
              Continue avancando por pequenas entregas. O StudyPath transforma horas, tarefas e materias em progresso visual.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-300">Progresso geral</span>
              <span className="text-3xl font-extrabold">{progress}%</span>
            </div>
            <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Dias seguidos" value={`${streak}`} detail="Sequencia ativa de estudos" icon={Flame} tone="bg-orange-50 text-orange-600" />
        <StatCard label="Horas estudadas" value={`${hours.toFixed(1)}h`} detail="Registradas nesta semana" icon={Clock} tone="bg-blue-50 text-blue-600" />
        <StatCard label="Tarefas concluidas" value={`${completed}`} detail={`${tasks.length} tarefas no total`} icon={CheckCircle2} tone="bg-emerald-50 text-emerald-600" />
        <StatCard label="Nivel academico" value={`Nv. ${level.level}`} detail={`${xp} XP acumulados`} icon={Goal} tone="bg-violet-50 text-violet-600" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="glass rounded-[2rem] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-950">Evolucao semanal</h2>
            <BookOpen className="text-blue-600" size={22} />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyEvolution}>
                <defs>
                  <linearGradient id="hours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <Tooltip />
                <Area type="monotone" dataKey="horas" stroke="#2563eb" strokeWidth={3} fill="url(#hours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="glass rounded-[2rem] p-6">
          <h2 className="text-xl font-extrabold text-slate-950">Proximas tarefas</h2>
          <div className="mt-5 space-y-3">
            {tasks.filter((task) => !task.completed).slice(0, 4).map((task) => (
              <div key={task.id} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold text-slate-800">{task.title}</p>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-500">{task.priority}</span>
                </div>
                <p className="mt-2 text-xs font-bold text-slate-400">Prazo: {task.due_date ?? 'sem prazo'}</p>
              </div>
            ))}
            {tasks.filter((task) => !task.completed).length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm font-bold text-slate-500">
                Nenhuma tarefa pendente ainda. Crie sua primeira tarefa para a rota comecar a ganhar corpo.
              </div>
            )}
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm font-bold text-slate-500">
              <span>Meta semanal</span>
              <span>{completed}/{goal.target_tasks}</span>
            </div>
            <ProgressBar value={(completed / goal.target_tasks) * 100} color="bg-emerald-500" />
          </div>
        </article>
      </section>
    </div>
  );
}
