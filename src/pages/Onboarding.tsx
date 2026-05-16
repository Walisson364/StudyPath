import { CheckCircle2, GraduationCap, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudy } from '../context/StudyContext';
import { studyTemplates } from '../lib/templates';

export default function Onboarding() {
  const { applyTemplate } = useStudy();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(studyTemplates[0].id);
  const template = studyTemplates.find((item) => item.id === selected) ?? studyTemplates[0];

  async function start() {
    await applyTemplate(template);
    navigate('/app/planejamento');
  }

  return (
    <div className="space-y-6">
      <section className="glass rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Onboarding inicial</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Escolha uma rota pronta para comecar.</h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
              O StudyPath cria materias, tarefas e uma meta semanal inicial. Depois voce ajusta tudo do seu jeito.
            </p>
          </div>
          <button onClick={start} className="btn-primary">
            <Sparkles size={18} />
            Aplicar rota
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {studyTemplates.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`glass rounded-[2rem] p-5 text-left transition hover:-translate-y-1 ${
              selected === item.id ? 'ring-4 ring-blue-100' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <GraduationCap size={22} />
              </div>
              {selected === item.id && <CheckCircle2 className="text-emerald-500" size={22} />}
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-slate-950">{item.title}</h2>
            <p className="mt-2 text-sm font-bold text-blue-600">{item.audience}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">{item.description}</p>
          </button>
        ))}
      </section>

      <section className="glass rounded-[2rem] p-6">
        <h2 className="text-xl font-extrabold text-slate-950">O que sera criado</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
            <p className="text-sm font-extrabold text-slate-400">Materias</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-950">{template.subjects.length}</p>
          </div>
          <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
            <p className="text-sm font-extrabold text-slate-400">Tarefas iniciais</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-950">{template.tasks.length}</p>
          </div>
          <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
            <p className="text-sm font-extrabold text-slate-400">Meta semanal</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-950">{template.goal.target_hours}h</p>
          </div>
        </div>
      </section>
    </div>
  );
}
