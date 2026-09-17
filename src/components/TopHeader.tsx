import React from 'react';
import { TabType } from '../types';
import { Menu, Phone, User, Sliders, Shield } from 'lucide-react';

interface TopHeaderProps {
  currentTab: TabType;
  onOpenMobileSidebar: () => void;
  onSelectTab: (tab: TabType) => void;
  phone: string;
  email: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentTab,
  onOpenMobileSidebar,
  onSelectTab,
  phone,
  email,
}) => {
  const getTabLabel = (tab: TabType) => {
    switch (tab) {
      case 'inicio':
        return 'INICIO';
      case 'catalogo':
        return 'CATÁLOGO';
      case 'nosotros':
        return 'NOSOTROS';
      case 'cotizar':
        return 'COTIZAR';
      case 'admin':
        return 'PANEL DE CONTROL';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] transition-all">
      {/* Top micro-bar with contact info and certification */}
      <div className="bg-[#f0f5fc] text-[#1e3a8a] text-xs font-semibold px-4 py-1.5 border-b border-[#e2e8f0]/60 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate text-[11px] sm:text-xs">
          <span className="flex items-center gap-1 font-heading text-[#0284c7]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse"></span>
            FÁBRICA · INSTALACIÓN · A MEDIDA
          </span>
          <span className="hidden md:inline text-slate-300">/</span>
          <a
            href={`mailto:${email}`}
            className="hidden md:inline hover:underline text-[#475569] font-normal"
          >
            {email}
          </a>
        </div>

        <div className="flex items-center gap-3 text-[11px] sm:text-xs">
          <span className="hidden sm:flex items-center gap-1 bg-[#dbeafe] text-[#1e40af] px-2 py-0.5 rounded font-heading font-bold text-[10px]">
            <Shield className="w-3 h-3 text-[#1e40af]" />
            25+ AÑOS
          </span>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="font-medium hover:text-[#00236f] flex items-center gap-1 text-[#1e3a8a]"
          >
            <Phone className="w-3 h-3 text-[#0284c7]" />
            <span>{phone}</span>
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger menu button */}
          <button
            id="mobile-menu-trigger-button"
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 -ml-2 rounded-lg text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand & Section Indicator */}
          <div
            onClick={() => onSelectTab('inicio')}
            className="cursor-pointer flex items-center gap-2.5"
            id="top-brand-indicator"
          >
            {/* 4-panes grid icon like in screenshot */}
            <div className="w-8 h-8 rounded-md bg-[#00236f] text-white flex items-center justify-center shadow-xs">
              <div className="grid grid-cols-2 gap-0.5 w-4 h-4 p-0.5">
                <div className="border border-white/80 bg-white/30 rounded-[0.5px]"></div>
                <div className="border border-white/80 bg-white/30 rounded-[0.5px]"></div>
                <div className="border border-white/80 bg-white/30 rounded-[0.5px]"></div>
                <div className="border border-white/80 bg-white/30 rounded-[0.5px]"></div>
              </div>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#00236f] tracking-tight font-heading leading-tight">
                Ventanas y Aluminios
              </h2>
              <p className="text-[10px] sm:text-[11px] font-bold text-[#64748b] tracking-widest font-heading uppercase">
                {getTabLabel(currentTab)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Action Icons (Phone and User/Admin as seen in screenshots) */}
        <div className="flex items-center gap-2">
          {/* Direct Call Button */}
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            id="header-call-button"
            className="p-2.5 rounded-full bg-[#f1f5f9] text-[#1e3a8a] hover:bg-[#e2e8f0] transition-colors flex items-center justify-center shadow-xs"
            title="Llamar al taller"
            aria-label="Llamar"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Quick Cotizar CTA button for desktop */}
          <button
            id="header-cotizar-cta-button"
            onClick={() => onSelectTab('cotizar')}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-semibold shadow-xs transition-colors font-heading"
          >
            <span>Cotizar Proyecto</span>
          </button>

          {/* Admin / Profile button */}
          <button
            id="header-admin-button"
            onClick={() => onSelectTab(currentTab === 'admin' ? 'inicio' : 'admin')}
            className={`p-2.5 rounded-full transition-colors flex items-center justify-center shadow-xs ${
              currentTab === 'admin'
                ? 'bg-[#00236f] text-white ring-2 ring-blue-300'
                : 'bg-[#f1f5f9] text-[#1e3a8a] hover:bg-[#e2e8f0]'
            }`}
            title="Panel de Control (Admin)"
            aria-label="Panel de Control"
          >
            {currentTab === 'admin' ? (
              <Sliders className="w-4 h-4" />
            ) : (
              <User className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
