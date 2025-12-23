
import { WorkOrder, Asset } from '../types';

// import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

export const saveWorkOrder = async (order: Partial<WorkOrder>) => {
  console.log('Guardando orden en Firestore:', order);
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, id: 'NEW-' + Math.random().toString(36).substr(2, 9) };
};

export const fetchAssets = async (): Promise<Asset[]> => {
  // En producción: return getDocs(collection(db, 'assets'));
  return [];
};
