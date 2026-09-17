import React from 'react';
import { TabType } from '../types';
import { Home, Grid3X3, Users, Calculator } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'inicio', label: 'Inicio', icon: <Home className="w-5 h-5" /> },
    { id: 'catalogo', label: 'Catálogo', icon: <Grid3X3 className="w-5 h-5" /> },
    { id: 'nosotros', label: 'Nosotros', icon: <Users className="w-5 h-5" /> },
    { id: 'cotizar', label: 'Cotizar', icon: <Calculator className="w-5 h-5" /> },
  ];

  return (
    <nav
      id="mobile-bottom-navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e2e8f0] px-2 py-1 shadow-lg"
      aria-label="Navegación inferior móvil"
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-nav-${tab.id}`}
              onClick={() => {
                onSelectTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 min-w-[64px] transition-colors ${
                isActive ? 'text-[#00236f]' : 'text-[#64748b] hover:text-[#00236f]'
              }`}
            >
              <div
                className={`p-1 rounded-full transition-transform ${
                  isActive ? 'scale-110 text-[#00236f]' : ''
                }`}
              >
                {tab.icon}
              </div>
              <span
                className={`text-[11px] font-heading font-medium tracking-tight ${
                  isActive ? 'font-bold text-[#00236f]' : ''
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
