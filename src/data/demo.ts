import { Achievement, StudyTask, Subject, WeeklyGoal } from '../types';

export const demoSubjects: Subject[] = [
  { id: 'mat', name: 'Matematica', color: '#2563eb', progress: 72, taskCount: 8 },
  { id: 'red', name: 'Redacao', color: '#7c3aed', progress: 58, taskCount: 5 },
  { id: 'bio', name: 'Biologia', color: '#10b981', progress: 43, taskCount: 6 },
  { id: 'his', name: 'Historia', color: '#f59e0b', progress: 66, taskCount: 4 },
];

export const demoTasks: StudyTask[] = [
  { id: '1', subject_id: 'mat', title: 'Resolver lista de funcoes', due_date: '2026-05-18', priority: 'alta', completed: false },
  { id: '2', subject_id: 'red', title: 'Escrever introducao modelo ENEM', due_date: '2026-05-19', priority: 'media', completed: false },
  { id: '3', subject_id: 'bio', title: 'Revisar citologia', due_date: '2026-05-16', priority: 'alta', completed: true },
  { id: '4', subject_id: 'his', title: 'Mapa mental Era Vargas', due_date: '2026-05-20', priority: 'baixa', completed: true },
];

export const demoGoal: WeeklyGoal = {
  target_hours: 18,
  target_tasks: 12,
  main_objective: 'Fechar o ciclo de revisao e fazer um simulado completo.',
};

export const demoAchievements: Achievement[] = [
  { id: 'a1', code: 'first-study', title: 'Primeiro estudo concluido', description: 'Primeira sessao registrada.', unlocked_at: '2026-05-10' },
  { id: 'a2', code: 'streak-3', title: '3 dias seguidos', description: 'Tres dias de constancia.', unlocked_at: '2026-05-12' },
  { id: 'a3', code: 'streak-7', title: '7 dias seguidos', description: 'Uma semana em ritmo forte.' },
  { id: 'a4', code: 'tasks-10', title: '10 tarefas concluidas', description: 'Dez tarefas academicas feitas.' },
  { id: 'a5', code: 'weekly-goal', title: 'Meta semanal concluida', description: 'Primeira meta semanal finalizada.' },
  { id: 'a6', code: 'hours-50', title: '50 horas estudadas', description: 'Cinquenta horas registradas.' },
];

export const weeklyEvolution = [
  { day: 'Seg', horas: 2.5, tarefas: 3 },
  { day: 'Ter', horas: 1.8, tarefas: 2 },
  { day: 'Qua', horas: 3.2, tarefas: 4 },
  { day: 'Qui', horas: 2.1, tarefas: 3 },
  { day: 'Sex', horas: 3.8, tarefas: 5 },
  { day: 'Sab', horas: 1.6, tarefas: 2 },
  { day: 'Dom', horas: 0.8, tarefas: 1 },
];
