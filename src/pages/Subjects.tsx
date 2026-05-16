import { FormEvent, useState } from 'react';
import { BookOpen, Pencil, Plus, Trash2 } from 'lucide-react';
import { useStudy } from '../context/StudyContext';
import ProgressBar from '../components/ProgressBar';

const colors = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

export default function Subjects() {
  const { subjects, tasks, addSubject, updateSubject, removeSubject } = useStudy();
  const [name, setName] = useState('');
  const [color, setColor] = useState(colors[0]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    await addSubject({ name, color });
    setName('');
    setColor(colors[0]);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Materias</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Organize seus blocos de estudo.</h1>
      </div>
      <form onSubmit={submit} className="glass grid gap-4 rounded-[2rem] p-5 md:grid-cols-[1fr_auto_auto] md:items-end">
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-600">Nome da materia</span>
          <input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Quimica" required />
        </label>
        <div>
          <span className="mb-2 block text-sm font-bold text-slate-600">Cor</span>
          <div className="flex gap-2">
            {colors.map((item) => (
              <button key={item} type="button" onClick={() => setColor(item)} className={`h-11 w-11 rounded-2xl border-4 ${color === item ? 'border-slate-900' : 'border-white'}`} style={{ background: item }} aria-label={`Selecionar ${item}`} />
            ))}
          </div>
        </div>
        <button className="btn-primary"><Plus size={18} /> Adicionar</button>
      </form>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => {
          const taskCount = tasks.filter((task) => task.subject_id === subject.id).length || subject.taskCount || 0;
          return (
            <article key={subject.id} className="glass rounded-[2rem] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: subject.color }}>
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <input className="w-full bg-transparent text-lg font-extrabold text-slate-950 outline-none" value={subject.name} onChange={(e) => updateSubject(subject.id, { name: e.target.value })} />
                    <p className="text-xs font-bold text-slate-400">{taskCount} tarefas</p>
                  </div>
                </div>
                <button onClick={() => removeSubject(subject.id)} className="rounded-2xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Excluir materia">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-500">
                  <span>Progresso</span>
                  <span>{subject.progress}%</span>
                </div>
                <ProgressBar value={subject.progress} />
                <label className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-500">
                  <Pencil size={16} />
                  <input type="range" min="0" max="100" value={subject.progress} onChange={(e) => updateSubject(subject.id, { progress: Number(e.target.value) })} className="w-full accent-blue-600" />
                </label>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
