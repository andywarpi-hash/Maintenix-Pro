
import React from 'react';
import { AuthUser, ViewType } from '../types';

interface Props {
  user: AuthUser | null;
  onLogout: () => void;
  onNavigate: (view: ViewType) => void;
}

const ProfileView: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <div className="p-4 pb-32">
      <h1 className="text-xl font-bold text-center mb-8">Perfil</h1>
      
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="size-28 rounded-full border-4 border-primary/20 bg-surface-dark overflow-hidden">
          <img src={user?.photoURL || 'https://picsum.photos/200'} alt="Profile" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{user?.displayName || 'Usuario'}</h2>
          <p className="text-text-secondary">{user?.email}</p>
          <span className="mt-2 inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest border border-primary/20">
            {user?.role}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-2">Preferencias</h3>
        <div className="bg-surface-dark rounded-2xl overflow-hidden border border-border-dark">
          <div className="flex items-center gap-4 p-4 border-b border-border-dark cursor-pointer hover:bg-white/5">
            <span className="material-symbols-outlined text-primary">language</span>
            <p className="flex-1 font-medium">Idioma</p>
            <span className="text-sm text-text-secondary">Español</span>
            <span className="material-symbols-outlined text-text-secondary">chevron_right</span>
          </div>
          <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5">
            <span className="material-symbols-outlined text-purple-500">dark_mode</span>
            <p className="flex-1 font-medium">Modo Oscuro</p>
            <div className="w-10 h-6 bg-primary rounded-full relative">
              <div className="absolute right-1 top-1 size-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-2 mt-8">Privacidad</h3>
        <div className="bg-surface-dark rounded-2xl overflow-hidden border border-border-dark">
          <div className="flex items-center gap-4 p-4 border-b border-border-dark cursor-pointer hover:bg-white/5">
            <span className="material-symbols-outlined text-emerald-500">photo_camera</span>
            <p className="flex-1 font-medium">Acceso a Cámara</p>
            <div className="w-10 h-6 bg-primary rounded-full relative">
              <div className="absolute right-1 top-1 size-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full mt-12 flex items-center justify-center gap-2 p-4 bg-red-500/10 text-red-500 font-bold rounded-2xl border border-red-500/20 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">logout</span>
          Cerrar Sesión
        </button>
      </div>

      <p className="text-center text-[10px] text-text-secondary mt-12 opacity-50">
        Maintenix Pro v1.0.0 (Build 2024)<br/>
        &copy; 2024 Industrial Solutions
      </p>
    </div>
  );
};

export default ProfileView;
