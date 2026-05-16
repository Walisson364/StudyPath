import { Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStudy } from '../context/StudyContext';

const focusMinutes = 25;
const totalSeconds = focusMinutes * 60;

export default function Focus() {
  const { registerFocusSession } = useStudy();
  const [seconds, setSeconds] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          setDone(true);
          registerFocusSession(focusMinutes);
          return totalSeconds;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [registerFocusSession, running]);

  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const rest = (seconds % 60).toString().padStart(2, '0');
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="text-center">
        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600">Pomodoro / Modo Foco</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Uma sessao limpa. Um passo adiante.</h1>
      </div>
      <section className="glass rounded-[2.25rem] p-8 text-center">
        <div className="mx-auto grid aspect-square w-64 place-items-center rounded-full bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 p-3 shadow-glow sm:w-80">
          <div className="grid h-full w-full place-items-center rounded-full bg-white">
            <div>
              <p className="text-6xl font-extrabold text-slate-950 sm:text-7xl">{minutes}:{rest}</p>
              <p className="mt-3 text-sm font-extrabold uppercase tracking-wide text-slate-400">Foco profundo</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 h-3 max-w-md overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
        </div>
        {done && <p className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-extrabold text-emerald-700">Sessao registrada automaticamente.</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => setRunning(true)} className="btn-primary"><Play size={18} /> Iniciar</button>
          <button onClick={() => setRunning(false)} className="btn-secondary"><Pause size={18} /> Pausar</button>
          <button onClick={() => { setRunning(false); setSeconds(totalSeconds); setDone(false); }} className="btn-secondary"><RotateCcw size={18} /> Resetar</button>
        </div>
      </section>
    </div>
  );
}
