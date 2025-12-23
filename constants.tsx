
import React from 'react';
import { Asset, WorkOrder, WorkOrderStatus, Priority } from './types';

export const MOCK_ASSETS: Asset[] = [
  {
    id: 'HVAC-004',
    name: 'Unidad HVAC #04',
    category: 'HVAC',
    status: 'Operativo',
    location: 'Azotea - Zona Norte',
    lastService: '2023-10-24',
    imageUrl: 'https://picsum.photos/id/100/400/300'
  },
  {
    id: 'CONV-A3-12',
    name: 'Conveyor Belt A3',
    category: 'Mecánico',
    status: 'En Reparación',
    location: 'Almacén B',
    lastService: '2023-09-15',
    imageUrl: 'https://picsum.photos/id/200/400/300'
  },
  {
    id: 'GEN-A-01',
    name: 'Generador Eléctrico CAT-200',
    category: 'Eléctrico',
    status: 'Operativo',
    location: 'Planta Baja - Sala B',
    lastService: '2023-10-10',
    imageUrl: 'https://picsum.photos/id/300/400/300'
  }
];

export const MOCK_ORDERS: WorkOrder[] = [
  {
    id: 'WO-1057',
    title: 'Mantenimiento Compresor Unidad 12',
    description: 'Revisión trimestral de filtros y lubricación.',
    assetId: 'COMP-12',
    assetName: 'Compressor Unit 12',
    assignedTo: 'Alex Johnson',
    status: WorkOrderStatus.IN_PROGRESS,
    priority: Priority.HIGH,
    createdAt: '2023-10-25',
    dueDate: '2023-10-28',
    type: 'Preventivo'
  },
  {
    id: 'WO-1024',
    title: 'Fuga de agua en bandeja',
    description: 'Limpieza inmediata de drenaje requerida.',
    assetId: 'HVAC-04',
    assetName: 'Unidad HVAC #04',
    assignedTo: 'Juan Pérez',
    status: WorkOrderStatus.PENDING,
    priority: Priority.URGENT,
    createdAt: '2023-10-26',
    dueDate: '2023-10-27',
    type: 'Correctivo'
  }
];
