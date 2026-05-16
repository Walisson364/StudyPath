import { CalendarDays, CopyPlus, RotateCcw, Trophy } from 'lucide-react';
import { useStudy } from '../context/StudyContext';
import { studyTemplates } from '../lib/templates';
import { buildWeeklyEvolution, personalRecords } from '../lib/studyStats';

const days = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];

export default function Planner() {
  const { subjects, tasks, sessions, simulations, goal, applyTemplate } = useStudy();
  const records = personalRecords(tasks, sessions, simulations);
  const weekly = buildWeeklyEvolution(sessions, tasks);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Planejamento</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Semana organizada sem complicar.</h1>
      </div>

      <section className="grid gap-4 lg:grid-cols-4">
        <article className="glass rounded-[2rem] p-5">
          <CalendarDays className="text-blue-600" size={24} />
          <p className="mt-4 text-sm font-extrabold text-slate-400">Meta de horas</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{goal.target_hours}h</p>
        </article>
        <article className="glass rounded-[2rem] p-5">
          <RotateCcw className="text-violet-600" size={24} />
          <p className="mt-4 text-sm font-extrabold text-slate-400">Revisoes inteligentes</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{tasks.filter((task) => task.title.startsWith('Revisar:')).length}</p>
        </article>
        <article className="glass rounded-[2rem] p-5">
          <Trophy className="text-emerald-600" size={24} />
          <p className="mt-4 text-sm font-extrabold text-slate-400">Melhor dia</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{records.bestStudyDay.toFixed(1)}h</p>
        </article>
        <article className="glass rounded-[2rem] p-5">
          <CopyPlus className="text-orange-600" size={24} />
          <p className="mt-4 text-sm font-extrabold text-slate-400">Tarefas concluidas</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{records.completedTasks}</p>
        </article>
      </section>

      <section className="glass rounded-[2rem] p-6">
        <h2 className="text-xl font-extrabold text-slate-950">Plano semanal automatico</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          {days.map((day, index) => {
            const subject = subjects[index % Math.max(subjects.length, 1)];
            const pending = tasks.filter((task) => !task.completed)[index];
            return (
              <article key={day} className="rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-extrabold text-blue-600">{day}</p>
                <h3 className="mt-3 min-h-12 text-sm font-extrabold text-slate-900">{subject?.name ?? 'Criar materia'}</h3>
                <p className="mt-2 text-xs font-bold leading-5 text-slate-500">{pending?.title ?? 'Separe um bloco de foco para iniciar.'}</p>
                <p className="mt-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-500">{weekly[index].horas.toFixed(1)}h feitas</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="glass rounded-[2rem] p-6">
        <h2 className="text-xl font-extrabold text-slate-950">Templates prontos</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {studyTemplates.map((template) => (
            <article key={template.id} className="rounded-[1.5rem] bg-white p-5 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-950">{template.title}</h3>
              <p className="mt-2 min-h-16 text-sm font-semibold leading-6 text-slate-500">{template.description}</p>
              <button onClick={() => applyTemplate(template)} className="btn-secondary mt-4 w-full">
                Aplicar template
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
