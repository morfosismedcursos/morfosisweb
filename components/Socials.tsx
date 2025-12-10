
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

export const Socials: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">
          Conecta con la Comunidad
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12">
          Síguenos en nuestras redes sociales para tips diarios, quizzes y novedades sobre los cursos.
        </p>
        
        {/* Changed grid to flex with wrap and justify-center to ensure perfect centering regardless of item count */}
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-48 w-full sm:w-64 flex flex-col items-center justify-center cursor-pointer"
            >
              <div className={`absolute inset-0 ${social.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative z-10 flex flex-col items-center p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{social.name}</h3>
                <span className="text-white/80 font-medium">{social.handle}</span>
                
                <div className="mt-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold group-hover:bg-white/30 transition-colors pointer-events-none">
                  Seguir
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
