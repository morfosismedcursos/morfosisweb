
import React, { useState } from 'react';
import { NOTES } from '../constants';
import { DownloadIcon, FileTextIcon, LockIcon } from './Icons';
import { User, Parcial } from '../types';

interface NotesProps {
  user: User | null;
  onTriggerLogin: () => void;
}

export const Notes: React.FC<NotesProps> = ({ user, onTriggerLogin }) => {
  const [selectedParcial, setSelectedParcial] = useState<Parcial>(1);

  const filteredNotes = NOTES.filter(note => note.parcial === selectedParcial);
  
  const handleDownload = (e: React.MouseEvent, url: string, isLocked: boolean) => {
    e.preventDefault();
    if (isLocked) {
      onTriggerLogin();
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const partials: Parcial[] = [1, 2, 3];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4">
            <FileTextIcon className="h-8 w-8 text-brand-primary" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Material de Estudio</h2>
        <p className="mt-4 text-lg text-slate-600">
          Descarga mis resúmenes, esquemas y guías de estudio en PDF.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="flex justify-center mb-10">
        <div className="bg-slate-100 p-1.5 rounded-full inline-flex shadow-inner">
          {partials.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedParcial(p)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                selectedParcial === p
                  ? 'bg-white text-brand-primary shadow-md'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {p === 1 ? 'Primer' : p === 2 ? 'Segundo' : 'Tercer'} Parcial
            </button>
          ))}
        </div>
      </div>

      {filteredNotes.length > 0 ? (
        <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
          <ul className="divide-y divide-slate-200">
            {filteredNotes.map((note) => {
               const isLocked = !note.isFree && !user;

               return (
                <li key={note.id} className={`group transition-colors ${isLocked ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
                  <div className="px-6 py-5 flex items-center justify-between flex-wrap sm:flex-nowrap gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isLocked ? 'bg-slate-200 text-slate-400' : 'bg-red-100 text-red-600'}`}>
                          {isLocked ? <LockIcon className="w-5 h-5" /> : <span className="font-bold text-xs">PDF</span>}
                        </div>
                      </div>
                      <div>
                        <h3 className={`text-lg font-medium transition-colors ${isLocked ? 'text-slate-500' : 'text-slate-900 group-hover:text-brand-primary'}`}>
                          {note.title}
                          {note.isFree && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                              GRATIS
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                            {note.topic}
                          </span>
                          <span className="text-sm text-slate-500">• {note.fileSize}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={(e) => handleDownload(e, note.downloadUrl, isLocked || false)}
                      className={`flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md transition-all w-full sm:w-auto ${
                        isLocked 
                          ? 'border-slate-300 text-slate-500 bg-slate-100 hover:bg-slate-200' 
                          : 'border-slate-300 shadow-sm text-slate-700 bg-white hover:bg-slate-50 hover:text-brand-primary hover:border-brand-primary'
                      }`}
                    >
                      {isLocked ? (
                        <>
                          <LockIcon className="mr-2 h-4 w-4" /> Bloqueado
                        </>
                      ) : (
                        <>
                          <DownloadIcon className="mr-2 h-4 w-4" /> Descargar
                        </>
                      )}
                    </button>
                  </div>
                </li>
               );
            })}
          </ul>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-400">No hay material disponible para este parcial aún.</p>
        </div>
      )}
    </div>
  );
};
