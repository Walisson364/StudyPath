import { CheckCircle2, Circle, Flame, Target, Trophy } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import { useStudy } from '../context/StudyContext';
import { countStudyStreak } from '../lib/studyStats';

const clamp = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

export default function Challenges() {
  const { subjects, tasks, sessions, goal } = useStudy();
  const completedTasks = tasks.filter((task) => task.completed).length;
  const focusMinutes = sessions.reduce((sum, session) => sum + session.duration_minutes, 0);
  const studiedHours = focusMinutes / 60;
  const streak = countStudyStreak(sessions);
  const reviewsDone = tasks.filter((task) => task.title.startsWith('Revisar:') && task.completed).length;

  const challenges = [
    {
      title: 'Primeira materia',
      description: 'Crie pelo menos uma materia para iniciar sua organizacao.',
      value: subjects.length,
      target: 1,
      icon: Target,
    },
    {
      title: 'Foco de 25 minutos',
      description: 'Complete uma sessao real no modo foco.',
      value: focusMinutes,
      target: 25,
      icon: Flame,
    },
    {
      title: 'Tres tarefas concluidas',
      description: 'Conclua 3 tarefas cadastradas no StudyPath.',
      value: completedTasks,
      target: 3,
      icon: CheckCircle2,
    },
    {
      title: 'Revisao feita',
      description: 'Conclua uma revisao criada pela revisao inteligente.',
      value: reviewsDone,
      target: 1,
      icon: Circle,
    },
    {
      title: 'Meta semanal em movimento',
      description: 'Alcance metade da meta semanal combinando horas e tarefas.',
      value: ((studiedHours / Math.max(goal.target_hours, 1)) + (completedTasks / Math.max(goal.target_tasks, 1))) * 50,
      target: 50,
      icon: Trophy,
    },
    {
      title: 'Tres dias de constancia',
      description: 'Registre estudos em 3 dias seguidos.',
      value: streak,
      target: 3,
      icon: Flame,
    },
  ];

  const completedChallenges = challenges.filter((challenge) => challenge.value >= challenge.target).length;

  return (
    <div className="space-y-6">
      <section className="glass rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Desafios</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Missoes que o app consegue validar.</h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
              Aqui nao tem nota digitada. Cada desafio depende de tarefas, foco, revisoes, materias e metas registradas dentro do StudyPath.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
            <p className="text-sm font-bold text-slate-300">Concluidos</p>
            <p className="mt-2 text-4xl font-extrabold">{completedChallenges}/{challenges.length}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {challenges.map((challenge) => {
          const done = challenge.value >= challenge.target;
          const progress = clamp((challenge.value / challenge.target) * 100);
          return (
            <article key={challenge.title} className={`glass rounded-[2rem] p-5 transition hover:-translate-y-1 ${done ? 'ring-4 ring-emerald-100' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${done ? 'bg-emerald-500 text-white' : 'bg-blue-50 text-blue-600'}`}>
                  <challenge.icon size={22} />
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${done ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {done ? 'Concluido' : 'Em progresso'}
                </span>
              </div>
              <h2 className="mt-5 text-xl font-extrabold text-slate-950">{challenge.title}</h2>
              <p className="mt-2 min-h-12 text-sm font-semibold leading-6 text-slate-500">{challenge.description}</p>
              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm font-bold text-slate-500">
                  <span>Progresso</span>
                  <span>{Math.min(challenge.value, challenge.target).toFixed(challenge.target === 25 ? 0 : 0)}/{challenge.target}</span>
                </div>
                <ProgressBar value={progress} color={done ? 'bg-emerald-500' : 'bg-blue-600'} />
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
