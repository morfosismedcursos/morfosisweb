import React, { useState } from 'react';
import { Section, User } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Recordings } from './components/Recordings';
import { Notes } from './components/Notes';
import { Socials } from './components/Socials';
import { AITutor } from './components/AITutor';
import { Login } from './components/Login';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [previousSection, setPreviousSection] = useState<Section>(Section.HOME);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    // Return to the previous section or default to recordings
    if (previousSection && previousSection !== Section.LOGIN) {
      setCurrentSection(previousSection);
    } else {
      setCurrentSection(Section.RECORDINGS);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentSection(Section.HOME);
  };

  const handleTriggerLogin = () => {
    setPreviousSection(currentSection);
    setCurrentSection(Section.LOGIN);
  };

  const renderContent = () => {
    switch (currentSection) {
      case Section.HOME:
        return (
          <>
            <Hero onNavigate={setCurrentSection} />
            <div className="bg-white border-t border-stone-200">
               {/* Show preview of recordings on home page with ability to lock */}
               <Recordings user={user} onTriggerLogin={handleTriggerLogin} />
            </div>
            <Socials />
          </>
        );
      case Section.RECORDINGS:
        // No longer returning Login component immediately. We pass user state down.
        return <Recordings user={user} onTriggerLogin={handleTriggerLogin} />;
      
      case Section.NOTES:
        return <Notes user={user} onTriggerLogin={handleTriggerLogin} />;
      
      case Section.SOCIALS:
        return <Socials />;
      
      case Section.AI_TUTOR:
        // AI Tutor remains fully private
        if (!user) return <Login onLogin={handleLogin} />;
        return <AITutor />;
        
      case Section.LOGIN:
        return <Login onLogin={handleLogin} />;
        
      default:
        return <Hero onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <Navbar 
        currentSection={currentSection} 
        onNavigate={setCurrentSection} 
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-stone-900 text-stone-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-2xl font-extrabold text-white tracking-widest uppercase">MORFOSIS</span>
            <p className="mt-4 text-sm text-stone-400 max-w-xs">
              Tu portal definitivo para el aprendizaje de la embriología humana. Ciencia, detalle y pasión por la enseñanza.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setCurrentSection(Section.RECORDINGS)} className="hover:text-brand-primary transition-colors">Clases Grabadas</button></li>
              <li><button onClick={() => setCurrentSection(Section.NOTES)} className="hover:text-brand-primary transition-colors">Material Descargable</button></li>
              <li><button onClick={() => setCurrentSection(Section.AI_TUTOR)} className="hover:text-brand-primary transition-colors">Tutor Virtual</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contacto</h3>
            <p className="text-sm text-stone-400">
              ¿Dudas sobre el curso?
              <br />
              <a href="mailto:contacto@morfosis.com" className="text-brand-primary hover:text-red-400 mt-2 inline-block">contacto@morfosis.com</a>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
          &copy; {new Date().getFullYear()} MORFOSIS. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default App;