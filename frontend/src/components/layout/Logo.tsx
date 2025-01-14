// Logo.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../../services/auth';
import { useAuth } from '../../App'; // Importer le hook useAuth

export function Logo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Utiliser le hook useAuth
  const isSportPage = location.pathname === '/sceance-sport';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogoClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    try {
      authApi.logout();
      setIsAuthenticated(false); // Mettre à jour l'état d'authentification
      setIsDropdownOpen(false);
      navigate('/auth', { replace: true });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Ajout d'un gestionnaire de clic extérieur pour fermer le dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative">
      <div
        onClick={(e) => {
          e.stopPropagation(); // Empêche la propagation du clic
          handleLogoClick();
        }}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
      >
        <img
          src={isSportPage ? "/src/image/lgogo.png" : "/src/image/logo.png"}
          alt="Logo"
          className="h-24 w-24"
        />
        <span
          className={`text-2xl font ${isSportPage ? 'text-black' : 'text-white'}`}
        >
          Minima
        </span>
      </div>
      {isDropdownOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg p-4 z-50">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 border border-red-500 text-red-500 transition-colors rounded-lg hover:bg-red-500 hover:text-white"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}