
export type Parcial = 1 | 2 | 3;

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string; 
  date: string;
  isFree?: boolean;
  parcial: Parcial;
}

export interface Note {
  id: string;
  title: string;
  topic: string;
  fileSize: string;
  downloadUrl: string;
  isFree?: boolean;
  parcial: Parcial;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  isFree?: boolean;
  parcial: Parcial;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface User {
  username: string;
  name: string;
}

export enum Section {
  HOME = 'HOME',
  RECORDINGS = 'RECORDINGS',
  NOTES = 'NOTES',
  EXAMS = 'EXAMS',
  SOCIALS = 'SOCIALS',
  AI_TUTOR = 'AI_TUTOR',
  LOGIN = 'LOGIN',
  ADMIN = 'ADMIN' // Nueva sección
}