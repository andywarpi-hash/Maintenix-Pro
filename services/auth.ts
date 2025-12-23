
import { AuthUser } from '../types';

// En un entorno real, aquí se importaría 'firebase/auth'
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const loginWithGoogle = async (): Promise<AuthUser> => {
  // Simulación de delay de red
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // En producción:
  // const provider = new GoogleAuthProvider();
  // const result = await signInWithPopup(getAuth(), provider);
  
  const mockUser: AuthUser = {
    uid: 'mock-123',
    email: 'carlos.admin@maintenix.com',
    displayName: 'Carlos Admin',
    photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocL...',
    role: 'admin'
  };
  
  localStorage.setItem('maintenix_user', JSON.stringify(mockUser));
  return mockUser;
};

export const logout = () => {
  localStorage.removeItem('maintenix_user');
  window.location.reload();
};

export const getCurrentUser = (): AuthUser | null => {
  const saved = localStorage.getItem('maintenix_user');
  return saved ? JSON.parse(saved) : null;
};
