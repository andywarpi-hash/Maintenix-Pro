
import React from 'react';
import { ViewType, WorkOrderStatus, Priority } from '../types';
import { MOCK_ORDERS } from '../constants';

interface Props {
  onNavigate: (view: ViewType) => void;
}

const WorkOrdersView: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="pb-24">
      <header className="sticky top-0 z-30 bg-background-dark/95 backdrop-blur-md border-b border-border-dark p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-center flex-1">Órdenes de Trabajo</h1>
        <button 
          onClick={() => onNavigate('create-order')}
          className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20">Todas</button>
          <button className="px-4 py-2 rounded-full bg-surface-dark border border-border-dark text-text-secondary text-xs font-bold">Pendientes</button>
          <button className="px-4 py-2 rounded-full bg-surface-dark border border-border-dark text-text-secondary text-xs font-bold">En Proceso</button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {MOCK_ORDERS.map(order => (
            <div key={order.id} className="p-4 bg-surface-dark rounded-xl border border-border-dark flex flex-col gap-3 group">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{order.id}</span>
                  <h4 className="font-bold text-base mt-1 line-clamp-2">{order.title}</h4>
                </div>
                <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {order.assignedTo.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase">
                <div className="flex items-center gap-1.5">
                  <span className={`size-2 rounded-full ${order.status === WorkOrderStatus.IN_PROGRESS ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
                  <span className={order.status === WorkOrderStatus.IN_PROGRESS ? 'text-orange-500' : 'text-blue-500'}>{order.status}</span>
                </div>
                <div className="flex items-center gap-1 text-red-500">
                  <span className="material-symbols-outlined text-sm">local_fire_department</span>
                  <span>{order.priority}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkOrdersView;
