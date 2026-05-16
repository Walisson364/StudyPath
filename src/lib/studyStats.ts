import { startOfWeek } from 'date-fns';
import { StudySession, StudyTask } from '../types';

const dayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

export function buildWeeklyEvolution(sessions: StudySession[], tasks: StudyTask[]) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const rows = dayLabels.map((day) => ({ day, horas: 0, tarefas: 0 }));

  sessions.forEach((session) => {
    const date = new Date(session.studied_at);
    const index = Math.floor((date.getTime() - weekStart.getTime()) / 86_400_000);
    if (index >= 0 && index < 7) rows[index].horas += Number((session.duration_minutes / 60).toFixed(2));
  });

  tasks.forEach((task) => {
    if (!task.completed_at) return;
    const date = new Date(task.completed_at);
    const index = Math.floor((date.getTime() - weekStart.getTime()) / 86_400_000);
    if (index >= 0 && index < 7) rows[index].tarefas += 1;
  });

  return rows.map((row) => ({ ...row, horas: Number(row.horas.toFixed(2)) }));
}

export function countStudyStreak(sessions: StudySession[]) {
  const studiedDays = new Set(sessions.map((session) => new Date(session.studied_at).toISOString().slice(0, 10)));
  let streak = 0;
  const cursor = new Date();

  while (studiedDays.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
