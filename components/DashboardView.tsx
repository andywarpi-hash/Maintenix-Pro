
import React from 'react';
import { ViewType } from '../types';

interface Props {
  onNavigate: (view: ViewType) => void;
}

const DashboardView: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background-dark/95 backdrop-blur-md border-b border-border-dark p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-slate-700 overflow-hidden border-2 border-primary/30">
            <img src="https://picsum.photos/100" alt="Avatar" />
          </div>
          <div>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">Maintenix Pro</p>
            <h2 className="text-base font-bold">Hola, Carlos</h2>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-surface-dark relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-background-dark"></span>
        </button>
      </header>

      {/* Metrics Section */}
      <section className="px-4 pt-6">
        <h3 className="text-lg font-bold mb-4">KPIs Generales</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-surface-dark p-4 rounded-xl border border-border-dark flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-xl">timer</span>
              <p className="text-[10px] uppercase font-bold text-text-secondary">TTR Promedio</p>
            </div>
            <p className="text-2xl font-bold">4.5h</p>
            <span className="text-[10px] text-emerald-500 font-bold">-12% vs mes ant.</span>
          </div>
          <div className="bg-surface-dark p-4 rounded-xl border border-border-dark flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-purple-500 text-xl">build_circle</span>
              <p className="text-[10px] uppercase font-bold text-text-secondary">MTTR Global</p>
            </div>
            <p className="text-2xl font-bold">24h</p>
            <span className="text-[10px] text-text-secondary">Meta: &lt; 20h</span>
          </div>
        </div>

        {/* Ratio Card */}
        <div className="bg-surface-dark p-5 rounded-xl border border-border-dark">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-text-secondary text-sm">Preventivo vs Correctivo</p>
              <p className="text-xl font-bold">Relación 65/35</p>
            </div>
            <span className="px-2 py-1 bg-background-dark rounded text-[10px] font-bold">Este Mes</span>
          </div>
          <div className="w-full h-3 rounded-full bg-background-dark overflow-hidden flex mb-3">
            <div className="h-full bg-primary" style={{ width: '65%' }}></div>
            <div className="h-full bg-orange-500" style={{ width: '35%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-text-secondary">
            <div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary"></span> Prev. 65%</div>
            <div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-orange-500"></span> Corr. 35%</div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 pt-8">
        <h3 className="text-lg font-bold mb-4">Gestión Rápida</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNavigate('assets')}
            className="p-6 rounded-xl bg-surface-dark border border-border-dark flex flex-col items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
            </div>
            <span className="text-sm font-bold">Activos</span>
          </button>
          <button 
            onClick={() => onNavigate('orders')}
            className="p-6 rounded-xl bg-surface-dark border border-border-dark flex flex-col items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="size-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">assignment</span>
            </div>
            <span className="text-sm font-bold">Órdenes</span>
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-4 pt-8">
        <h3 className="text-lg font-bold mb-3">Actividad Reciente</h3>
        <div className="space-y-3">
          <div className="p-4 bg-surface-dark/50 rounded-xl border border-border-dark flex items-start gap-4">
            <div className="size-2 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-bold">Falla Crítica: HVAC Unidad 3</p>
              <p className="text-xs text-text-secondary mt-0.5">Hace 15 min • Reportado por J. Pérez</p>
            </div>
            <span className="material-symbols-outlined text-text-secondary">chevron_right</span>
          </div>
          <div className="p-4 bg-surface-dark/50 rounded-xl border border-border-dark flex items-start gap-4">
            <div className="size-2 rounded-full bg-amber-500 mt-2 shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm font-bold">Stock Bajo: Filtros HEPA</p>
              <p className="text-xs text-text-secondary mt-0.5">Hace 1 hora • Sistema de Inventario</p>
            </div>
            <span className="material-symbols-outlined text-text-secondary">chevron_right</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardView;
