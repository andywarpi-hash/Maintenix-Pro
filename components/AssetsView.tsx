
import React, { useState } from 'react';
import { ViewType, Asset } from '../types';
import { MOCK_ASSETS } from '../constants';

interface Props {
  onNavigate: (view: ViewType) => void;
}

const AssetsView: React.FC<Props> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = MOCK_ASSETS.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-30 bg-background-dark/95 backdrop-blur-md border-b border-border-dark p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-center flex-1">Activos</h1>
        <button className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <div className="px-4 py-4 sticky top-[68px] z-20 bg-background-dark/95">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary">search</span>
            <input 
              type="text" 
              placeholder="Buscar por nombre o ID..."
              className="w-full h-12 bg-surface-dark border-none rounded-xl pl-12 text-sm focus:ring-1 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="size-12 rounded-xl bg-surface-dark flex items-center justify-center text-text-secondary">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
      </div>

      <div className="px-4 space-y-3">
        {filteredAssets.length > 0 ? (
          filteredAssets.map(asset => (
            <div key={asset.id} className="p-4 bg-surface-dark rounded-xl border border-border-dark flex items-center gap-4 hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold truncate">{asset.name}</h4>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`size-2.5 rounded-full ${asset.status === 'Operativo' ? 'bg-emerald-500' : asset.status === 'En Reparación' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                    <span className="text-[10px] font-bold text-text-secondary">{asset.status}</span>
                  </div>
                </div>
                <p className="text-xs text-text-secondary">ID: {asset.id} • {asset.location}</p>
                <div className="flex gap-2 mt-2">
                   <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/20">
                     {asset.category}
                   </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-border-dark">arrow_forward_ios</span>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <div className="size-20 bg-surface-dark rounded-full mx-auto flex items-center justify-center mb-4 text-text-secondary">
              <span className="material-symbols-outlined text-4xl">inventory_2</span>
            </div>
            <p className="text-text-secondary font-medium">No se encontraron activos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsView;
