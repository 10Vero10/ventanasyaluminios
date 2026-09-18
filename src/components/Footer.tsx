import React from 'react';
import { TabType } from '../types';
import { Phone, Mail, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
  phone: string;
  email: string;
  quotingEnabled: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, phone, email, quotingEnabled }) => {
  return (
    <footer className="bg-[#0b1728] text-white pt-12 pb-24 lg:pb-12 border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#1e3a8a] text-white flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4 p-0.5">
                  <div className="border border-white/80 bg-white/40"></div>
                  <div className="border border-white/80 bg-white/40"></div>
                  <div className="border border-white/80 bg-white/40"></div>
                  <div className="border border-white/80 bg-white/40"></div>
                </div>
              </div>
              <h3 className="text-base font-bold tracking-tight font-heading text-white">
                Ventanas y Aluminios
              </h3>
            </div>
            <p className="text-xs font-semibold tracking-wider text-[#93c5fd] uppercase font-heading">
              Fabricación a Medida
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Soluciones en vidrio, aluminio y otros materiales, fabricadas e instaladas con más de 25 años de experiencia.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
              <span>Garantía estructural & cortes milimétricos</span>
            </div>
          </div>

          {/* Col 2: Secciones */}
          <div className="space-y-3">
            <p className="text-xs font-bold tracking-widest text-[#93c5fd] uppercase font-heading">
              Secciones
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('inicio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white flex items-center gap-1.5 transition-colors group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>Inicio</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('catalogo');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white flex items-center gap-1.5 transition-colors group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>Catálogo de Sistemas</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('nosotros');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white flex items-center gap-1.5 transition-colors group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>¿Quiénes somos?</span>
                </button>
              </li>
              {quotingEnabled && (
                <li>
                  <button
                    onClick={() => {
                      onSelectTab('cotizar');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                    <span>Configurador & Cotizar</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Contacto */}
          <div className="space-y-3">
            <p className="text-xs font-bold tracking-widest text-[#93c5fd] uppercase font-heading">
              Taller & Atención
            </p>
            <div className="space-y-2.5 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="hover:text-white break-all">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">
                  Instalaciones en toda el área metropolitana y proyectos a nivel regional.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© Ventanas y Aluminios. Fabricación e instalación a medida.</p>
          <p>Todos los derechos reservados · Acabados de Excelencia</p>
        </div>
      </div>
    </footer>
  );
};
