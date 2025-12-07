export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
  date: string;
  isFree?: boolean; // New property
}

export interface Note {
  id: string;
  title: string;
  topic: string;
  fileSize: string;
  downloadUrl: string;
  isFree?: boolean; // New property
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