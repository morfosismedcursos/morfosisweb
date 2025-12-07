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
  }
];

export const VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Semana 1: Gametogénesis',
    description: 'Introducción a la meiosis, espermatogénesis y ovogénesis. Conceptos básicos de la biología celular del desarrollo.',
    duration: '1h 20m',
    thumbnailUrl: 'https://picsum.photos/seed/gameto/400/225',
    date: '2023-08-10',
    isFree: true // MUESTRA GRATUITA
  },
  {
    id: 'v2',
    title: 'Semana 2: Fecundación e Implantación',
    description: 'Proceso de fecundación, reacción acrosómica y la primera semana del desarrollo hasta la implantación.',
    duration: '55m',
    thumbnailUrl: 'https://picsum.photos/seed/ferti/400/225',
    date: '2023-08-17'
  },
  {
    id: 'v3',
    title: 'Semana 3: Gastrulación',
    description: 'Formación de las tres capas germinales: ectodermo, mesodermo y endodermo. El disco germinativo trilaminar.',
    duration: '1h 10m',
    thumbnailUrl: 'https://picsum.photos/seed/gastro/400/225',
    date: '2023-08-24'
  },
  {
    id: 'v4',
    title: 'Neurulación y Plegamiento',
    description: 'Formación del tubo neural y plegamiento del embrión. Inicio del periodo somítico.',
    duration: '1h 05m',
    thumbnailUrl: 'https://picsum.photos/seed/neuro/400/225',
    date: '2023-08-31'
  },
  {
    id: 'v5',
    title: 'Desarrollo del Sistema Cardiovascular',
    description: 'Formación del tubo cardíaco, asa cardíaca y tabicamiento. Circulación fetal.',
    duration: '1h 30m',
    thumbnailUrl: 'https://picsum.photos/seed/heart/400/225',
    date: '2023-09-07'
  }
];

export const NOTES: Note[] = [
  {
    id: 'n1',
    title: 'Resumen: Ciclo Celular y Gametogénesis',
    topic: 'Fundamentos',
    fileSize: '2.4 MB',
    downloadUrl: '#',
    isFree: true // MUESTRA GRATUITA
  },
  {
    id: 'n2',
    title: 'Guía de Estudio: Primera Semana',
    topic: 'Desarrollo Temprano',
    fileSize: '1.8 MB',
    downloadUrl: '#'
  },
  {
    id: 'n3',
    title: 'Esquemas: Gastrulación y Derivados',
    topic: 'Capas Germinales',
    fileSize: '5.2 MB',
    downloadUrl: '#'
  },
  {
    id: 'n4',
    title: 'Tabla Comparativa: Arcos Faríngeos',
    topic: 'Cabeza y Cuello',
    fileSize: '1.1 MB',
    downloadUrl: '#'
  },
  {
    id: 'n5',
    title: 'Atlas Mudo: Embriología Clínica',
    topic: 'Práctica',
    fileSize: '12.5 MB',
    downloadUrl: '#'
  }
];

export const SOCIAL_LINKS = [
  { name: 'Instagram', handle: '@morfosis_embrio', url: '#', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
  { name: 'YouTube', handle: '@Morfosismx', url: 'https://www.youtube.com/@Morfosismx', color: 'bg-red-600' },
  { name: 'TikTok', handle: '@morfosis_edu', url: '#', color: 'bg-black' },
  { name: 'Twitter / X', handle: '@morfosis_lab', url: '#', color: 'bg-stone-900' }
];