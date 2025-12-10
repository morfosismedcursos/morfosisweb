
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Video, Note, Parcial, User, Exam } from '../types';
import { VIDEOS, NOTES, USERS, EXAMS } from '../constants';

interface UserWithPassword extends User {
    password?: string;
}

interface DataContextType {
  videos: Video[];
  notes: Note[];
  users: UserWithPassword[];
  exams: Exam[];
  
  addVideo: (video: Video) => void;
  updateVideo: (video: Video) => void;
  deleteVideo: (id: string) => void;
  
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  
  addUser: (user: UserWithPassword) => void;
  updateUser: (user: UserWithPassword) => void;
  deleteUser: (username: string) => void;

  addExam: (exam: Exam) => void;
  updateExam: (exam: Exam) => void;
  deleteExam: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializamos con LocalStorage si existe, si no, usamos los constantes
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('morfosis_videos');
    return saved ? JSON.parse(saved) : VIDEOS;
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('morfosis_notes');
    return saved ? JSON.parse(saved) : NOTES;
  });

  const [users, setUsers] = useState<UserWithPassword[]>(() => {
    const saved = localStorage.getItem('morfosis_users');
    return saved ? JSON.parse(saved) : USERS;
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem('morfosis_exams');
    return saved ? JSON.parse(saved) : EXAMS;
  });

  // Efectos para guardar cambios en LocalStorage
  useEffect(() => {
    localStorage.setItem('morfosis_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('morfosis_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('morfosis_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('morfosis_exams', JSON.stringify(exams));
  }, [exams]);

  // Actions
  const addVideo = (video: Video) => setVideos(prev => [...prev, video]);
  const updateVideo = (video: Video) => setVideos(prev => prev.map(v => v.id === video.id ? video : v));
  const deleteVideo = (id: string) => setVideos(prev => prev.filter(v => v.id !== id));

  const addNote = (note: Note) => setNotes(prev => [...prev, note]);
  const updateNote = (note: Note) => setNotes(prev => prev.map(n => n.id === note.id ? note : n));
  const deleteNote = (id: string) => setNotes(prev => prev.filter(n => n.id !== id));

  const addUser = (user: UserWithPassword) => setUsers(prev => [...prev, user]);
  const updateUser = (user: UserWithPassword) => setUsers(prev => prev.map(u => u.username === user.username ? user : u));
  const deleteUser = (username: string) => setUsers(prev => prev.filter(u => u.username !== username));

  const addExam = (exam: Exam) => setExams(prev => [...prev, exam]);
  const updateExam = (exam: Exam) => setExams(prev => prev.map(e => e.id === exam.id ? exam : e));
  const deleteExam = (id: string) => setExams(prev => prev.filter(e => e.id !== id));

  return (
    <DataContext.Provider value={{ 
        videos, notes, users, exams,
        addVideo, updateVideo, deleteVideo, 
        addNote, updateNote, deleteNote,
        addUser, updateUser, deleteUser,
        addExam, updateExam, deleteExam
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
