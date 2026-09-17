import React from 'react';
import { SiteContent, TabType } from '../../types';
import { 
  ShieldCheck, 
  Users, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Wrench, 
  Building, 
  Award 
} from 'lucide-react';

interface AboutViewProps {
  content: SiteContent;
  onSelectTab: (tab: TabType) => void;
  quotingEnabled: boolean;
}

export const AboutView: React.FC<AboutViewProps> = ({
  content,
  onSelectTab,
  quotingEnabled,
}) => {
  const experienceYears = content.experienceYears;
  const about = content.about;

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dbeafe] text-[#1e3a8a] text-xs font-bold font-heading uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>¿Quiénes Somos?</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00236f] font-heading tracking-tight">
          Una empresa que mide todo, <span className="font-serif italic font-normal text-[#1e40af]">menos su dedicación</span>
        </h1>

        <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
          Fabricación e instalación de soluciones en vidrio, aluminio y otros materiales desde hace más de {experienceYears} años.
        </p>

        {/* 25+ Años banner matching screenshot 4 */}
        <div className="bg-[#00236f] text-white p-5 rounded-2xl flex items-center justify-between shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-200">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                {experienceYears}+ años
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-200 font-heading">
                Solidez & Confianza
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-blue-200 text-xs font-heading font-semibold">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span>Garantía en Obra</span>
          </div>
        </div>
      </section>

      {/* Workshop & Narrative Section (2 columns on desktop) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Workshop Photo Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-md border border-[#cbd5e1] group bg-slate-900 relative">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                  alt="Taller de carpintería y ensamble a medida de Ventanas y Aluminios"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                  <Wrench className="w-4 h-4 text-blue-300 shrink-0" />
                  <span className="text-xs font-bold font-heading uppercase tracking-wide">
                    Taller de Carpintería y Ensamble a Medida
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative text */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748b] tracking-wider uppercase font-heading">
              <span>Nuestra Historia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00236f] font-heading">
              ¿Quiénes somos?
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              {about.paragraph1}
            </p>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              {about.paragraph2}
            </p>

            {/* Highlight Box */}
            <div className="p-4 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] flex items-start gap-3">
              <Users className="w-5 h-5 text-[#1e40af] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#1e3a8a] font-medium leading-relaxed">
                {about.highlightText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiencia Metrics Section */}
      <section className="bg-white py-12 border-y border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-left">
          <div>
            <p className="text-xs font-bold tracking-wider text-[#64748b] uppercase font-heading">
              Nuestra Experiencia
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00236f] font-heading">
              Más de {experienceYears} años <span className="font-serif italic font-normal text-[#1e40af]">fortaleciendo procesos</span>
            </h2>
            <p className="text-sm sm:text-base text-[#475569] max-w-2xl pt-1">
              Más de {experienceYears} años de trayectoria nos han permitido fortalecer nuestros conocimientos, mejorar nuestros procesos y ofrecer trabajos confiables y duraderos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Card 1: 25 Años */}
            <div className="p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#dbeafe] text-[#1e40af] flex flex-col items-center justify-center font-heading font-extrabold text-lg leading-tight">
                  <span>{experienceYears}</span>
                  <span className="text-[9px] uppercase tracking-tighter">Años</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#00236f] font-heading">
                    Años de experiencia
                  </h3>
                  <p className="text-xs text-[#64748b]">Trayectoria consolidada</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Fabricando e instalando soluciones arquitectónicas de alta gama con precisión europea.
              </p>
            </div>

            {/* Card 2: Proyectos integrales */}
            <div className="p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#e0e7ff] text-[#4338ca] flex items-center justify-center">
                  <Building className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#00236f] font-heading">
                    Proyectos integrales
                  </h3>
                  <p className="text-xs text-[#64748b]">Alcance versátil</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Atención a proyectos residenciales, comerciales y empresariales con garantías reales.
              </p>
            </div>

            {/* Card 3: Equipo especializado */}
            <div className="p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#dcfce7] text-[#15803d] flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#00236f] font-heading">
                    Equipo especializado
                  </h3>
                  <p className="text-xs text-[#64748b]">Sin intermediarios</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Fabricación e instalación con personal técnico propio certificado en seguridad de obra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compromiso Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-left">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#64748b] tracking-wider uppercase font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Nuestro Compromiso</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00236f] font-heading">
            Calidad en cada <span className="font-serif italic font-normal text-[#1e40af]">entrega</span>
          </h2>
          <p className="text-sm sm:text-base text-[#475569] max-w-2xl pt-1">
            Nos comprometemos con cada proyecto, buscando siempre entregar calidad, responsabilidad, cumplimiento y excelentes acabados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Item 1 */}
          <div className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#eff6ff] text-[#1e40af] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#00236f] font-heading">
              Medidas exactas
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Precisión milimétrica en vanos, perfiles y vidrios templados para un acople hermético y perfecto.
            </p>
          </div>

          {/* Item 2 */}
          <div className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#00236f] font-heading">
              Instalación limpia
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Procedimientos rigurosos en obra que cuidan tu espacio, con sellados pulcros y protección de áreas.
            </p>
          </div>

          {/* Item 3 */}
          <div className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#fdf2f8] text-[#db2777] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#00236f] font-heading">
              Garantía comprobada
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Soporte continuo y materiales certificados que aseguran máxima resistencia acústica y climática.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      {quotingEnabled && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#00236f] text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-left">
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-widest text-blue-200 uppercase font-heading">
                Inicia tu Proyecto
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
                ¿Quieres un trabajo así de cuidado? <span className="font-serif italic font-normal text-blue-200">Hablemos.</span>
              </h3>
              <p className="text-sm text-blue-100 max-w-lg">
                Te contamos cómo fabricamos e instalamos cada proyecto a la medida exacta de tu hogar u oficina.
              </p>
            </div>
            <button
              onClick={() => {
                onSelectTab('cotizar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-white text-[#00236f] hover:bg-blue-50 font-heading font-bold text-sm sm:text-base rounded-lg shadow-md transition-all flex items-center gap-2 shrink-0"
            >
              <span>Cotizar ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};