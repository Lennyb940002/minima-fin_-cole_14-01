import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthForm } from './components/auth/AuthForm';
import { Header } from './components/layout/Header';
import { EcommerceDashboard } from './components/dashboard/EcommerceDashboard';
import SeanceSport from './components/sport/SeanceSport';
import PersoView from './components/Personelle/PersoView';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
});

export const useAuth = () => useContext(AuthContext);

const MainContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isSportPage = location.pathname === '/sceance-sport';

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div
      className={`min-h-screen ${isSportPage ? 'bg-white text-black' : 'bg-black text-white'}`}
      style={{
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
      }}
    >
      <Header />
      <main className="max-w-7xl mx-auto py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/ecommerce" replace />} />
          <Route path="/ecommerce" element={<EcommerceDashboard />} />
          <Route path="/sceance-sport" element={<SeanceSport />} />
          <Route path="/suivi-personnel" element={<PersoView />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAuth = (email: string, password: string) => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route
            path="/auth"
            element={
              isAuthenticated ? (
                <Navigate to="/ecommerce" replace />
              ) : (
                <div className="min-h-screen bg-black flex items-center justify-center p-4">
                  <AuthForm
                    type={authType}
                    onSwitch={() => setAuthType(authType === 'login' ? 'register' : 'login')}
                    onSubmit={handleAuth}
                  />
                </div>
              )
            }
          />
          <Route path="/*" element={<MainContent />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;