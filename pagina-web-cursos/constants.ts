
import { Video, Note } from './types';

// AQUI PUEDES AGREGAR LOS USUARIOS Y CONTRASEÑAS PARA TUS ALUMNOS
export const USERS = [
  {
    username: 'alumno',
    password: 'password123',
    name: 'Estudiante Morfosis'
  },
  {
    username: 'admin',
    password: 'admin',
    name: 'Dr. Morfosis'
  },
  {
    username: 'Raulito03',
    password: 'raulcomesemen',
    name: 'Raul Garza'
  }
];

export const VIDEOS: Video[] = [
  // --- PRIMER PARCIAL ---
  {
    id: 'v1',
    title: 'Semana 1: Gametogénesis',
    description: 'Introducción a la meiosis, espermatogénesis y ovogénesis. Conceptos básicos de la biología celular del desarrollo.',
    duration: '1h 20m',
    videoUrl: 'https://youtu.be/rGwlNB2sdds', 
    date: '2023-08-10',
    isFree: true,
    parcial: 1
  },
  {
    id: 'v2',
    title: 'Semana 2: Fecundación e Implantación',
    description: 'Proceso de fecundación, reacción acrosómica y la primera semana del desarrollo hasta la implantación.',
    duration: '55m',
    videoUrl: 'https://www.youtube.com/watch?v=lx-o0rS8u7w',
    date: '2023-08-17',
    parcial: 1
  },
  
  // --- SEGUNDO PARCIAL ---
  {
    id: 'v3',
    title: 'Semana 3: Gastrulación',
    description: 'Formación de las tres capas germinales: ectodermo, mesodermo y endodermo. El disco germinativo trilaminar.',
    duration: '1h 10m',
    videoUrl: 'https://youtu.be/FV5FBzGqUQQ',
    date: '2023-08-24',
    parcial: 2
  },
  {
    id: 'v4',
    title: 'Neurulación y Plegamiento',
    description: 'Formación del tubo neural y plegamiento del embrión. Inicio del periodo somítico.',
    duration: '1h 05m',
    videoUrl: 'https://www.youtube.com/watch?v=fA4hQ6QO8qM',
    date: '2023-08-31',
    parcial: 2
  },

  // --- TERCER PARCIAL ---
  {
    id: 'v5',
    title: 'Desarrollo del Sistema Cardiovascular',
    description: 'Formación del tubo cardíaco, asa cardíaca y tabicamiento. Circulación fetal.',
    duration: '1h 30m',
    videoUrl: 'https://www.youtube.com/watch?v=5diJHp_y2aM',
    date: '2023-09-07',
    parcial: 3
  }
];

export const NOTES: Note[] = [
  // --- PRIMER PARCIAL ---
  {
    id: 'n1',
    title: 'Resumen: Ciclo Celular y Gametogénesis',
    topic: 'Fundamentos',
    fileSize: '2.4 MB',
    downloadUrl: '#',
    isFree: true,
    parcial: 1
  },
  {
    id: 'n2',
    title: 'Guía de Estudio: Primera Semana',
    topic: 'Desarrollo Temprano',
    fileSize: '1.8 MB',
    downloadUrl: '#',
    parcial: 1
  },

  // --- SEGUNDO PARCIAL ---
  {
    id: 'n3',
    title: 'Esquemas: Gastrulación y Derivados',
    topic: 'Capas Germinales',
    fileSize: '5.2 MB',
    downloadUrl: '#',
    parcial: 2
  },
  {
    id: 'n4',
    title: 'Tabla Comparativa: Arcos Faríngeos',
    topic: 'Cabeza y Cuello',
    fileSize: '',
    downloadUrl: '#',
    parcial: 2
  },

  // --- TERCER PARCIAL ---
  {
    id: 'n5',
    title: 'Atlas Mudo: Embriología Clínica',
    topic: 'Práctica',
    fileSize: '12.5 MB',
    downloadUrl: '#',
    parcial: 3
  }
];

export const SOCIAL_LINKS = [
  { name: 'Instagram', handle: '@morfosis_embrio', url: '#', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
  { name: 'YouTube', handle: '@Morfosismx', url: 'https://www.youtube.com/@Morfosismx', color: 'bg-red-600' },
  { name: 'TikTok', handle: '@morfosis_edu', url: '#', color: 'bg-black' }
];
