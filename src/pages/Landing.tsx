import { ArrowRight, BarChart3, BookOpen, CheckCircle2, Flame, Map, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_34%),radial-gradient(circle_at_top_right,#ede9fe,transparent_30%),#f8fafc]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 text-white shadow-glow">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="font-extrabold text-slate-950">StudyPath</p>
            <p className="text-xs font-bold text-slate-400">Rota do Estudo</p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden rounded-2xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-white sm:inline-flex">Login</Link>
          <Link to="/cadastro" className="btn-primary px-4 py-2">Comecar Agora</Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-12 px-4 pb-14 pt-6 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
              <Flame size={16} />
              Evolucao academica com ritmo de jogo
            </div>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-6xl">
              Transforme seus estudos em uma jornada de progresso.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">
              Organize materias, acompanhe evolucao, mantenha constancia e alcance seus objetivos academicos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/cadastro" className="btn-primary">
                Comecar agora <ArrowRight size={18} />
              </Link>
              <a href="#funcionalidades" className="btn-secondary">
                Ver funcionalidades <Play size={18} />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="glass animate-float rounded-[2rem] p-5">
              <div className="rounded-[1.5rem] bg-slate-950 p-4 text-white">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-300">Progresso geral</p>
                    <p className="text-4xl font-extrabold">68%</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/20 px-3 py-2 text-sm font-bold text-emerald-200">+12% semana</div>
                </div>
                <div className="space-y-4">
                  {[
                    ['Comecar', 100, 'bg-emerald-400'],
                    ['Revisar conteudos', 72, 'bg-blue-400'],
                    ['Resolver exercicios', 56, 'bg-violet-400'],
                  ].map(([label, value, color]) => (
                    <div key={label as string}>
                      <div className="mb-2 flex justify-between text-sm font-bold">
                        <span>{label}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white/10">
                        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  [BookOpen, '12 materias'],
                  [CheckCircle2, '48 tarefas'],
                  [BarChart3, '34h foco'],
                ].map(([Icon, label]) => (
                  <div key={label as string} className="rounded-3xl bg-white p-4 text-center shadow-sm">
                    <Icon className="mx-auto text-blue-600" size={22} />
                    <p className="mt-2 text-xs font-extrabold text-slate-600">{label as string}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="funcionalidades" className="bg-white py-16">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              [Map, 'Minha Rota', 'Avance por etapas visuais e acompanhe sua jornada academica.'],
              [BookOpen, 'Materias', 'Organize disciplinas com cores, progresso e tarefas.'],
              [Flame, 'Modo Foco', 'Pomodoro limpo para transformar tempo em evolucao real.'],
              [BarChart3, 'Graficos', 'Veja horas, tarefas e progresso com Recharts responsivo.'],
            ].map(([Icon, title, text]) => (
              <article key={title as string} className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <Icon className="text-blue-600" size={28} />
                <h2 className="mt-5 text-lg font-extrabold text-slate-950">{title as string}</h2>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{text as string}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
