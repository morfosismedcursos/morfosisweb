
import React, { useState } from 'react';
import { Section, User } from '../types';
import { MenuIcon, CloseIcon, SettingsIcon } from './Icons';

interface NavbarProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection, onNavigate, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = user?.username === 'admin';

  const navItems = [
    { label: 'Inicio', value: Section.HOME },
    { label: 'Grabaciones', value: Section.RECORDINGS },
    { label: 'Notas', value: Section.NOTES },
    { label: 'Exámenes', value: Section.EXAMS },
    { label: 'Tutor IA', value: Section.AI_TUTOR },
    { label: 'Redes', value: Section.SOCIALS },
  ];

  const handleNav = (value: Section) => {
    onNavigate(value);
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer gap-3" onClick={() => handleNav(Section.HOME)}>
             {/* Logo Image from local file in public folder */}
            <div className="w-12 h-12">
               <img 
                 src="/logo.png" 
                 alt="Morfosis Logo" 
                 className="w-full h-full object-contain"
                 onError={(e) => {
                   // Fallback if image not found to text or placeholder
                   e.currentTarget.style.display = 'none';
                 }}
               />
            </div>
            <span className="font-extrabold text-2xl text-stone-900 tracking-widest uppercase" style={{fontFamily: 'Inter, sans-serif'}}>
              MORFOSIS
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors uppercase tracking-wide ${
                  currentSection === item.value
                    ? 'text-brand-primary bg-brand-light'
                    : 'text-stone-500 hover:text-brand-primary hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {isAdmin && (
               <button
                onClick={() => handleNav(Section.ADMIN)}
                className={`px-3 py-2 rounded-md text-sm font-bold flex items-center gap-1 transition-colors uppercase tracking-wide ${
                  currentSection === Section.ADMIN
                    ? 'text-stone-900 bg-stone-200'
                    : 'text-stone-900 bg-stone-100 hover:bg-stone-200'
                }`}
              >
                <SettingsIcon className="w-4 h-4" /> Admin
              </button>
            )}

            {user ? (
               <div className="flex items-center gap-4 pl-4 border-l border-stone-200">
                 <span className="text-xs font-bold text-brand-primary uppercase hidden lg:block">Hola, {user.name.split(' ')[0]}</span>
                 <button 
                  onClick={onLogout}
                  className="px-4 py-2 rounded-full border border-stone-300 text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors uppercase"
                 >
                   Salir
                 </button>
               </div>
            ) : (
              <div className="pl-4 border-l border-stone-200">
                <button 
                  onClick={() => handleNav(Section.LOGIN)} 
                  className="px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors uppercase shadow-sm"
                >
                  Acceso Alumnos
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-500 hover:text-stone-900 focus:outline-none p-2"
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  currentSection === item.value
                    ? 'text-brand-primary bg-brand-light'
                    : 'text-stone-600 hover:text-brand-primary hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => handleNav(Section.ADMIN)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium bg-stone-100 text-stone-900`}
              >
                PANEL ADMIN
              </button>
            )}
            <div className="border-t border-stone-100 mt-2 pt-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  CERRAR SESIÓN
                </button>
              ) : (
                <button
                  onClick={() => handleNav(Section.LOGIN)}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-stone-900 bg-stone-100"
                >
                  ACCESO ALUMNOS
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
