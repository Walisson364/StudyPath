import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudyProvider } from './context/StudyContext';
import AppLayout from './components/AppLayout';
import Landing from './pages/Landing';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import RouteMap from './pages/RouteMap';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';
import Goals from './pages/Goals';
import Focus from './pages/Focus';
import Achievements from './pages/Achievements';
import Charts from './pages/Charts';
import Onboarding from './pages/Onboarding';
import Planner from './pages/Planner';
import Calendar from './pages/Calendar';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';

function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-mist text-sm font-semibold text-slate-500">Carregando StudyPath...</div>;
  }

  if (!user && import.meta.env.VITE_SUPABASE_URL) return <Navigate to="/login" replace />;

  return (
    <StudyProvider user={user}>
      <AppLayout />
    </StudyProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/cadastro" element={<AuthPage mode="signup" />} />
        <Route path="/recuperar-senha" element={<AuthPage mode="reset" />} />
        <Route path="/app" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="rota" element={<RouteMap />} />
          <Route path="materias" element={<Subjects />} />
          <Route path="tarefas" element={<Tasks />} />
          <Route path="planejamento" element={<Planner />} />
          <Route path="calendario" element={<Calendar />} />
          <Route path="metas" element={<Goals />} />
          <Route path="foco" element={<Focus />} />
          <Route path="desafios" element={<Challenges />} />
          <Route path="conquistas" element={<Achievements />} />
          <Route path="graficos" element={<Charts />} />
          <Route path="perfil" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
