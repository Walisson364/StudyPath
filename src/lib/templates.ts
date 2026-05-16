import { addDays } from 'date-fns';
import { StudyTask, Subject, WeeklyGoal } from '../types';

type StudyTemplate = {
  id: string;
  title: string;
  audience: string;
  description: string;
  subjects: Pick<Subject, 'name' | 'color'>[];
  tasks: Array<Pick<StudyTask, 'title' | 'priority' | 'due_date' | 'subject_id'>>;
  goal: WeeklyGoal;
};

const due = (days: number) => addDays(new Date(), days).toISOString().slice(0, 10);

export const studyTemplates: StudyTemplate[] = [
  {
    id: 'enem',
    title: 'Rotina ENEM',
    audience: 'ENEM',
    description: 'Base semanal para redacao, matematica, linguagens e ciencias.',
    subjects: [
      { name: 'Redacao', color: '#7c3aed' },
      { name: 'Matematica', color: '#2563eb' },
      { name: 'Linguagens', color: '#10b981' },
      { name: 'Ciencias da Natureza', color: '#f59e0b' },
    ],
    tasks: [
      { title: 'Escrever redacao completa', priority: 'alta', due_date: due(2), subject_id: null },
      { title: 'Resolver questoes de matematica', priority: 'alta', due_date: due(3), subject_id: null },
      { title: 'Revisar interpretacao de texto', priority: 'media', due_date: due(4), subject_id: null },
      { title: 'Fazer simulado ENEM', priority: 'alta', due_date: due(6), subject_id: null },
    ],
    goal: { target_hours: 18, target_tasks: 12, main_objective: 'Fechar uma semana com redacao, revisao e simulado.' },
  },
  {
    id: 'concurso',
    title: 'Rotina Concurso',
    audience: 'Concursos',
    description: 'Foco em constancia, lei seca, questoes e revisao programada.',
    subjects: [
      { name: 'Portugues', color: '#2563eb' },
      { name: 'Direito Constitucional', color: '#7c3aed' },
      { name: 'Raciocinio Logico', color: '#10b981' },
    ],
    tasks: [
      { title: 'Resolver bloco de 30 questoes', priority: 'alta', due_date: due(1), subject_id: null },
      { title: 'Revisar erros do bloco', priority: 'alta', due_date: due(2), subject_id: null },
      { title: 'Ler resumo da lei seca', priority: 'media', due_date: due(4), subject_id: null },
      { title: 'Fazer simulado de concurso', priority: 'alta', due_date: due(6), subject_id: null },
    ],
    goal: { target_hours: 15, target_tasks: 10, main_objective: 'Criar ritmo de questoes e revisao dos erros.' },
  },
  {
    id: 'faculdade',
    title: 'Rotina Faculdade',
    audience: 'Faculdade',
    description: 'Organiza leituras, trabalhos, provas e revisoes por disciplina.',
    subjects: [
      { name: 'Disciplina principal', color: '#2563eb' },
      { name: 'Trabalhos', color: '#10b981' },
      { name: 'Provas', color: '#f59e0b' },
    ],
    tasks: [
      { title: 'Ler material da semana', priority: 'media', due_date: due(1), subject_id: null },
      { title: 'Fichar pontos importantes', priority: 'media', due_date: due(2), subject_id: null },
      { title: 'Avancar trabalho academico', priority: 'alta', due_date: due(4), subject_id: null },
      { title: 'Revisar para prova', priority: 'alta', due_date: due(6), subject_id: null },
    ],
    goal: { target_hours: 12, target_tasks: 8, main_objective: 'Manter leituras e entregas da semana em dia.' },
  },
  {
    id: 'tcc',
    title: 'Rotina TCC',
    audience: 'TCC',
    description: 'Transforma pesquisa longa em pequenos marcos semanais.',
    subjects: [
      { name: 'Referencial teorico', color: '#7c3aed' },
      { name: 'Metodologia', color: '#2563eb' },
      { name: 'Escrita', color: '#10b981' },
    ],
    tasks: [
      { title: 'Selecionar 5 referencias', priority: 'alta', due_date: due(1), subject_id: null },
      { title: 'Escrever 500 palavras', priority: 'alta', due_date: due(3), subject_id: null },
      { title: 'Revisar normas ABNT', priority: 'media', due_date: due(4), subject_id: null },
      { title: 'Enviar trecho para orientacao', priority: 'alta', due_date: due(6), subject_id: null },
    ],
    goal: { target_hours: 10, target_tasks: 6, main_objective: 'Avancar um bloco real do TCC sem acumular.' },
  },
];
