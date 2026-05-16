import { FormEvent, useState } from 'react';
import { Goal as GoalIcon, Save } from 'lucide-react';
import { useStudy } from '../context/StudyContext';
import ProgressBar from '../components/ProgressBar';
import { buildWeeklyEvolution } from '../lib/studyStats';

export default function Goals() {
  const { goal, tasks, sessions, saveGoal } = useStudy();
  const [targetHours, setTargetHours] = useState(goal.target_hours);
  const [targetTasks, setTargetTasks] = useState(goal.target_tasks);
  const [mainObjective, setMainObjective] = useState(goal.main_objective);
  const completedTasks = tasks.filter((task) => task.completed).length;
  const weeklyEvolution = buildWeeklyEvolution(sessions, tasks);
  const studiedHours = weeklyEvolution.reduce((sum, item) => sum + item.horas, 0);
  const hourProgress = Math.round((studiedHours / targetHours) * 100);
  const taskProgress = Math.round((completedTasks / targetTasks) * 100);

  async function submit(event: FormEvent) {
    event.preventDefault();
    await saveGoal({ target_hours: targetHours, target_tasks: targetTasks, main_objective: mainObjective });
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Metas semanais</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Defina o que faz a semana valer.</h1>
      </div>
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={submit} className="glass space-y-4 rounded-[2rem] p-6">
          <label>
            <span className="mb-2 block text-sm font-bold text-slate-600">Horas desejadas</span>
            <input className="field" type="number" min="1" value={targetHours} onChange={(e) => setTargetHours(Number(e.target.value))} />
          </label>
          <label>
            <span className="mb-2 block text-sm font-bold text-slate-600">Tarefas desejadas</span>
            <input className="field" type="number" min="1" value={targetTasks} onChange={(e) => setTargetTasks(Number(e.target.value))} />
          </label>
          <label>
            <span className="mb-2 block text-sm font-bold text-slate-600">Objetivo principal</span>
            <textarea className="field min-h-32 resize-none" value={mainObjective} onChange={(e) => setMainObjective(e.target.value)} />
          </label>
          <button className="btn-primary w-full"><Save size={18} /> Salvar meta</button>
        </form>
        <article className="glass rounded-[2rem] p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-950">Status da meta</h2>
            <GoalIcon className="text-emerald-600" size={24} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-slate-500">
                <span>Horas estudadas</span>
                <span>{studiedHours.toFixed(1)}h / {targetHours}h</span>
              </div>
              <ProgressBar value={hourProgress} color="bg-blue-600" />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-slate-500">
                <span>Tarefas concluidas</span>
                <span>{completedTasks} / {targetTasks}</span>
              </div>
              <ProgressBar value={taskProgress} color="bg-violet-600" />
            </div>
            <div className="rounded-[1.5rem] bg-emerald-50 p-5">
              <p className="text-sm font-extrabold text-emerald-700">Status</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-950">{Math.min(100, Math.round((hourProgress + taskProgress) / 2))}% concluida</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
