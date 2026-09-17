import React from 'react';
import { TabType } from '../types';
import { 
  Home, 
  Grid3X3, 
  Users, 
  Calculator, 
  Phone, 
  Mail, 
  X, 
  ShieldCheck, 
  MessageCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  phone: string;
  email: string;
  whatsappNumber: string;
  quotingEnabled: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  mobileOpen,
  onCloseMobile,
  phone,
  email,
  whatsappNumber,
  quotingEnabled,
}) => {
  const navItems: { tab: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { tab: 'inicio', label: 'Inicio', icon: <Home className="w-5 h-5" /> },
    { tab: 'catalogo', label: 'Catálogo', icon: <Grid3X3 className="w-5 h-5" />, badge: '4 Líneas' },
    { tab: 'nosotros', label: 'Nosotros', icon: <Users className="w-5 h-5" /> },
  ];

  if (quotingEnabled) {
    navItems.push({
      tab: 'cotizar',
      label: 'Cotizar',
      icon: <Calculator className="w-5 h-5" />,
      badge: 'Plano Escala',
    });
  }

  const handleNavClick = (tab: TabType) => {
    onSelectTab(tab);
    onCloseMobile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hola Ventanas y Aluminios, quiero cotizar un proyecto a medida.'
  )}`;

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#e2e8f0] flex items-center justify-between">
        <div 
          onClick={() => handleNavClick('inicio')}
          className="cursor-pointer group flex items-center gap-3"
          id="sidebar-logo-button"
        >
          {/* Architectural Window Grid Icon */}
          <div className="w-10 h-10 rounded-lg bg-[#00236f] flex items-center justify-center shadow-md text-white transition-transform group-hover:scale-105">
            <div className="grid grid-cols-2 gap-1 w-6 h-6 p-0.5 border border-white/40 rounded-sm">
              <div className="border border-white/60 bg-blue-300/30 rounded-[1px]"></div>
              <div className="border border-white/60 bg-blue-300/30 rounded-[1px]"></div>
              <div className="border border-white/60 bg-blue-300/30 rounded-[1px]"></div>
              <div className="border border-white/60 bg-blue-300/30 rounded-[1px]"></div>
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold text-[#00236f] tracking-tight font-heading leading-tight">
              Ventanas y Aluminios
            </h1>
            <p className="text-[11px] font-semibold tracking-wider text-[#64748b] uppercase font-heading">
              Fabricación a Medida
            </p>
          </div>
        </div>

        {/* Close button for mobile drawer */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-md text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
          id="sidebar-close-mobile-button"
          aria-label="Cerrar menú"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Experience pill badge */}
      <div className="px-6 py-3 bg-[#f8fafc] border-b border-[#e2e8f0]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
          <span className="text-xs font-semibold text-[#1e3a8a] tracking-wide uppercase font-heading">
            25+ Años de Confianza
          </span>
        </div>
        <span className="text-[10px] bg-[#dbeafe] text-[#1e40af] font-bold px-1.5 py-0.5 rounded">
          Norma NSR
        </span>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <p className="px-3 pb-2 text-[11px] font-bold tracking-wider text-[#94a3b8] uppercase font-heading">
          Navegación
        </p>

        {navItems.map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.tab}
              id={`sidebar-nav-${item.tab}`}
              onClick={() => handleNavClick(item.tab)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                isActive
                  ? 'bg-[#00236f] text-white shadow-sm font-semibold'
                  : 'text-[#334155] hover:bg-[#f1f5f9] hover:text-[#00236f]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-[#64748b]'}>
                  {item.icon}
                </span>
                <span className="font-heading">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#e0e7ff] text-[#1e3a8a]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick action button for Cotización */}
        {quotingEnabled && (
          <div className="pt-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] border border-[#bfdbfe]">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-[#1e40af]" />
                <p className="text-xs font-bold text-[#1e40af] font-heading uppercase tracking-wide">
                  Configurador a Escala
                </p>
              </div>
              <p className="text-xs text-[#3b82f6] leading-relaxed mb-3">
                Calcula medidas milimétricas de tu ventana o puerta en tiempo real.
              </p>
              <button
                id="sidebar-quick-quote-button"
                onClick={() => handleNavClick('cotizar')}
                className="w-full py-2 px-3 bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-semibold rounded-md shadow transition flex items-center justify-center gap-2"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Abrir Configurador</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contact & Footer in Sidebar */}
      <div className="p-4 border-t border-[#e2e8f0] bg-[#f8fafc] space-y-3">
        {/* WhatsApp Direct Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="sidebar-whatsapp-link"
          className="flex items-center justify-between w-full p-2.5 bg-[#ecfdf5] hover:bg-[#d1fae5] border border-[#a7f3d0] rounded-lg transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#10b981] text-white flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-[#065f46] uppercase font-heading leading-tight">
                WhatsApp Oficial
              </p>
              <p className="text-xs font-semibold text-[#047857]">
                Respuesta Inmediata
              </p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-[#059669] opacity-70 group-hover:opacity-100" />
        </a>

        {/* Direct Contact info */}
        <div className="space-y-1.5 text-xs text-[#64748b]">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#00236f] transition-colors font-medium">
              {phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
            <a href={`mailto:${email}`} className="hover:text-[#00236f] transition-colors truncate font-medium">
              {email}
            </a>
          </div>
        </div>

        <div className="pt-1 text-[11px] text-[#94a3b8] text-center border-t border-[#e2e8f0]/60">
          Taller de carpintería y ensamble
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside 
        id="desktop-sidebar" 
        className="hidden lg:flex flex-col w-72 shrink-0 border-r border-[#e2e8f0] h-screen sticky top-0 z-30 shadow-sm"
      >
        {SidebarContent}
      </aside>

      {/* Mobile Drawer (Desplegable para teléfono) */}
      {mobileOpen && (
        <div 
          id="mobile-sidebar-drawer" 
          className="lg:hidden fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer Body */}
          <div className="relative w-80 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {SidebarContent}
          </div>
        </div>
      )}
    </>
  );
};