
export type Parcial = 1 | 2 | 3;

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string; 
  date: string;
  isFree?: boolean;
  parcial: Parcial; // New categorization field
}

export interface Note {
  id: string;
  title: string;
  topic: string;
  fileSize: string;
  downloadUrl: string;
  isFree?: boolean;
  parcial: Parcial; // New categorization field
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
  SOCIALS = 'SOCIALS',
  AI_TUTOR = 'AI_TUTOR',
  LOGIN = 'LOGIN'
}
