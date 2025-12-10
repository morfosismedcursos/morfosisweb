
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Video, Note, Parcial, User, Exam, Question } from '../types';
import { PlusIcon, TrashIcon, VideoIcon, FileTextIcon, UserIcon, ClipboardListIcon, EditIcon } from './Icons';

export const AdminPanel: React.FC = () => {
  const { 
    videos, notes, users, exams,
    addVideo, updateVideo, deleteVideo, 
    addNote, updateNote, deleteNote,
    addUser, updateUser, deleteUser,
    addExam, updateExam, deleteExam
  } = useData();

  const [activeTab, setActiveTab] = useState<'videos' | 'notes' | 'users' | 'exams'>('videos');
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);

  // Video Form State
  const [vTitle, setVTitle] = useState('');
  const [vDesc, setVDesc] = useState('');
  const [vUrl, setVUrl] = useState('');
  const [vDur, setVDur] = useState('');
  const [vParcial, setVParcial] = useState<Parcial>(1);
  const [vFree, setVFree] = useState(false);

  // Note Form State
  const [nTitle, setNTitle] = useState('');
  const [nTopic, setNTopic] = useState('');
  const [nUrl, setNUrl] = useState('');
  const [nSize, setNSize] = useState('');
  const [nParcial, setNParcial] = useState<Parcial>(1);
  const [nFree, setNFree] = useState(false);

  // User Form State
  const [uName, setUName] = useState('');
  const [uUser, setUUser] = useState('');
  const [uPass, setUPass] = useState('');

  // Exam Form State
  const [eTitle, setETitle] = useState('');
  const [eDesc, setEDesc] = useState('');
  const [eParcial, setEParcial] = useState<Parcial>(1);
  const [eFree, setEFree] = useState(false);
  const [eRawText, setERawText] = useState('');

  // RESET FUNCTIONS
  const resetForms = () => {
    setEditingId(null);
    setVTitle(''); setVDesc(''); setVUrl(''); setVDur(''); setVParcial(1); setVFree(false);
    setNTitle(''); setNTopic(''); setNUrl(''); setNSize(''); setNParcial(1); setNFree(false);
    setUName(''); setUUser(''); setUPass('');
    setETitle(''); setEDesc(''); setEParcial(1); setEFree(false); setERawText('');
  };

  // EDIT HANDLERS
  const handleEditVideo = (video: Video) => {
    setEditingId(video.id);
    setVTitle(video.title); setVDesc(video.description); setVUrl(video.videoUrl); 
    setVDur(video.duration); setVParcial(video.parcial); setVFree(video.isFree || false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditNote = (note: Note) => {
    setEditingId(note.id);
    setNTitle(note.title); setNTopic(note.topic); setNUrl(note.downloadUrl); 
    setNSize(note.fileSize); setNParcial(note.parcial); setNFree(note.isFree || false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditUser = (user: any) => {
    setEditingId(user.username);
    setUName(user.name); setUUser(user.username); setUPass(user.password || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const questionsToText = (questions: Question[]): string => {
    return questions.map((q, idx) => {
        const opts = q.options.map((opt, optIdx) => {
            const letter = String.fromCharCode(97 + optIdx); // a, b, c...
            const prefix = optIdx === q.correctAnswer ? '*' : '';
            return `${prefix}${letter}) ${opt}`;
        }).join('\n');
        return `Pregunta ${idx + 1}: ${q.text}\n${opts}`;
    }).join('\n---\n');
  };

  const handleEditExam = (exam: Exam) => {
    setEditingId(exam.id);
    setETitle(exam.title); setEDesc(exam.description); 
    setEParcial(exam.parcial); setEFree(exam.isFree || false);
    setERawText(questionsToText(exam.questions));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SUBMIT HANDLERS
  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Video = {
      id: editingId || `v${Date.now()}`,
      title: vTitle,
      description: vDesc,
      videoUrl: vUrl,
      duration: vDur || 'N/A',
      date: new Date().toISOString().split('T')[0],
      parcial: vParcial,
      isFree: vFree
    };
    
    if (editingId) {
        updateVideo(payload);
        alert('Video actualizado');
    } else {
        addVideo(payload);
        alert('Video agregado');
    }
    resetForms();
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Note = {
      id: editingId || `n${Date.now()}`,
      title: nTitle,
      topic: nTopic,
      downloadUrl: nUrl,
      fileSize: nSize || 'PDF',
      parcial: nParcial,
      isFree: nFree
    };

    if (editingId) {
        updateNote(payload);
        alert('Nota actualizada');
    } else {
        addNote(payload);
        alert('Nota agregada');
    }
    resetForms();
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
        name: uName,
        username: uUser,
        password: uPass
    };

    if (editingId) {
        // En edición no permitimos cambiar username fácilmente porque es la key
        if(editingId !== uUser) {
            alert('No se puede cambiar el nombre de usuario (ID) en modo edición. Crea uno nuevo y borra el anterior.');
            return;
        }
        updateUser(payload);
        alert('Usuario actualizado');
    } else {
        if(users.some(u => u.username === uUser)) {
            alert('Este nombre de usuario ya existe.');
            return;
        }
        addUser(payload);
        alert('Usuario registrado');
    }
    resetForms();
  };

  // Parser Logic for Exams
  const parseExamText = (text: string): Question[] => {
      const questions: Question[] = [];
      const blocks = text.split(/---/g); // Separator

      blocks.forEach((block, index) => {
          const lines = block.trim().split('\n').filter(l => l.trim() !== '');
          if (lines.length < 2) return; // Need at least question + 1 options

          // Remover "Pregunta X:" al inicio si existe
          const questionText = lines[0].replace(/^(Pregunta\s*\d+\s*:?|\d+[\.)])\s*/i, '').trim();
          const optionsRaw = lines.slice(1);
          const options: string[] = [];
          let correctAnswer = 0;

          optionsRaw.forEach((opt, idx) => {
              const isCorrect = opt.trim().startsWith('*');
              // Limpiar a) b) *a) etc
              const cleanOpt = opt.trim().replace(/^\*?[a-z][\.)]\s*/i, '').replace(/^\*/, '').trim();
              options.push(cleanOpt);
              if (isCorrect) correctAnswer = idx;
          });

          questions.push({
              id: `q${Date.now()}-${index}`,
              text: questionText,
              options: options,
              correctAnswer: correctAnswer
          });
      });
      return questions;
  };

  const handleExamSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const questions = parseExamText(eRawText);
      
      if (questions.length === 0) {
          alert('No se pudieron detectar preguntas. Verifica el formato.');
          return;
      }

      const payload: Exam = {
          id: editingId || `e${Date.now()}`,
          title: eTitle,
          description: eDesc,
          parcial: eParcial,
          isFree: eFree,
          questions: questions
      };

      if (editingId) {
          updateExam(payload);
          alert(`Examen actualizado con ${questions.length} preguntas.`);
      } else {
          addExam(payload);
          alert(`Examen creado con ${questions.length} preguntas.`);
      }
      resetForms();
  };

  const handleTabChange = (tab: any) => {
      setActiveTab(tab);
      resetForms();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-stone-900 p-6 flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-white">Panel de Administración</h2>
                <p className="text-stone-400 text-sm">Gestiona el contenido de tu curso sin programar.</p>
            </div>
            <div className="bg-stone-800 text-stone-300 px-3 py-1 rounded text-xs">
                Modo {editingId ? 'EDICIÓN' : 'CREACIÓN'}
            </div>
        </div>

        <div className="flex border-b border-slate-200 overflow-x-auto">
            {[
                { id: 'videos', icon: VideoIcon, label: 'Clases' },
                { id: 'notes', icon: FileTextIcon, label: 'Material' },
                { id: 'exams', icon: ClipboardListIcon, label: 'Exámenes' },
                { id: 'users', icon: UserIcon, label: 'Usuarios' }
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex-1 min-w-[120px] py-4 text-center font-bold text-sm uppercase tracking-wide transition-colors ${activeTab === tab.id ? 'bg-white text-brand-primary border-b-2 border-brand-primary' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <tab.icon className="w-5 h-5" /> {tab.label}
                    </div>
                </button>
            ))}
        </div>

        <div className="p-8 bg-slate-50 min-h-[500px]">
            {activeTab === 'videos' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 text-stone-800 flex items-center gap-2">
                                {editingId ? <EditIcon className="w-5 h-5 text-blue-600" /> : <PlusIcon className="w-5 h-5 text-green-600" />}
                                {editingId ? 'Editar Video' : 'Nuevo Video'}
                            </h3>
                            <form onSubmit={handleVideoSubmit} className="space-y-4">
                                <input required type="text" value={vTitle} onChange={e => setVTitle(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Título" />
                                <textarea required value={vDesc} onChange={e => setVDesc(e.target.value)} className="w-full border rounded p-2 text-sm" rows={3} placeholder="Descripción..." />
                                <input required type="url" value={vUrl} onChange={e => setVUrl(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="URL YouTube" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" value={vDur} onChange={e => setVDur(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Duración" />
                                    <select value={vParcial} onChange={e => setVParcial(Number(e.target.value) as Parcial)} className="w-full border rounded p-2 text-sm">
                                        <option value={1}>Parcial 1</option>
                                        <option value={2}>Parcial 2</option>
                                        <option value={3}>Parcial 3</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <input type="checkbox" id="vFree" checked={vFree} onChange={e => setVFree(e.target.checked)} className="rounded text-brand-primary" />
                                    <label htmlFor="vFree" className="text-sm font-medium">¿Es gratis?</label>
                                </div>
                                <div className="flex gap-2">
                                    {editingId && (
                                        <button type="button" onClick={resetForms} className="flex-1 bg-slate-200 text-slate-700 font-bold py-2 rounded-lg hover:bg-slate-300 transition-colors mt-2">
                                            Cancelar
                                        </button>
                                    )}
                                    <button type="submit" className={`flex-1 ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-stone-900 hover:bg-stone-800'} text-white font-bold py-2 rounded-lg transition-colors mt-2`}>
                                        {editingId ? 'Guardar' : 'Agregar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                         {[...videos].reverse().map(video => (
                            <div key={video.id} className={`bg-white p-4 rounded-lg shadow-sm border flex justify-between items-start ${editingId === video.id ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                                <div>
                                    <h4 className="font-bold text-stone-900">{video.title}</h4>
                                    <p className="text-xs text-stone-500">Parcial {video.parcial} • {video.isFree ? 'Gratis' : 'Premium'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        type="button"
                                        onClick={() => handleEditVideo(video)}
                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                    >
                                        <EditIcon className="w-5 h-5" />
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); if(window.confirm('¿Borrar?')) deleteVideo(video.id); }}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'notes' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 text-stone-800 flex items-center gap-2">
                                {editingId ? <EditIcon className="w-5 h-5 text-blue-600" /> : <PlusIcon className="w-5 h-5 text-green-600" />}
                                {editingId ? 'Editar Nota' : 'Nueva Nota'}
                            </h3>
                            <form onSubmit={handleNoteSubmit} className="space-y-4">
                                <input required type="text" value={nTitle} onChange={e => setNTitle(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Título" />
                                <input required type="text" value={nTopic} onChange={e => setNTopic(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Tema" />
                                <input required type="text" value={nUrl} onChange={e => setNUrl(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="URL Descarga" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" value={nSize} onChange={e => setNSize(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Tamaño" />
                                    <select value={nParcial} onChange={e => setNParcial(Number(e.target.value) as Parcial)} className="w-full border rounded p-2 text-sm">
                                        <option value={1}>Parcial 1</option>
                                        <option value={2}>Parcial 2</option>
                                        <option value={3}>Parcial 3</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <input type="checkbox" id="nFree" checked={nFree} onChange={e => setNFree(e.target.checked)} className="rounded text-brand-primary" />
                                    <label htmlFor="nFree" className="text-sm font-medium">¿Es gratis?</label>
                                </div>
                                <div className="flex gap-2">
                                    {editingId && (
                                        <button type="button" onClick={resetForms} className="flex-1 bg-slate-200 text-slate-700 font-bold py-2 rounded-lg hover:bg-slate-300 transition-colors mt-2">
                                            Cancelar
                                        </button>
                                    )}
                                    <button type="submit" className={`flex-1 ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-stone-900 hover:bg-stone-800'} text-white font-bold py-2 rounded-lg transition-colors mt-2`}>
                                        {editingId ? 'Guardar' : 'Agregar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                         {[...notes].reverse().map(note => (
                            <div key={note.id} className={`bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center ${editingId === note.id ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                                <div>
                                    <h4 className="font-bold text-stone-900">{note.title}</h4>
                                    <p className="text-xs text-stone-500">Parcial {note.parcial} • {note.topic}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        type="button"
                                        onClick={() => handleEditNote(note)}
                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                    >
                                        <EditIcon className="w-5 h-5" />
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); if(window.confirm('¿Borrar?')) deleteNote(note.id); }}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 text-stone-800 flex items-center gap-2">
                                {editingId ? <EditIcon className="w-5 h-5 text-blue-600" /> : <PlusIcon className="w-5 h-5 text-green-600" />}
                                {editingId ? 'Editar Usuario' : 'Nuevo Usuario'}
                            </h3>
                            <form onSubmit={handleUserSubmit} className="space-y-4">
                                <input required type="text" value={uName} onChange={e => setUName(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Nombre Completo" />
                                <input required type="text" value={uUser} onChange={e => setUUser(e.target.value)} className={`w-full border rounded p-2 text-sm ${editingId ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''}`} placeholder="Usuario (Login)" readOnly={!!editingId} />
                                <input required type="text" value={uPass} onChange={e => setUPass(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Contraseña" />
                                
                                <div className="flex gap-2">
                                    {editingId && (
                                        <button type="button" onClick={resetForms} className="flex-1 bg-slate-200 text-slate-700 font-bold py-2 rounded-lg hover:bg-slate-300 transition-colors mt-2">
                                            Cancelar
                                        </button>
                                    )}
                                    <button type="submit" className={`flex-1 ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-stone-900 hover:bg-stone-800'} text-white font-bold py-2 rounded-lg transition-colors mt-2`}>
                                        {editingId ? 'Guardar' : 'Registrar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                         <h3 className="font-bold text-lg text-stone-800 mb-4">Usuarios Registrados ({users.length})</h3>
                         {[...users].reverse().map(user => (
                            <div key={user.username} className={`bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center ${editingId === user.username ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center">
                                        <UserIcon className="w-4 h-4 text-stone-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-900 text-sm">{user.name}</h4>
                                        <p className="text-xs text-stone-500">@{user.username}</p>
                                    </div>
                                </div>
                                {user.username !== 'admin' && (
                                    <div className="flex gap-2">
                                        <button 
                                            type="button"
                                            onClick={() => handleEditUser(user)}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                        >
                                            <EditIcon className="w-5 h-5" />
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); if(window.confirm('¿Borrar usuario?')) deleteUser(user.username); }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'exams' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 text-stone-800 flex items-center gap-2">
                                {editingId ? <EditIcon className="w-5 h-5 text-blue-600" /> : <PlusIcon className="w-5 h-5 text-green-600" />}
                                {editingId ? 'Editar Examen' : 'Crear Examen'}
                            </h3>
                            <form onSubmit={handleExamSubmit} className="space-y-4">
                                <input required type="text" value={eTitle} onChange={e => setETitle(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Título (Ej: Simulacro 1)" />
                                <input required type="text" value={eDesc} onChange={e => setEDesc(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="Descripción breve" />
                                <div className="grid grid-cols-2 gap-4">
                                    <select value={eParcial} onChange={e => setEParcial(Number(e.target.value) as Parcial)} className="w-full border rounded p-2 text-sm">
                                        <option value={1}>Parcial 1</option>
                                        <option value={2}>Parcial 2</option>
                                        <option value={3}>Parcial 3</option>
                                    </select>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="eFree" checked={eFree} onChange={e => setEFree(e.target.checked)} className="rounded text-brand-primary" />
                                        <label htmlFor="eFree" className="text-sm font-medium">¿Gratis?</label>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">
                                        Pegar Preguntas (Formato Texto)
                                    </label>
                                    <p className="text-xs text-stone-400 mb-2">
                                        Separa preguntas con "---". Marca la correcta con *.
                                    </p>
                                    <textarea 
                                        required 
                                        value={eRawText} 
                                        onChange={e => setERawText(e.target.value)} 
                                        className="w-full border rounded p-2 text-sm font-mono bg-stone-50" 
                                        rows={10} 
                                        placeholder={`Pregunta 1: ¿Texto?
a) Opción 1
*b) Correcta
c) Opción 3
---
Pregunta 2...`} 
                                    />
                                </div>

                                <div className="flex gap-2">
                                    {editingId && (
                                        <button type="button" onClick={resetForms} className="flex-1 bg-slate-200 text-slate-700 font-bold py-2 rounded-lg hover:bg-slate-300 transition-colors mt-2">
                                            Cancelar
                                        </button>
                                    )}
                                    <button type="submit" className={`flex-1 ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-stone-900 hover:bg-stone-800'} text-white font-bold py-2 rounded-lg transition-colors mt-2`}>
                                        {editingId ? 'Actualizar' : 'Generar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-1 space-y-4">
                         <h3 className="font-bold text-lg text-stone-800 mb-4">Exámenes Creados ({exams.length})</h3>
                         {[...exams].reverse().map(exam => (
                            <div key={exam.id} className={`bg-white p-4 rounded-lg shadow-sm border flex justify-between items-start ${editingId === exam.id ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                                <div>
                                    <h4 className="font-bold text-stone-900">{exam.title}</h4>
                                    <p className="text-xs text-stone-500 mb-1">{exam.description}</p>
                                    <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded">{exam.questions.length} Preguntas</span>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        type="button"
                                        onClick={() => handleEditExam(exam)}
                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                    >
                                        <EditIcon className="w-5 h-5" />
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); if(window.confirm('¿Borrar examen?')) deleteExam(exam.id); }}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
