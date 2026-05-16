export type Subject = {
  id: string;
  user_id?: string;
  name: string;
  color: string;
  progress: number;
  taskCount?: number;
};

export type StudyTask = {
  id: string;
  user_id?: string;
  subject_id?: string | null;
  title: string;
  due_date?: string | null;
  priority: 'baixa' | 'media' | 'alta';
  completed: boolean;
  completed_at?: string | null;
};

export type WeeklyGoal = {
  id?: string;
  target_hours: number;
  target_tasks: number;
  main_objective: string;
  week_start?: string;
};

export type StudySession = {
  id: string;
  user_id?: string;
  subject_id?: string | null;
  duration_minutes: number;
  studied_at: string;
};

export type SimulationResult = {
  id: string;
  user_id?: string;
  title: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  subject_focus?: string | null;
  taken_at: string;
};

export type Achievement = {
  id: string;
  code: string;
  title: string;
  description: string;
  unlocked_at?: string | null;
};
