import { Mail, Lock, User, Chrome, ArrowLeft } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ mode }: { mode: 'login' | 'signup' | 'reset' }) {
  const { user, signIn, signUp, resetPassword, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/app" replace />;

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    const error =
      mode === 'login'
        ? await signIn(email, password)
        : mode === 'signup'
          ? await signUp(name, email, password)
          : await resetPassword(email);
    setBusy(false);
    if (error) setMessage(error);
    else if (mode === 'reset') setMessage('Enviamos um link de recuperacao para seu e-mail.');
    else if (mode === 'signup') setMessage('Cadastro iniciado. Confirme seu e-mail para acessar com seguranca.');
    else navigate('/app');
  }

  const title = mode === 'login' ? 'Entrar no StudyPath' : mode === 'signup' ? 'Criar sua rota' : 'Recuperar senha';

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#dbeafe,transparent_35%),#f8fafc] px-4 py-8">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-700">
          <ArrowLeft size={16} />
          Voltar
        </Link>
        <form onSubmit={submit} className="glass rounded-[2rem] p-6 sm:p-8">
          <h1 className="text-3xl font-extrabold text-slate-950">{title}</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            Use Supabase Auth com e-mail, senha e OAuth. Sua jornada fica protegida por RLS.
          </p>
          <div className="mt-7 space-y-4">
            {mode === 'signup' && (
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-600"><User size={16} /> Nome</span>
                <input className="field" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Seu nome" />
              </label>
            )}
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-600"><Mail size={16} /> E-mail</span>
              <input className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="voce@email.com" />
            </label>
            {mode !== 'reset' && (
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-600"><Lock size={16} /> Senha</span>
                <input className="field" type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Minimo 6 caracteres" />
              </label>
            )}
          </div>
          {message && <p className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">{message}</p>}
          <button className="btn-primary mt-6 w-full" disabled={busy}>{busy ? 'Processando...' : mode === 'login' ? 'Entrar' : mode === 'signup' ? 'Criar conta' : 'Enviar link'}</button>
          {mode !== 'reset' && (
            <button type="button" onClick={async () => setMessage((await signInWithGoogle()) ?? '')} className="btn-secondary mt-3 w-full">
              <Chrome size={18} />
              Entrar com Google
            </button>
          )}
          <div className="mt-6 flex flex-wrap justify-between gap-3 text-sm font-bold text-slate-500">
            {mode !== 'login' && <Link to="/login" className="hover:text-blue-700">Ja tenho conta</Link>}
            {mode !== 'signup' && <Link to="/cadastro" className="hover:text-blue-700">Criar conta</Link>}
            {mode !== 'reset' && <Link to="/recuperar-senha" className="hover:text-blue-700">Esqueci a senha</Link>}
          </div>
        </form>
      </div>
    </div>
  );
}
