
export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'admin' | 'technician' | 'operations' | 'billing';
};

export enum WorkOrderStatus {
  PENDING = 'Pendiente',
  IN_PROGRESS = 'En Proceso',
  COMPLETED = 'Completado',
  CLOSED = 'Cerrado'
}

export enum Priority {
  LOW = 'Baja',
  MEDIUM = 'Media',
  HIGH = 'Alta',
  URGENT = 'Urgente'
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  status: 'Operativo' | 'En Reparación' | 'Fuera de Servicio';
  location: string;
  lastService: string;
  serialNumber?: string;
  imageUrl?: string;
}

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  assetId: string;
  assetName: string;
  assignedTo: string;
  status: WorkOrderStatus;
  priority: Priority;
  createdAt: string;
  dueDate: string;
  type: 'Preventivo' | 'Correctivo';
}

export type ViewType = 'dashboard' | 'assets' | 'orders' | 'profile' | 'create-order' | 'login';
