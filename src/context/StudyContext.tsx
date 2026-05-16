import { User } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { startOfWeek } from 'date-fns';
import { demoAchievements, demoGoal, demoSubjects, demoTasks } from '../data/demo';
import { hasSupabaseConfig, supabase } from '../lib/supabase';
import { Achievement, StudySession, StudyTask, Subject, WeeklyGoal } from '../types';

/* eslint-disable react-refresh/only-export-components */

type StudyContextValue = {
  subjects: Subject[];
  tasks: StudyTask[];
  sessions: StudySession[];
  goal: WeeklyGoal;
  achievements: Achievement[];
  loading: boolean;
  addSubject: (subject: Pick<Subject, 'name' | 'color'>) => Promise<void>;
  updateSubject: (id: string, changes: Partial<Subject>) => Promise<void>;
  removeSubject: (id: string) => Promise<void>;
  addTask: (task: Pick<StudyTask, 'title' | 'priority' | 'due_date' | 'subject_id'>) => Promise<void>;
  updateTask: (id: string, changes: Partial<StudyTask>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  saveGoal: (goal: WeeklyGoal) => Promise<void>;
  registerFocusSession: (minutes: number) => Promise<void>;
};

const StudyContext = createContext<StudyContextValue | null>(null);

const currentWeek = () => startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString().slice(0, 10);

export function StudyProvider({ children, user }: { children: ReactNode; user: User | null }) {
  const [subjects, setSubjects] = useState<Subject[]>(hasSupabaseConfig ? [] : demoSubjects);
  const [tasks, setTasks] = useState<StudyTask[]>(hasSupabaseConfig ? [] : demoTasks);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [goal, setGoal] = useState<WeeklyGoal>(demoGoal);
  const [achievements, setAchievements] = useState<Achievement[]>(demoAchievements);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasSupabaseConfig || !user) return;

    async function load() {
      setLoading(true);
      const [subjectsResult, tasksResult, sessionsResult, goalsResult, achievementsResult] = await Promise.all([
        supabase.from('subjects').select('*').order('created_at'),
        supabase.from('tasks').select('*').order('created_at', { ascending: false }),
        supabase.from('study_sessions').select('*').order('studied_at', { ascending: true }),
        supabase.from('weekly_goals').select('*').eq('week_start', currentWeek()).maybeSingle(),
        supabase.from('achievements').select('*').order('created_at'),
      ]);

      if (subjectsResult.data) setSubjects(subjectsResult.data);
      if (tasksResult.data) setTasks(tasksResult.data);
      if (sessionsResult.data) setSessions(sessionsResult.data);
      if (goalsResult.data) setGoal(goalsResult.data);
      if (achievementsResult.data) setAchievements(achievementsResult.data);
      setLoading(false);
    }

    load();
  }, [user]);

  const api = useMemo<StudyContextValue>(
    () => ({
      subjects,
      tasks,
      sessions,
      goal,
      achievements,
      loading,
      async addSubject(subject) {
        const optimistic = { id: crypto.randomUUID(), progress: 0, taskCount: 0, ...subject };
        setSubjects((list) => [optimistic, ...list]);
        if (hasSupabaseConfig && user) {
          const { data } = await supabase.from('subjects').insert({ ...subject, user_id: user.id }).select().single();
          if (data) setSubjects((list) => list.map((item) => (item.id === optimistic.id ? data : item)));
        }
      },
      async updateSubject(id, changes) {
        setSubjects((list) => list.map((item) => (item.id === id ? { ...item, ...changes } : item)));
        if (hasSupabaseConfig && user) await supabase.from('subjects').update(changes).eq('id', id);
      },
      async removeSubject(id) {
        setSubjects((list) => list.filter((item) => item.id !== id));
        if (hasSupabaseConfig && user) await supabase.from('subjects').delete().eq('id', id);
      },
      async addTask(task) {
        const optimistic: StudyTask = { id: crypto.randomUUID(), completed: false, ...task };
        setTasks((list) => [optimistic, ...list]);
        if (hasSupabaseConfig && user) {
          const { data } = await supabase.from('tasks').insert({ ...task, user_id: user.id }).select().single();
          if (data) setTasks((list) => list.map((item) => (item.id === optimistic.id ? data : item)));
        }
      },
      async updateTask(id, changes) {
        const completed_at = changes.completed ? new Date().toISOString() : null;
        const payload = 'completed' in changes ? { ...changes, completed_at } : changes;
        setTasks((list) => list.map((item) => (item.id === id ? { ...item, ...payload } : item)));
        if (hasSupabaseConfig && user) await supabase.from('tasks').update(payload).eq('id', id);
      },
      async removeTask(id) {
        setTasks((list) => list.filter((item) => item.id !== id));
        if (hasSupabaseConfig && user) await supabase.from('tasks').delete().eq('id', id);
      },
      async saveGoal(nextGoal) {
        setGoal(nextGoal);
        if (hasSupabaseConfig && user) {
          await supabase.from('weekly_goals').upsert({
            ...nextGoal,
            user_id: user.id,
            week_start: currentWeek(),
          });
        }
      },
      async registerFocusSession(minutes) {
        if (hasSupabaseConfig && user) {
          const { data } = await supabase
            .from('study_sessions')
            .insert({ user_id: user.id, duration_minutes: minutes })
            .select()
            .single();
          if (data) setSessions((list) => [...list, data]);
        }
      },
    }),
    [achievements, goal, loading, sessions, subjects, tasks, user],
  );

  return <StudyContext.Provider value={api}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error('useStudy must be used inside StudyProvider');
  return context;
}
