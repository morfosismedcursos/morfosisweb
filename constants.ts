
import { Video, Note, Exam } from './types';

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

export const EXAMS: Exam[] = [
  {
    id: 'e1',
    title: 'Simulacro Parcial 1',
    description: 'Gametogénesis, Fecundación y Primera Semana.',
    isFree: true,
    parcial: 1,
    questions: [
      {
        id: 'q1',
        text: '¿Cuál es el número haploide de cromosomas en un gameto humano normal?',
        options: ['46', '23', '92', '44'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        text: '¿En qué fase de la meiosis se detienen los ovocitos primarios hasta la pubertad?',
        options: ['Metafase II', 'Profase I (Diploteno)', 'Anafase I', 'Telofase II'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        text: '¿Cuál es el sitio habitual de la fecundación?',
        options: ['Útero', 'Istmo de la trompa', 'Ampolla de la trompa', 'Ovario'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'e2',
    title: 'Simulacro Parcial 2',
    description: 'Gastrulación, Neurulación y Plegamiento.',
    isFree: false,
    parcial: 2,
    questions: [
      {
        id: 'q1',
        text: '¿De qué capa germinal deriva el sistema nervioso central?',
        options: ['Ectodermo', 'Mesodermo', 'Endodermo', 'Hipoblasto'],
        correctAnswer: 0
      },
      {
        id: 'q2',
        text: '¿Qué estructura induce la formación de la placa neural?',
        options: ['La notocorda', 'El saco vitelino', 'El amnios', 'El celoma intraembrionario'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'e3',
    title: 'Simulacro Parcial 3',
    description: 'Sistema Cardiovascular y Digestivo.',
    isFree: false,
    parcial: 3,
    questions: [
      {
        id: 'q1',
        text: '¿Cuál es el primer órgano funcional en desarrollarse?',
        options: ['Hígado', 'Corazón', 'Pulmones', 'Riñón'],
        correctAnswer: 1
      }
    ]
  }
];


export const SOCIAL_LINKS = [
  { name: 'Instagram', handle: '@morfosis_embrio', url: '#', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
  { name: 'YouTube', handle: '@Morfosismx', url: 'https://www.youtube.com/@Morfosismx', color: 'bg-red-600' },
  { name: 'TikTok', handle: '@morfosis_edu', url: '#', color: 'bg-black' }
];
