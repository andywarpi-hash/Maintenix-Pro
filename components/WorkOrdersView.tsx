
import React, { useState, useMemo } from 'react';
import { ViewType, WorkOrderStatus, Priority, WorkOrder } from '../types';
import { MOCK_ORDERS } from '../constants';

interface Props {
  onNavigate: (view: ViewType) => void;
}

type SortField = 'none' | 'assignedTo' | 'dueDate';
type SortDirection = 'asc' | 'desc';

const WorkOrdersView: React.FC<Props> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<WorkOrderStatus | 'Todas'>('Todas');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'Todas'>('Todas');
  const [sortField, setSortField] = useState<SortField>('none');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm !== '') count++;
    if (selectedStatus !== 'Todas') count++;
    if (selectedPriority !== 'Todas') count++;
    if (sortField !== 'none') count++;
    return count;
  }, [searchTerm, selectedStatus, selectedPriority, sortField]);

  const filteredAndSortedOrders = useMemo(() => {
    let result = MOCK_ORDERS.filter(order => {
      const matchesSearch = 
        order.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'Todas' || order.status === selectedStatus;
      const matchesPriority = selectedPriority === 'Todas' || order.priority === selectedPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });

    if (sortField !== 'none') {
      result = [...result].sort((a, b) => {
        let valA = '';
        let valB = '';

        if (sortField === 'assignedTo') {
          valA = a.assignedTo.toLowerCase();
          valB = b.assignedTo.toLowerCase();
        } else if (sortField === 'dueDate') {
          valA = a.dueDate;
          valB = b.dueDate;
        }

        const comparison = valA.localeCompare(valB);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [searchTerm, selectedStatus, selectedPriority, sortField, sortDirection]);

  const handleExportCSV = () => {
    if (filteredAndSortedOrders.length === 0) return;

    // Headers
    const headers = ['ID', 'Título', 'Activo', 'Técnico', 'Estado', 'Prioridad', 'Creación', 'Vencimiento', 'Tipo'];
    
    // Convert orders to rows
    const rows = filteredAndSortedOrders.map(order => [
      order.id,
      `"${order.title.replace(/"/g, '""')}"`, // Escape quotes
      `"${order.assetName.replace(/"/g, '""')}"`,
      order.assignedTo,
      order.status,
      order.priority,
      order.createdAt,
      order.dueDate,
      order.type
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `maintenix_ordenes_${date}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusOptions: (WorkOrderStatus | 'Todas')[] = [
    'Todas', 
    WorkOrderStatus.PENDING, 
    WorkOrderStatus.IN_PROGRESS, 
    WorkOrderStatus.COMPLETED, 
    WorkOrderStatus.CLOSED
  ];

  const priorityOptions: (Priority | 'Todas')[] = [
    'Todas', 
    Priority.LOW, 
    Priority.MEDIUM, 
    Priority.HIGH, 
    Priority.URGENT
  ];

  const isFiltered = activeFiltersCount > 0;

  const getPriorityStyles = (priority: Priority) => {
    switch (priority) {
      case Priority.URGENT: return 'text-red-500 bg-red-500/10 border-red-500/20';
      case Priority.HIGH: return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case Priority.MEDIUM: return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case Priority.LOW: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-text-secondary bg-surface-dark border-border-dark';
    }
  };

  const getStatusColor = (status: WorkOrderStatus) => {
    switch (status) {
      case WorkOrderStatus.IN_PROGRESS: return 'bg-orange-500';
      case WorkOrderStatus.PENDING: return 'bg-blue-500';
      case WorkOrderStatus.COMPLETED: return 'bg-emerald-500';
      case WorkOrderStatus.CLOSED: return 'bg-slate-500';
      default: return 'bg-slate-500';
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('Todas');
    setSelectedPriority('Todas');
    setSortField('none');
    setSortDirection('asc');
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-30 bg-background-dark/95 backdrop-blur-md border-b border-border-dark p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-center flex-1 font-logo pl-10">Órdenes</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleExportCSV}
            title="Exportar CSV"
            className="size-10 rounded-xl border border-border-dark bg-surface-dark text-text-secondary flex items-center justify-center active:scale-90 transition-all hover:text-primary hover:border-primary/50"
          >
            <span className="material-symbols-outlined text-xl">download</span>
          </button>
          <button 
            onClick={() => onNavigate('create-order')}
            className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold active:scale-90 transition-transform shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </header>

      <div className="px-4 py-4 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-xl">search</span>
          <input 
            type="text" 
            placeholder="Buscar por ID o título..."
            className="w-full h-12 bg-surface-dark border-border-dark border rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Selection Section */}
        <div className="space-y-4">
          {/* Status Filters */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-1.5">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Estado</p>
                {selectedStatus !== 'Todas' && (
                  <span className="size-1.5 rounded-full bg-primary shadow-[0_0_4px] shadow-primary animate-pulse"></span>
                )}
              </div>
              {selectedStatus !== 'Todas' && (
                <button onClick={() => setSelectedStatus('Todas')} className="text-[10px] font-bold text-primary uppercase">Limpiar</button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    selectedStatus === status 
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-surface-dark border-border-dark text-text-secondary hover:border-text-secondary/30'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filters */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-1.5">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Prioridad</p>
                {selectedPriority !== 'Todas' && (
                  <span className="size-1.5 rounded-full bg-primary shadow-[0_0_4px] shadow-primary animate-pulse"></span>
                )}
              </div>
              {selectedPriority !== 'Todas' && (
                <button onClick={() => setSelectedPriority('Todas')} className="text-[10px] font-bold text-primary uppercase">Limpiar</button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              {priorityOptions.map(priority => (
                <button
                  key={priority}
                  onClick={() => setSelectedPriority(priority)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    selectedPriority === priority 
                      ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20' 
                      : 'bg-surface-dark border-border-dark text-text-secondary hover:border-text-secondary/30'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting Options */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-1.5">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Ordenar por</p>
                {sortField !== 'none' && (
                  <span className="size-1.5 rounded-full bg-primary shadow-[0_0_4px] shadow-primary animate-pulse"></span>
                )}
              </div>
              {sortField !== 'none' && (
                <button onClick={() => setSortField('none')} className="text-[10px] font-bold text-primary uppercase">Por Defecto</button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              <button
                onClick={() => toggleSort('assignedTo')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                  sortField === 'assignedTo' 
                    ? 'bg-surface-dark border-primary text-primary shadow-lg shadow-primary/5' 
                    : 'bg-surface-dark border-border-dark text-text-secondary hover:border-text-secondary/30'
                }`}
              >
                <span className="material-symbols-outlined text-sm">person</span>
                Técnico
                {sortField === 'assignedTo' && (
                  <span className="material-symbols-outlined text-sm">
                    {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                )}
              </button>

              <button
                onClick={() => toggleSort('dueDate')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                  sortField === 'dueDate' 
                    ? 'bg-surface-dark border-primary text-primary shadow-lg shadow-primary/5' 
                    : 'bg-surface-dark border-border-dark text-text-secondary hover:border-text-secondary/30'
                }`}
              >
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                Vencimiento
                {sortField === 'dueDate' && (
                  <span className="material-symbols-outlined text-sm">
                    {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Prominent Clear All Filters Button */}
        {isFiltered && (
          <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <button 
              onClick={resetFilters}
              className="w-full py-4 bg-primary/10 border border-primary/40 text-primary font-black text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 active:scale-[0.97] transition-all hover:bg-primary/20 hover:border-primary shadow-lg shadow-primary/5"
            >
              <span className="material-symbols-outlined text-lg">filter_alt_off</span>
              Limpiar filtros activos ({activeFiltersCount})
            </button>
          </div>
        )}

        {/* List Header */}
        <div className="flex justify-between items-center px-1 pt-2">
           <h3 className="text-sm font-bold text-white/90">{filteredAndSortedOrders.length} Órdenes encontradas</h3>
           {isFiltered && (
             <button onClick={resetFilters} className="text-[10px] font-bold text-primary uppercase flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
               <span className="material-symbols-outlined text-xs">refresh</span>
               Restablecer Todo
             </button>
           )}
        </div>

        {/* List of Work Orders */}
        <div className="space-y-4">
          {filteredAndSortedOrders.length > 0 ? (
            filteredAndSortedOrders.map(order => (
              <div 
                key={order.id} 
                className="p-4 bg-surface-dark rounded-2xl border border-border-dark flex flex-col gap-4 group active:scale-[0.98] transition-all cursor-pointer hover:border-primary/40 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-black text-text-secondary uppercase tracking-tighter bg-background-dark px-1.5 py-0.5 rounded border border-border-dark">
                        {order.id}
                      </span>
                      <span className="text-[10px] font-bold text-primary/80 uppercase tracking-widest">{order.type}</span>
                    </div>
                    <h4 className="font-bold text-base line-clamp-2 leading-tight text-white group-hover:text-primary transition-colors">
                      {order.title}
                    </h4>
                  </div>
                  <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0 shadow-inner">
                    {order.assignedTo.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background-dark/50 border border-border-dark">
                        <span className={`size-2 rounded-full ${getStatusColor(order.status)} shadow-[0_0_8px] shadow-current`}></span>
                        <span className="text-[10px] font-bold text-white/90 uppercase">{order.status}</span>
                      </div>
                      
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${getPriorityStyles(order.priority)}`}>
                        <span className="material-symbols-outlined text-[14px]">priority_high</span>
                        <span className="text-[10px] font-bold uppercase">{order.priority}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border-dark/30 pt-3">
                    <div className="flex items-center gap-2 group/tech">
                      <div className="size-6 rounded-full bg-slate-700/50 flex items-center justify-center border border-border-dark">
                        <span className="material-symbols-outlined text-[12px] text-text-secondary">person</span>
                      </div>
                      <span className="text-[11px] text-text-secondary font-bold group-hover/tech:text-white transition-colors">{order.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-text-secondary font-bold">
                      <span className="material-symbols-outlined text-sm text-primary/70">event</span>
                      {order.dueDate}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="size-20 bg-surface-dark rounded-3xl flex items-center justify-center mb-6 text-text-secondary/20 rotate-12">
                <span className="material-symbols-outlined text-5xl">manage_search</span>
              </div>
              <h4 className="text-lg font-bold mb-2">Sin coincidencias</h4>
              <p className="text-text-secondary text-sm px-10 leading-relaxed">
                No hay órdenes que coincidan con los filtros aplicados en este momento. Intenta ajustar tu búsqueda o el orden.
              </p>
              <button 
                onClick={resetFilters}
                className="mt-6 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/30 active:scale-95 transition-transform"
              >
                Restablecer Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkOrdersView;
