import { format } from 'date-fns';
import { CalendarCheck, Clock } from 'lucide-react';
import { useStudy } from '../context/StudyContext';

export default function Calendar() {
  const { tasks, sessions } = useStudy();
  const upcoming = [...tasks]
    .filter((task) => task.due_date)
    .sort((a, b) => String(a.due_date).localeCompare(String(b.due_date)))
    .slice(0, 12);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Calendario</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Prazos e sessoes em uma linha do tempo.</h1>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <article className="glass rounded-[2rem] p-6">
          <h2 className="text-xl font-extrabold text-slate-950">Proximos prazos</h2>
          <div className="mt-5 space-y-3">
            {upcoming.map((task) => (
              <div key={task.id} className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-white p-4 shadow-sm">
                <div className="min-w-0">
                  <p className="truncate font-extrabold text-slate-900">{task.title}</p>
                  <p className="mt-1 text-xs font-bold text-slate-400">{task.priority}</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-700">{task.due_date}</span>
              </div>
            ))}
            {!upcoming.length && (
              <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 p-6 text-sm font-bold text-slate-500">
                Nenhum prazo cadastrado. Crie tarefas com data para preencher o calendario.
              </div>
            )}
          </div>
        </article>

        <article className="glass rounded-[2rem] p-6">
          <h2 className="text-xl font-extrabold text-slate-950">Historico de foco</h2>
          <div className="mt-5 space-y-3">
            {sessions.slice(-8).reverse().map((session) => (
              <div key={session.id} className="flex items-center gap-3 rounded-[1.5rem] bg-white p-4 shadow-sm">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">{session.duration_minutes} minutos</p>
                  <p className="text-xs font-bold text-slate-400">{format(new Date(session.studied_at), 'dd/MM/yyyy HH:mm')}</p>
                </div>
              </div>
            ))}
            {!sessions.length && (
              <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 p-6 text-sm font-bold text-slate-500">
                Use o modo foco para registrar suas primeiras sessoes.
              </div>
            )}
          </div>
        </article>
      </section>

      <section className="glass rounded-[2rem] p-6">
        <div className="flex items-center gap-3">
          <CalendarCheck className="text-blue-600" size={24} />
          <h2 className="text-xl font-extrabold text-slate-950">Revisoes programadas</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {tasks.filter((task) => task.title.startsWith('Revisar:')).slice(0, 6).map((task) => (
            <article key={task.id} className="rounded-[1.5rem] bg-white p-4 shadow-sm">
              <p className="font-extrabold text-slate-900">{task.title}</p>
              <p className="mt-2 text-xs font-bold text-slate-400">Prazo: {task.due_date}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
