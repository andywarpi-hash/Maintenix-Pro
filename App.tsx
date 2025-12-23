
import React, { useState, useEffect } from 'react';
import { ViewType, AuthUser, WorkOrder, Asset } from './types';
import { getCurrentUser, logout } from './services/auth';
import LoginView from './components/LoginView';
import DashboardView from './components/DashboardView';
import AssetsView from './components/AssetsView';
import WorkOrdersView from './components/WorkOrdersView';
import ProfileView from './components/ProfileView';
import CreateWorkOrderView from './components/CreateWorkOrderView';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const loggedUser = getCurrentUser();
    if (loggedUser) {
      setUser(loggedUser);
      setCurrentView('dashboard');
    }
  }, []);

  const handleLoginSuccess = (user: AuthUser) => {
    setUser(user);
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
  };

  if (currentView === 'login') {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white font-display">
      {/* Dynamic View Rendering */}
      <main className="flex-1 overflow-y-auto">
        {currentView === 'dashboard' && <DashboardView onNavigate={handleNavigate} />}
        {currentView === 'assets' && <AssetsView onNavigate={handleNavigate} />}
        {currentView === 'orders' && <WorkOrdersView onNavigate={handleNavigate} />}
        {currentView === 'profile' && <ProfileView user={user} onLogout={logout} onNavigate={handleNavigate} />}
        {currentView === 'create-order' && <CreateWorkOrderView onBack={() => handleNavigate('orders')} />}
      </main>

      {/* Persistence call to action - Navigation Bar */}
      {currentView !== 'create-order' && (
        <BottomNav activeView={currentView} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default App;
