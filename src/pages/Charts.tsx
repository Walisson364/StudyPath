import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useStudy } from '../context/StudyContext';
import { buildWeeklyEvolution } from '../lib/studyStats';

export default function Charts() {
  const { subjects, sessions, tasks } = useStudy();
  const weeklyEvolution = buildWeeklyEvolution(sessions, tasks);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Graficos</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Evolucao que da para enxergar.</h1>
      </div>
      <section className="grid gap-6 xl:grid-cols-2">
        <article className="glass rounded-[2rem] p-6">
          <h2 className="mb-6 text-xl font-extrabold text-slate-950">Horas estudadas</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="horas" radius={[12, 12, 0, 0]} fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="glass rounded-[2rem] p-6">
          <h2 className="mb-6 text-xl font-extrabold text-slate-950">Tarefas concluidas</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tarefas" radius={[12, 12, 0, 0]} fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="glass rounded-[2rem] p-6 xl:col-span-2">
          <h2 className="mb-6 text-xl font-extrabold text-slate-950">Progresso por materia</h2>
          <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <div className="h-80">
              {subjects.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={subjects} dataKey="progress" nameKey="name" innerRadius={75} outerRadius={120} paddingAngle={5}>
                      {subjects.map((subject) => <Cell key={subject.id} fill={subject.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="grid h-full place-items-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                  <p className="max-w-xs text-sm font-bold leading-6 text-slate-500">
                    Adicione materias para visualizar o progresso individual nesta area.
                  </p>
                </div>
              )}
            </div>
            <div className="grid content-center gap-3">
              {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="h-4 w-4 rounded-full" style={{ background: subject.color }} />
                    <span className="font-extrabold text-slate-800">{subject.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-500">{subject.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
