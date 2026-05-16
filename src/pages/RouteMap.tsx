import { Award, BookOpen, Check, ClipboardCheck, Dumbbell, Flag, PlayCircle, RotateCcw } from 'lucide-react';
import { useStudy } from '../context/StudyContext';

const clamp = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

export default function RouteMap() {
  const { subjects, tasks, sessions, goal } = useStudy();
  const completedTasks = tasks.filter((task) => task.completed).length;
  const studiedHours = sessions.reduce((sum, session) => sum + session.duration_minutes / 60, 0);
  const averageSubjectProgress =
    subjects.reduce((sum, subject) => sum + subject.progress, 0) / Math.max(subjects.length, 1);
  const weeklyGoalProgress = ((studiedHours / Math.max(goal.target_hours, 1)) + (completedTasks / Math.max(goal.target_tasks, 1))) * 50;

  const steps = [
    { title: 'Comecar', progress: subjects.length || tasks.length || sessions.length ? 100 : 0, icon: PlayCircle },
    { title: 'Organizar materias', progress: clamp((subjects.length / 3) * 100), icon: BookOpen },
    { title: 'Estudar conteudos', progress: clamp((studiedHours / Math.max(goal.target_hours, 1)) * 100), icon: ClipboardCheck },
    { title: 'Revisar', progress: clamp(averageSubjectProgress), icon: RotateCcw },
    { title: 'Resolver exercicios', progress: clamp((completedTasks / Math.max(tasks.length, 1)) * 100), icon: Dumbbell },
    { title: 'Fazer simulados', progress: clamp((tasks.filter((task) => task.title.toLowerCase().includes('simulado') && task.completed).length / 1) * 100), icon: Award },
    { title: 'Concluir meta', progress: clamp(weeklyGoalProgress), icon: Flag },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Minha Rota</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Sua jornada academica em fases.</h1>
      </div>
      <section className="glass rounded-[2rem] p-6">
        {!subjects.length && !tasks.length && !sessions.length && (
          <div className="mb-6 rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 p-5 text-sm font-bold leading-6 text-slate-500">
            Sua rota esta zerada porque esta conta ainda nao tem materias, tarefas ou sessoes de foco. Crie a primeira materia para iniciar a jornada.
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-7">
          {steps.map((step, index) => {
            const done = step.progress === 100;
            return (
              <div key={step.title} className="relative">
                {index < steps.length - 1 && <div className="absolute left-1/2 top-12 hidden h-1 w-full bg-slate-200 xl:block" />}
                <article className={`relative z-10 rounded-[1.75rem] border p-5 text-center shadow-sm transition hover:-translate-y-1 ${done ? 'border-emerald-200 bg-emerald-50' : 'border-slate-100 bg-white'}`}>
                  <div className={`mx-auto grid h-16 w-16 place-items-center rounded-3xl ${done ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-blue-600'}`}>
                    {done ? <Check size={26} /> : <step.icon size={26} />}
                  </div>
                  <h2 className="mt-4 min-h-12 text-sm font-extrabold text-slate-900">{step.title}</h2>
                  <p className="mt-2 text-2xl font-extrabold text-slate-950">{step.progress}%</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${step.progress}%` }} />
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
