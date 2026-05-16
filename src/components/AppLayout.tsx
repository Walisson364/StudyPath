import { BarChart3, BookOpen, CalendarDays, ClipboardList, Flame, Focus, Goal, GraduationCap, LayoutDashboard, LogOut, Map, Medal, Menu, Sparkles, Trophy, UserCircle2, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const nav = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/onboarding', label: 'Onboarding', icon: GraduationCap },
  { to: '/app/rota', label: 'Minha Rota', icon: Map },
  { to: '/app/materias', label: 'Materias', icon: BookOpen },
  { to: '/app/tarefas', label: 'Tarefas', icon: Flame },
  { to: '/app/planejamento', label: 'Planejamento', icon: ClipboardList },
  { to: '/app/calendario', label: 'Calendario', icon: CalendarDays },
  { to: '/app/metas', label: 'Metas', icon: Goal },
  { to: '/app/foco', label: 'Foco', icon: Focus },
  { to: '/app/desafios', label: 'Desafios', icon: Trophy },
  { to: '/app/conquistas', label: 'Conquistas', icon: Medal },
  { to: '/app/graficos', label: 'Graficos', icon: BarChart3 },
  { to: '/app/perfil', label: 'Perfil', icon: UserCircle2 },
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { signOut } = useAuth();

  const sidebar = (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-white px-4 py-5">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 text-white shadow-glow">
          <Sparkles size={22} />
        </div>
        <div>
          <p className="font-extrabold text-slate-950">StudyPath</p>
          <p className="text-xs font-semibold text-slate-400">Rota do Estudo</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                isActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button onClick={signOut} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 transition hover:bg-red-50 hover:text-red-600">
        <LogOut size={18} />
        Sair
      </button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="hidden fixed inset-y-0 left-0 z-20 lg:block">{sidebar}</div>
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/85 px-4 backdrop-blur lg:hidden">
        <span className="font-extrabold text-slate-950">StudyPath</span>
        <button className="rounded-xl border border-slate-200 p-2" onClick={() => setOpen(true)} aria-label="Abrir menu">
          <Menu size={20} />
        </button>
      </header>
      {open && (
        <div className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden">
          <div className="h-full w-80 max-w-[88vw] bg-white">
            <button className="absolute left-[17rem] top-4 rounded-xl bg-white p-2 shadow-soft" onClick={() => setOpen(false)} aria-label="Fechar menu">
              <X size={18} />
            </button>
            {sidebar}
          </div>
        </div>
      )}
      <main className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
