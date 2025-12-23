
import React from 'react';
import { ViewType } from '../types';

interface Props {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const BottomNav: React.FC<Props> = ({ activeView, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-dark/95 backdrop-blur-md border-t border-border-dark h-[84px] px-6">
      <div className="flex items-center justify-between h-full max-w-md mx-auto relative">
        <button 
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'dashboard' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
        >
          <span className={`material-symbols-outlined ${activeView === 'dashboard' ? 'filled' : ''}`}>home</span>
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        
        <button 
          onClick={() => onNavigate('assets')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'assets' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
        >
          <span className={`material-symbols-outlined ${activeView === 'assets' ? 'filled' : ''}`}>inventory_2</span>
          <span className="text-[10px] font-bold">Activos</span>
        </button>

        {/* Action Button */}
        <div className="relative -top-5">
           <button 
             onClick={() => onNavigate('create-order')}
             className="size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center active:scale-95 transition-transform"
           >
             <span className="material-symbols-outlined text-3xl">add</span>
           </button>
        </div>

        <button 
          onClick={() => onNavigate('orders')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'orders' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
        >
          <span className={`material-symbols-outlined ${activeView === 'orders' ? 'filled' : ''}`}>assignment</span>
          <span className="text-[10px] font-bold">Órdenes</span>
        </button>
        
        <button 
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'profile' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
        >
          <span className={`material-symbols-outlined ${activeView === 'profile' ? 'filled' : ''}`}>person</span>
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
