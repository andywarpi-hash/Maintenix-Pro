
import React, { useState } from 'react';
import { Priority, WorkOrder } from '../types';
import { saveWorkOrder } from '../services/firestore';

interface Props {
  onBack: () => void;
}

const CreateWorkOrderView: React.FC<Props> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<WorkOrder>>({
    title: '',
    description: '',
    priority: Priority.MEDIUM,
    type: 'Correctivo'
  });

  const handleSubmit = async () => {
    if (!formData.title) return;
    setLoading(true);
    await saveWorkOrder(formData);
    setLoading(false);
    onBack();
  };

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      <header className="p-4 border-b border-border-dark flex items-center justify-between sticky top-0 bg-background-dark z-10">
        <button onClick={onBack} className="p-2 -ml-2"><span className="material-symbols-outlined">arrow_back</span></button>
        <h2 className="font-bold">Nueva Orden</h2>
        <button 
          onClick={handleSubmit}
          disabled={loading || !formData.title}
          className="text-primary font-bold disabled:opacity-30"
        >
          {loading ? '...' : 'Guardar'}
        </button>
      </header>

      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-text-secondary">Título de la Orden *</label>
          <input 
            type="text" 
            placeholder="Ej. Fuga en compresor A2"
            className="w-full bg-surface-dark border-border-dark rounded-xl h-14 px-4 focus:ring-primary"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-text-secondary">Descripción</label>
          <textarea 
            placeholder="Detalle el problema observado..."
            className="w-full bg-surface-dark border-border-dark rounded-xl min-h-[120px] p-4 focus:ring-primary"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-text-secondary">Prioridad</label>
          <div className="flex p-1 bg-surface-dark rounded-xl border border-border-dark">
            {[Priority.LOW, Priority.MEDIUM, Priority.HIGH, Priority.URGENT].map((p) => (
              <button
                key={p}
                onClick={() => setFormData({...formData, priority: p})}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${formData.priority === p ? 'bg-primary text-white shadow-sm' : 'text-text-secondary'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
           <button className="w-full h-14 border-2 border-dashed border-border-dark rounded-xl text-primary font-bold flex items-center justify-center gap-2 bg-primary/5 hover:bg-primary/10 transition-colors">
             <span className="material-symbols-outlined">add_to_drive</span>
             Adjuntar Evidencia
           </button>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-border-dark bg-background-dark">
         <button 
           onClick={handleSubmit}
           disabled={loading || !formData.title}
           className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all disabled:opacity-50"
         >
           Crear Orden de Trabajo
         </button>
      </div>
    </div>
  );
};

export default CreateWorkOrderView;
