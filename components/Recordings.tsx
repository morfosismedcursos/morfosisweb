import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { PlayIcon, VideoIcon, LockIcon } from './Icons';
import { User, Video, Parcial } from '../types';

interface RecordingsProps {
  user: User | null;
  onTriggerLogin: () => void;
}

// Función auxiliar para extraer ID de YouTube y generar miniatura
const getYouTubeInfo = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const id = (match && match[2].length === 11) ? match[2] : null;
  
  return {
    id,
    thumbnailUrl: id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : 'https://via.placeholder.com/640x360?text=Video+No+Disponible'
  };
};

interface VideoCardProps {
  video: Video;
  user: User | null;
  onTriggerLogin: () => void;
}

// Componente individual para manejar la lógica de cada video
const VideoCard: React.FC<VideoCardProps> = ({ video, user, onTriggerLogin }) => {
  const [displayTitle, setDisplayTitle] = useState(video.title);
  const isLocked = !video.isFree && !user;
  const { thumbnailUrl } = getYouTubeInfo(video.videoUrl);

  useEffect(() => {
    const fetchYouTubeTitle = async () => {
      // Si el usuario proporcionó un título específico, lo usamos.
      // Si el título parece ser un placeholder o genérico, podríamos intentar fetchearlo, 
      // pero por simplicidad y rendimiento del panel admin, respetaremos el título guardado.
      if (!video.videoUrl.includes('youtube') && !video.videoUrl.includes('youtu.be')) return;
      
      // En la versión admin, el título lo define el usuario, así que no necesitamos sobreescribirlo 
      // automáticamente a menos que esté vacío. Aquí confiamos en el título guardado en el objeto video.
    };
  }, [video.videoUrl]);

  const handleVideoClick = () => {
    if (isLocked) {
      onTriggerLogin();
    } else {
      window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-100 flex flex-col relative h-full">
      <div 
        className="relative aspect-video bg-slate-200 group cursor-pointer overflow-hidden"
        onClick={handleVideoClick}
      >
        <img 
          src={thumbnailUrl} 
          alt={displayTitle} 
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isLocked ? 'grayscale opacity-80 blur-[1px]' : ''}`}
        />
        
        {isLocked ? (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center mb-2">
              <LockIcon className="text-white h-6 w-6" />
            </div>
            <span className="text-white font-bold text-sm bg-stone-800 px-3 py-1 rounded-full uppercase tracking-wider">Solo Alumnos</span>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center pl-1 shadow-lg transform group-hover:scale-110 transition-transform">
                <PlayIcon className="text-white h-7 w-7" />
              </div>
            </div>
            {video.isFree && (
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
                GRATIS
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        {/* Partial badge moved to top of content area */}
        <div className="mb-2">
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full uppercase tracking-wide">
              Parcial {video.parcial}
            </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4 leading-tight">{video.title}</h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{video.description}</p>
        
        <button 
          onClick={handleVideoClick}
          className={`w-full mt-auto py-2 px-4 border rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isLocked 
              ? 'border-slate-300 text-slate-500 hover:bg-slate-50' 
              : 'border-brand-primary text-brand-primary hover:bg-brand-light'
          }`}
        >
          {isLocked ? (
            <>
              <LockIcon className="w-4 h-4" /> Desbloquear
            </>
          ) : (
            <>
               <PlayIcon className="w-4 h-4" /> Ver en YouTube
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export const Recordings: React.FC<RecordingsProps> = ({ user, onTriggerLogin }) => {
  const { videos } = useData(); // Obtenemos videos del contexto
  const [selectedParcial, setSelectedParcial] = useState<Parcial>(1);

  const filteredVideos = videos.filter(video => video.parcial === selectedParcial);

  const partials: Parcial[] = [1, 2, 3];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
            <VideoIcon className="h-8 w-8 text-brand-secondary" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Grabaciones de Clase</h2>
        <p className="mt-4 text-lg text-slate-600">
          Repasa los temas vistos en clase a tu propio ritmo.
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

      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              user={user} 
              onTriggerLogin={onTriggerLogin} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-400">No hay videos disponibles para este parcial aún.</p>
        </div>
      )}
    </div>
  );
};