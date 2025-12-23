
import React, { useState } from 'react';
import { loginWithGoogle } from '../services/auth';
import { AuthUser } from '../types';

interface Props {
  onLoginSuccess: (user: AuthUser) => void;
}

const LoginView: React.FC<Props> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginWithGoogle();
      onLoginSuccess(user);
    } catch (err) {
      console.error('Login failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark overflow-hidden font-display">
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
      
      <div className="flex grow flex-col items-center justify-between px-6 py-10 z-10">
        <div className="w-full flex flex-col items-center mt-12">
          <div className="group relative mb-8 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-lg transition-transform duration-500 hover:scale-105">
            <div className="absolute inset-0 rounded-3xl bg-white/10 blur-[1px]"></div>
            <span className="material-symbols-outlined text-white text-[3.5rem] drop-shadow-md filled">precision_manufacturing</span>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white font-logo">
              Maintenix <span className="font-light text-text-secondary">Pro</span>
            </h1>
            <p className="mt-2 text-sm font-medium text-primary tracking-wide uppercase">CMMS Industrial</p>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="bg-surface-dark rounded-2xl p-8 border border-border-dark shadow-xl">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold">Bienvenido</h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Acceso seguro vía Google Workspace para gestionar activos y mantenimiento.
                </p>
              </div>

              <button 
                onClick={handleLogin}
                disabled={loading}
                className="relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 text-slate-900 shadow-sm hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
              >
                {!loading ? (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                    </svg>
                    <span className="text-base font-bold tracking-tight">Iniciar con Google</span>
                  </>
                ) : (
                  <span className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></span>
                )}
              </button>

              <div className="pt-2 flex justify-center gap-4 border-t border-border-dark w-full mt-2 text-text-secondary">
                <span className="material-symbols-outlined text-xl">table_chart</span>
                <span className="material-symbols-outlined text-xl">add_to_drive</span>
                <span className="material-symbols-outlined text-xl">description</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full text-center py-4 flex justify-center items-center space-x-6 text-text-secondary text-xs">
          <a href="#" className="hover:text-white">Términos</a>
          <span className="h-1 w-1 rounded-full bg-slate-700"></span>
          <a href="#" className="hover:text-white">Privacidad</a>
          <span className="h-1 w-1 rounded-full bg-slate-700"></span>
          <a href="#" className="hover:text-white">Ayuda</a>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
