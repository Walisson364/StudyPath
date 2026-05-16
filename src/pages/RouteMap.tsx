import { Award, BookOpen, Check, ClipboardCheck, Dumbbell, Flag, PlayCircle, RotateCcw } from 'lucide-react';

const steps = [
  { title: 'Comecar', progress: 100, icon: PlayCircle },
  { title: 'Organizar materias', progress: 100, icon: BookOpen },
  { title: 'Estudar conteudos', progress: 78, icon: ClipboardCheck },
  { title: 'Revisar', progress: 56, icon: RotateCcw },
  { title: 'Resolver exercicios', progress: 44, icon: Dumbbell },
  { title: 'Fazer simulados', progress: 20, icon: Award },
  { title: 'Concluir meta', progress: 0, icon: Flag },
];

export default function RouteMap() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Minha Rota</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Sua jornada academica em fases.</h1>
      </div>
      <section className="glass rounded-[2rem] p-6">
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
