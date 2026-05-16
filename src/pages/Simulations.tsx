import { FormEvent, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Award, Plus } from 'lucide-react';
import { useStudy } from '../context/StudyContext';

export default function Simulations() {
  const { simulations, addSimulation } = useStudy();
  const [title, setTitle] = useState('Simulado ENEM');
  const [score, setScore] = useState(720);
  const [total, setTotal] = useState(90);
  const [correct, setCorrect] = useState(60);
  const [focus, setFocus] = useState('Geral');

  async function submit(event: FormEvent) {
    event.preventDefault();
    await addSimulation({ title, score, total_questions: total, correct_answers: correct, subject_focus: focus });
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Modo simulado</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Registre notas, acertos e evolucao.</h1>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <form onSubmit={submit} className="glass space-y-4 rounded-[2rem] p-6">
          <label>
            <span className="mb-2 block text-sm font-bold text-slate-600">Nome do simulado</span>
            <input className="field" value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-bold text-slate-600">Nota</span>
              <input className="field" type="number" value={score} onChange={(event) => setScore(Number(event.target.value))} />
            </label>
            <label>
              <span className="mb-2 block text-sm font-bold text-slate-600">Foco</span>
              <input className="field" value={focus} onChange={(event) => setFocus(event.target.value)} />
            </label>
            <label>
              <span className="mb-2 block text-sm font-bold text-slate-600">Questoes</span>
              <input className="field" type="number" value={total} onChange={(event) => setTotal(Number(event.target.value))} />
            </label>
            <label>
              <span className="mb-2 block text-sm font-bold text-slate-600">Acertos</span>
              <input className="field" type="number" value={correct} onChange={(event) => setCorrect(Number(event.target.value))} />
            </label>
          </div>
          <button className="btn-primary w-full">
            <Plus size={18} />
            Registrar simulado
          </button>
        </form>

        <article className="glass rounded-[2rem] p-6">
          <h2 className="text-xl font-extrabold text-slate-950">Evolucao dos simulados</h2>
          <div className="mt-5 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...simulations].reverse()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#7c3aed" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {simulations.map((simulation) => (
          <article key={simulation.id} className="glass rounded-[2rem] p-5">
            <Award className="text-amber-500" size={24} />
            <h2 className="mt-4 text-xl font-extrabold text-slate-950">{simulation.title}</h2>
            <p className="mt-2 text-sm font-bold text-slate-500">{simulation.correct_answers}/{simulation.total_questions} acertos</p>
            <p className="mt-4 text-3xl font-extrabold text-slate-950">{simulation.score}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
