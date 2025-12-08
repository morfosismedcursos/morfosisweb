
import React, { useState } from 'react';
import { USERS } from '../constants';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const foundUser = USERS.find(u => u.username === username && u.password === password);

    if (foundUser) {
      onLogin({ username: foundUser.username, name: foundUser.name });
    } else {
      setError('Credenciales incorrectas. Verifica tu usuario y contraseña proporcionados por el instructor.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-stone-100">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 mb-4">
             <img 
               src="/logo.png" 
               alt="Morfosis Logo" 
               className="w-full h-full object-contain"
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
               }}
             />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-stone-900 tracking-tight">
            Acceso a Alumnos
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Ingresa las credenciales proporcionadas en tu inscripción para acceder a las grabaciones y notas.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Nombre de usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-lg focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm bg-stone-50"
                placeholder="Nombre de usuario"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-lg focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm bg-stone-50"
                placeholder="Contraseña"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-md">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors shadow-lg"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
