import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { TerminalText } from './TerminalText';
import React from 'react';
import { useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const isSportPage = location.pathname === '/sceance-sport';

  return (
    <header
      className={`${isSportPage ? 'bg-white' : 'bg-black'} p-6 flex items-center justify-between`}
      style={{
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
      }}
    >
      <Logo />
      <Navigation />
      <TerminalText />
    </header>
  );
}