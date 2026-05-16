import { FormEvent, useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { useStudy } from '../context/StudyContext';
import { StudyTask } from '../types';

export default function Tasks() {
  const { tasks, subjects, addTask, updateTask, removeTask } = useStudy();
  const [filter, setFilter] = useState<'todas' | 'pendentes' | 'concluidas'>('todas');
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [priority, setPriority] = useState<StudyTask['priority']>('media');
  const [dueDate, setDueDate] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    await addTask({ title, subject_id: subjectId || null, priority, due_date: dueDate || null });
    setTitle('');
    setDueDate('');
  }

  const visible = tasks.filter((task) => filter === 'todas' || (filter === 'pendentes' ? !task.completed : task.completed));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Tarefas</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Transforme intencao em entrega.</h1>
      </div>
      <form onSubmit={submit} className="glass grid gap-4 rounded-[2rem] p-5 lg:grid-cols-[1fr_180px_150px_150px_auto] lg:items-end">
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-600">Tarefa</span>
          <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Revisar estequiometria" required />
        </label>
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-600">Materia</span>
          <select className="field" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
            <option value="">Sem materia</option>
            {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-600">Prioridade</span>
          <select className="field" value={priority} onChange={(e) => setPriority(e.target.value as StudyTask['priority'])}>
            <option value="baixa">Baixa</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-600">Prazo</span>
          <input className="field" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <button className="btn-primary"><Plus size={18} /> Criar</button>
      </form>
      <div className="flex flex-wrap gap-2">
        {(['todas', 'pendentes', 'concluidas'] as const).map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={`rounded-2xl px-4 py-2 text-sm font-extrabold transition ${filter === item ? 'bg-blue-600 text-white shadow-glow' : 'bg-white text-slate-500 shadow-sm'}`}>
            {item}
          </button>
        ))}
      </div>
      <section className="space-y-3">
        {visible.map((task) => {
          const subject = subjects.find((item) => item.id === task.subject_id);
          return (
            <article key={task.id} className={`glass flex flex-col gap-4 rounded-[1.75rem] p-4 transition sm:flex-row sm:items-center sm:justify-between ${task.completed ? 'opacity-70' : ''}`}>
              <button onClick={() => updateTask(task.id, { completed: !task.completed })} className="flex min-w-0 items-center gap-3 text-left">
                {task.completed ? <CheckCircle2 className="text-emerald-500" size={24} /> : <Circle className="text-slate-300" size={24} />}
                <span className={`font-extrabold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{task.title}</span>
              </button>
              <div className="flex flex-wrap items-center gap-2">
                {subject && <span className="rounded-full px-3 py-1 text-xs font-extrabold text-white" style={{ background: subject.color }}>{subject.name}</span>}
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-500">{task.priority}</span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-700">{task.due_date ?? 'sem prazo'}</span>
                <button onClick={() => removeTask(task.id)} className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Excluir tarefa">
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
