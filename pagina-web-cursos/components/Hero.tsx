import React from 'react';
import { Section } from '../types';
import { PlayIcon, FileTextIcon } from './Icons';

interface HeroProps {
  onNavigate: (section: Section) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden bg-brand-primary py-16 sm:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl mb-6">
          <span className="block">Bienvenidos a</span>
          <span className="block mt-2">MORFOSIS</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-stone-100 leading-relaxed font-medium">
          Explora la complejidad del desarrollo humano. Cursos de embriología, notas detalladas y asistencia virtual inteligente.
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
          <button
            onClick={() => onNavigate(Section.RECORDINGS)}
            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-full text-brand-primary bg-white hover:bg-stone-100 md:py-4 md:text-lg md:px-10 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1"
          >
            <PlayIcon className="mr-2 h-5 w-5" /> Ver Clases
          </button>
          <button
            onClick={() => onNavigate(Section.NOTES)}
            className="flex items-center justify-center px-8 py-3 border border-white text-base font-bold rounded-full text-white bg-transparent hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition-all shadow-sm hover:shadow-md"
          >
            <FileTextIcon className="mr-2 h-5 w-5" /> Material
          </button>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white opacity-10 blur-[100px]"></div>
    </div>
  );
};